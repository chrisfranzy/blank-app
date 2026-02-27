"use client";

import { useState } from "react";
import { User, Bell, Shield } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  const [name, setName] = useState("Chris");
  const [email, setEmail] = useState("chris@company.com");
  const [team, setTeam] = useState("Engineering");
  const [role, setRole] = useState("admin");
  const [notifications, setNotifications] = useState({
    newLessons: true,
    toolUpdates: true,
    teamActivity: false,
    weeklyDigest: true,
  });

  const inputClass =
    "w-full bg-surface-2 border border-surface-3 rounded-xl px-4 py-3 text-sm text-ink font-body focus:outline-none focus:border-accent-coral/30 focus:ring-1 focus:ring-accent-coral/10 transition-all";
  const labelClass = "block text-xs font-mono text-ink-faint uppercase tracking-[0.15em] mb-2";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <p className="text-xs font-mono text-ink-faint uppercase tracking-[0.2em] mb-2">
          Settings
        </p>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink tracking-tight">
          Preferences
        </h1>
        <p className="text-ink-muted mt-2">Manage your profile and notifications</p>
      </div>

      {/* Profile */}
      <Card>
        <div className="flex items-center gap-2.5 mb-6">
          <User className="w-5 h-5 text-accent-coral" strokeWidth={1.5} />
          <CardTitle>Profile</CardTitle>
        </div>
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Team</label>
              <select value={team} onChange={(e) => setTeam(e.target.value)} className={inputClass}>
                <option>Engineering</option>
                <option>Product</option>
                <option>Design</option>
                <option>Sales</option>
                <option>Marketing</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className={inputClass}>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-gradient-to-r from-accent-coral to-accent-sand text-surface-0 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
            Save Profile
          </button>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <div className="flex items-center gap-2.5 mb-6">
          <Bell className="w-5 h-5 text-accent-sage" strokeWidth={1.5} />
          <CardTitle>Notifications</CardTitle>
        </div>
        <div className="space-y-5">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ink capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="text-xs text-ink-faint mt-0.5">
                  {key === "newLessons" && "Get notified when new lessons are available"}
                  {key === "toolUpdates" && "Alerts for new Claude tool features"}
                  {key === "teamActivity" && "When team members complete lessons"}
                  {key === "weeklyDigest" && "Weekly summary of your learning progress"}
                </p>
              </div>
              <button
                onClick={() => setNotifications((prev) => ({ ...prev, [key]: !value }))}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  value
                    ? "bg-gradient-to-r from-accent-coral to-accent-sand"
                    : "bg-surface-3"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
                    value ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Danger */}
      <Card className="border-accent-coral/20">
        <div className="flex items-center gap-2.5 mb-4">
          <Shield className="w-5 h-5 text-accent-coral" strokeWidth={1.5} />
          <CardTitle className="text-accent-coral">Danger Zone</CardTitle>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink">Reset Progress</p>
            <p className="text-xs text-ink-faint">
              Clear all learning progress and start over
            </p>
          </div>
          <button className="px-4 py-2 bg-accent-coral/10 text-accent-coral rounded-xl text-sm font-medium hover:bg-accent-coral/20 transition-colors border border-accent-coral/20">
            Reset
          </button>
        </div>
      </Card>
    </div>
  );
}
