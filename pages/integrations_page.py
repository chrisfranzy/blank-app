"""Integrations page: connect Slack, Email, HubSpot, Linear, and other tools."""

import streamlit as st
import json
from data.database import get_session, Integration, User


INTEGRATION_CONFIGS = {
    "slack": {
        "name": "Slack",
        "icon": "💬",
        "description": "Connect your Slack workspace to detect what your team is asking about, struggling with, and discussing related to Claude tools.",
        "fields": [
            {"key": "bot_token", "label": "Bot Token (xoxb-...)", "type": "password"},
        ],
        "help_text": """**How to set up:**
1. Go to [api.slack.com/apps](https://api.slack.com/apps) and create a new app
2. Add bot scopes: `channels:history`, `channels:read`, `search:read`, `users:read`
3. Install the app to your workspace
4. Copy the Bot User OAuth Token""",
    },
    "email": {
        "name": "Gmail",
        "icon": "📧",
        "description": "Connect Gmail to detect repetitive email patterns and identify workflows that could be automated with Claude.",
        "fields": [
            {"key": "credentials_json", "label": "OAuth Credentials JSON", "type": "textarea"},
        ],
        "help_text": """**How to set up:**
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Enable the Gmail API
3. Create OAuth 2.0 credentials (Desktop app)
4. Download the credentials JSON and paste it here
5. You'll be prompted to authorize on first sync""",
    },
    "hubspot": {
        "name": "HubSpot",
        "icon": "📊",
        "description": "Connect HubSpot to analyze CRM activity and identify sales workflows that Claude can automate.",
        "fields": [
            {"key": "access_token", "label": "Private App Access Token", "type": "password"},
        ],
        "help_text": """**How to set up:**
1. Go to your HubSpot account → Settings → Integrations → Private Apps
2. Create a new private app
3. Add scopes: `crm.objects.contacts.read`, `crm.objects.deals.read`
4. Copy the access token""",
    },
    "linear": {
        "name": "Linear",
        "icon": "📋",
        "description": "Connect Linear to detect project management patterns and identify issue workflows that Claude can streamline.",
        "fields": [
            {"key": "api_key", "label": "API Key", "type": "password"},
        ],
        "help_text": """**How to set up:**
1. Go to [linear.app/settings/api](https://linear.app/settings/api)
2. Create a new personal API key
3. Copy the key and paste it here""",
    },
    "github": {
        "name": "GitHub",
        "icon": "🐙",
        "description": "Connect GitHub to detect code review patterns and identify opportunities for Claude Code automation.",
        "fields": [
            {"key": "token", "label": "Personal Access Token", "type": "password"},
            {"key": "org", "label": "Organization (optional)", "type": "text"},
        ],
        "help_text": """**How to set up:**
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Create a new fine-grained token
3. Grant access to your repositories
4. Copy the token""",
    },
}


def render():
    session = get_session()
    user_id = st.session_state.get("current_user_id")

    st.title("Integrations")
    st.caption("Connect your tools so the Learning Hub can detect what you need to learn")

    # ── Current Integrations ────────────────────────────────
    existing = session.query(Integration).filter_by(user_id=user_id).all()
    existing_platforms = {i.platform: i for i in existing}

    for platform_key, config in INTEGRATION_CONFIGS.items():
        integration = existing_platforms.get(platform_key)
        is_connected = integration and integration.is_active

        with st.container(border=True):
            header_col, status_col = st.columns([5, 1])

            with header_col:
                st.subheader(f"{config['icon']} {config['name']}")
                st.write(config["description"])

            with status_col:
                if is_connected:
                    st.success("Connected")
                else:
                    st.caption("Not connected")

            with st.expander("Configure" if not is_connected else "Settings"):
                st.markdown(config["help_text"])
                st.divider()

                field_values = {}
                existing_creds = integration.get_credentials() if integration else {}

                for field in config["fields"]:
                    if field["type"] == "password":
                        field_values[field["key"]] = st.text_input(
                            field["label"],
                            value=existing_creds.get(field["key"], ""),
                            type="password",
                            key=f"{platform_key}_{field['key']}",
                        )
                    elif field["type"] == "textarea":
                        field_values[field["key"]] = st.text_area(
                            field["label"],
                            value=existing_creds.get(field["key"], ""),
                            key=f"{platform_key}_{field['key']}",
                            height=100,
                        )
                    else:
                        field_values[field["key"]] = st.text_input(
                            field["label"],
                            value=existing_creds.get(field["key"], ""),
                            key=f"{platform_key}_{field['key']}",
                        )

                btn_col1, btn_col2 = st.columns(2)

                with btn_col1:
                    if st.button(
                        "Connect" if not is_connected else "Update",
                        key=f"connect_{platform_key}",
                    ):
                        # Validate at least one field is filled
                        if any(v.strip() for v in field_values.values()):
                            if integration:
                                integration.set_credentials(field_values)
                                integration.is_active = True
                            else:
                                integration = Integration(
                                    user_id=user_id,
                                    platform=platform_key,
                                    is_active=True,
                                )
                                integration.set_credentials(field_values)
                                session.add(integration)
                            session.commit()
                            st.success(f"{config['name']} connected!")
                            st.rerun()
                        else:
                            st.error("Please fill in the required fields.")

                with btn_col2:
                    if is_connected:
                        if st.button("Disconnect", key=f"disconnect_{platform_key}"):
                            integration.is_active = False
                            session.commit()
                            st.info(f"{config['name']} disconnected.")
                            st.rerun()

    # ── Sync Status ─────────────────────────────────────────
    st.divider()
    st.subheader("Sync Status")

    active_integrations = [i for i in existing if i.is_active]
    if active_integrations:
        for integration in active_integrations:
            config = INTEGRATION_CONFIGS.get(integration.platform, {})
            col1, col2, col3 = st.columns([3, 2, 1])
            with col1:
                st.write(f"{config.get('icon', '🔗')} {config.get('name', integration.platform)}")
            with col2:
                if integration.last_synced:
                    st.caption(f"Last sync: {integration.last_synced}")
                else:
                    st.caption("Never synced")
            with col3:
                if st.button("Sync Now", key=f"sync_{integration.platform}"):
                    st.info(f"Syncing {config.get('name', integration.platform)}... (Configure your API credentials to enable live sync)")
    else:
        st.info("No active integrations. Connect a tool above to get started.")

    session.close()
