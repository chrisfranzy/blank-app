"""
Mobile-responsive CSS overrides and layout helpers for Streamlit.
Inject these into every page to make the app usable on phones.
"""

import streamlit as st


def inject_mobile_css():
    """Inject comprehensive mobile-responsive CSS overrides."""
    st.markdown("""
<style>
/* ═══════════════════════════════════════════════════════════
   MOBILE-FIRST RESPONSIVE OVERRIDES FOR STREAMLIT
   ═══════════════════════════════════════════════════════════ */

/* ── Base: tighten padding on small screens ──────────────── */
@media (max-width: 768px) {
    /* Reduce main container padding */
    .stMainBlockContainer,
    .block-container {
        padding-left: 0.75rem !important;
        padding-right: 0.75rem !important;
        padding-top: 1rem !important;
        max-width: 100% !important;
    }

    /* Sidebar overlay on mobile (Streamlit handles this but we refine it) */
    section[data-testid="stSidebar"] {
        width: 280px !important;
        min-width: 280px !important;
    }

    section[data-testid="stSidebar"] .stRadio > div {
        gap: 0.15rem !important;
    }

    section[data-testid="stSidebar"] .stRadio label {
        padding: 0.6rem 0.5rem !important;
        font-size: 0.95rem !important;
    }

    /* ── Typography: scale down ──────────────────────────── */
    h1 {
        font-size: 1.6rem !important;
        line-height: 1.2 !important;
    }

    h2 {
        font-size: 1.3rem !important;
    }

    h3 {
        font-size: 1.1rem !important;
    }

    /* ── Columns: STACK VERTICALLY on mobile ─────────────── */
    /* This is the big one — force all st.columns to stack */
    div[data-testid="stHorizontalBlock"] {
        flex-wrap: wrap !important;
        gap: 0.5rem !important;
    }

    div[data-testid="stHorizontalBlock"] > div[data-testid="stColumn"] {
        width: 100% !important;
        flex: 1 1 100% !important;
        min-width: 100% !important;
    }

    /* ── Metrics: 2-up grid instead of 4-up ─────────────── */
    div[data-testid="stHorizontalBlock"]:has(div[data-testid="stMetric"])
        > div[data-testid="stColumn"] {
        width: 48% !important;
        flex: 1 1 48% !important;
        min-width: 48% !important;
    }

    div[data-testid="stMetric"] {
        padding: 0.5rem !important;
    }

    div[data-testid="stMetric"] label {
        font-size: 0.75rem !important;
    }

    div[data-testid="stMetric"] div[data-testid="stMetricValue"] {
        font-size: 1.5rem !important;
    }

    /* ── Buttons: bigger touch targets ───────────────────── */
    .stButton > button {
        min-height: 44px !important;
        padding: 0.5rem 1rem !important;
        font-size: 0.9rem !important;
        width: 100% !important;
    }

    /* ── Containers/cards: full width, less padding ──────── */
    div[data-testid="stContainer"] {
        padding: 0.5rem !important;
    }

    /* ── Tabs: scrollable on mobile ─────────────────────── */
    .stTabs [data-baseweb="tab-list"] {
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
        scrollbar-width: none !important;
        gap: 0 !important;
    }

    .stTabs [data-baseweb="tab-list"]::-webkit-scrollbar {
        display: none !important;
    }

    .stTabs [data-baseweb="tab"] {
        white-space: nowrap !important;
        font-size: 0.85rem !important;
        padding: 0.5rem 0.75rem !important;
        flex-shrink: 0 !important;
    }

    /* ── Expanders: better touch targets ─────────────────── */
    .streamlit-expanderHeader {
        font-size: 0.95rem !important;
        padding: 0.75rem 0.5rem !important;
    }

    /* ── Code blocks: horizontal scroll ─────────────────── */
    pre, code {
        white-space: pre !important;
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
        font-size: 0.8rem !important;
        max-width: 100% !important;
    }

    .stCodeBlock {
        max-width: 100% !important;
    }

    /* ── Tables: scrollable container ────────────────────── */
    .stDataFrame, .stTable {
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
    }

    .stDataFrame > div {
        min-width: 0 !important;
    }

    /* ── Markdown tables: responsive ─────────────────────── */
    .stMarkdown table {
        display: block !important;
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
        white-space: nowrap !important;
        font-size: 0.8rem !important;
    }

    /* ── Text inputs/areas: full width ───────────────────── */
    .stTextInput, .stTextArea, .stSelectbox {
        width: 100% !important;
    }

    .stTextInput input, .stTextArea textarea {
        font-size: 16px !important; /* Prevents iOS zoom on focus */
    }

    /* ── Progress bars: ensure text is readable ──────────── */
    .stProgress > div > div {
        font-size: 0.75rem !important;
    }

    /* ── Dividers: tighter spacing ───────────────────────── */
    hr {
        margin: 0.75rem 0 !important;
    }

    /* ── Captions: slightly larger for readability ──────── */
    .stCaption, small {
        font-size: 0.78rem !important;
    }

    /* ── Selectbox dropdown: prevent cutoff ──────────────── */
    div[data-baseweb="select"] {
        width: 100% !important;
    }

    /* ── Info/warning/success boxes: compact ─────────────── */
    .stAlert {
        padding: 0.5rem 0.75rem !important;
        font-size: 0.85rem !important;
    }

    /* ── Slider: bigger thumb for touch ──────────────────── */
    .stSlider [role="slider"] {
        width: 24px !important;
        height: 24px !important;
    }
}

/* ── Mid-size tablets (768-1024px) ───────────────────────── */
@media (min-width: 769px) and (max-width: 1024px) {
    .stMainBlockContainer,
    .block-container {
        padding-left: 1rem !important;
        padding-right: 1rem !important;
    }

    /* 2-up columns on tablet */
    div[data-testid="stHorizontalBlock"] > div[data-testid="stColumn"] {
        min-width: 48% !important;
    }

    h1 { font-size: 1.8rem !important; }
}

/* ── Safe area for notched phones (iPhone etc) ──────────── */
@supports (padding: env(safe-area-inset-bottom)) {
    .stMainBlockContainer,
    .block-container {
        padding-bottom: calc(1rem + env(safe-area-inset-bottom)) !important;
    }
}

/* ═══════════════════════════════════════════════════════════
   DESKTOP REFINEMENTS (above 1024px, no changes)
   ═══════════════════════════════════════════════════════════ */
</style>
""", unsafe_allow_html=True)


