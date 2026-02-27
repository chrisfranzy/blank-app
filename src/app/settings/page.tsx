"use client";

import { useState } from "react";
import { Settings, User, Bell, Shield, Palette } from "lucide-react";
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

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
        <p className="text-zinc-400 mt-1">
          Manage your profile and preferences
        </p>
      </div>

      {/* Profile */}
      <Card>
        <div className="flex items-center gap-2 mb-5">
          <User className="w-5 h-5 text-brand-400" />
          <CardTitle>Profile</CardTitle>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400/50"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400/50"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Team</label>
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400/50"
              >
                <option>Engineering</option>
                <option>Product</option>
                <option>Design</option>
                <option>Sales</option>
                <option>Marketing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-400/50"
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>
            </div>
          </div>
          <button className="px-4 py-2 bg-brand-400 text-zinc-900 rounded-lg text-sm font-medium hover:bg-brand-300 transition-colors">
            Save Profile
          </button>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <div className="flex items-center gap-2 mb-5">
          <Bell className="w-5 h-5 text-brand-400" />
          <CardTitle>Notifications</CardTitle>
        </div>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="text-xs text-zinc-500">
                  {key === "newLessons" && "Get notified when new lessons are available"}
                  {key === "toolUpdates" && "Alerts for new Claude tool features"}
                  {key === "teamActivity" && "When team members complete lessons"}
                  {key === "weeklyDigest" && "Weekly summary of your learning progress"}
                </p>
              </div>
              <button
                onClick={() =>
                  setNotifications((prev) => ({ ...prev, [key]: !value }))
                }
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  value ? "bg-brand-400" : "bg-zinc-700"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    value ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Danger zone */}
      <Card className="border-rose-900/30">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-rose-400" />
          <CardTitle className="text-rose-400">Danger Zone</CardTitle>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white">Reset Progress</p>
            <p className="text-xs text-zinc-500">
              Clear all learning progress and start over
            </p>
          </div>
          <button className="px-4 py-2 bg-rose-500/10 text-rose-400 rounded-lg text-sm font-medium hover:bg-rose-500/20 transition-colors border border-rose-500/20">
            Reset
          </button>
        </div>
      </Card>
    </div>
  );
}