def mobile_columns(specs, mobile_stack=True):
    """
    Wrapper around st.columns that returns columns which will
    stack vertically on mobile via CSS. Use this instead of st.columns
    when you want guaranteed stacking.

    Usage:
        cols = mobile_columns([2, 1])
        with cols[0]: st.write("Main")
        with cols[1]: st.write("Side")
    """
    return st.columns(specs)


def mobile_metric_row(metrics: list[tuple[str, str]]):
    """
    Render a row of metrics that automatically goes 2-up on mobile.

    Usage:
        mobile_metric_row([
            ("Completed", "12"),
            ("In Progress", "3"),
            ("Score", "85%"),
            ("Signals", "42"),
        ])
    """
    # Use 2 columns per row on mobile (CSS handles the 2-up grid)
    cols = st.columns(len(metrics))
    for i, (label, value) in enumerate(metrics):
        with cols[i]:
            st.metric(label, value)


def mobile_card(title: str, content_fn, action_fn=None):
    """
    Render a card that stacks content and action vertically on mobile.

    Usage:
        def content():
            st.write("Some content")
        def action():
            st.button("Do thing")
        mobile_card("My Card", content, action)
    """
    with st.container(border=True):
        st.markdown(f"**{title}**")
        content_fn()
        if action_fn:
            action_fn()
