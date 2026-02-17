// frontend/src/pages/AdminPanel.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { apiGet, apiPatch, apiPost } from "@/api/http";
import React, { useEffect, useMemo, useState } from "react";
import { apiGet, apiPatch, apiPost, apiDelete } from "@/api/http"; // ✅ add apiDelete
import { tokenStorage } from "@/api/tokenStorage"; // ✅ to get current user id


export default function AdminPanel() {
  const [tab, setTab] = useState("overview");

  // base data
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);

  // UI
  const [loadingBase, setLoadingBase] = useState(true);
  const [baseErr, setBaseErr] = useState("");

  // users UI
  const [userQuery, setUserQuery] = useState("");
  const [roleLoadingId, setRoleLoadingId] = useState(null);

  // scans UI
  const [scans, setScans] = useState([]);
  const [scanPage, setScanPage] = useState({ skip: 0, limit: 20, total: 0 });
  const [loadingScans, setLoadingScans] = useState(false);
  const [scansErr, setScansErr] = useState("");
  const [scansAvailable, setScansAvailable] = useState(true); // if endpoint not implemented
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  // derived
  const adminCount = useMemo(() => {
    return (users || []).filter((u) => (u.role || "").toLowerCase() === "admin").length;
  }, [users]);

  const filteredUsers = useMemo(() => {
    const q = (userQuery || "").trim().toLowerCase();
    if (!q) return users;

    return (users || []).filter((u) => {
      const name = (u.name || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      return name.includes(q) || email.includes(q);
    });
  }, [users, userQuery]);

  const canLoadMoreScans = useMemo(() => {
    return (scanPage.skip + scanPage.limit) < (scanPage.total || 0);
  }, [scanPage]);

  async function loadBase() {
    setLoadingBase(true);
    setBaseErr("");
    try {
      const [s, u] = await Promise.all([
        apiGet("/api/admin/analytics"),
        apiGet("/api/admin/users"),
      ]);
      setStats(s);
      setUsers(u?.users || []);
    } catch (e) {
      setBaseErr(e?.message || "Failed to load admin data");
    } finally {
      setLoadingBase(false);
    }
  }

  async function loadScans({ reset = false } = {}) {
    setLoadingScans(true);
    setScansErr("");
    try {
      const limit = 20;
      const skip = reset ? 0 : (scanPage.skip + scanPage.limit);

      const res = await apiGet(`/api/admin/scans?limit=${limit}&skip=${skip}`);
      const next = res?.scans || [];
      const page = res?.page || { skip, limit, total: 0 };

      setScansAvailable(true);
      setScanPage(page);
      setScans((prev) => (reset ? next : [...prev, ...next]));
    } catch (e) {
      // If you haven't implemented /api/admin/scans yet, handle it gracefully
      const msg = e?.message || "Failed to load scans";
      if (/404|not found|not implemented/i.test(msg) || e?.status === 404) {
        setScansAvailable(false);
        setScansErr("");
      } else {
        setScansErr(msg);
      }
    } finally {
      setLoadingScans(false);
    }
  }

  async function deleteUser(user) {
    setBaseErr("");

    try {
      const userId = user?.id;
      if (!userId) return;

      // ❌ Safety: ENV admin cannot be deleted
      if (String(userId) === "admin") {
        setBaseErr("ENV admin cannot be deleted.");
        return;
      }

      // ❌ Safety: prevent deleting yourself
      const me = tokenStorage.getUser?.();
      if (String(me?.id) === String(userId)) {
        setBaseErr("You cannot delete your own account from here.");
        return;
      }

      // ✅ Confirm
      const typed = prompt(
        `This will permanently delete:\n\n${user?.name || "User"} (${user?.email || "—"})\n\nType "DELETE" to confirm:`
      );
      if (typed !== "DELETE") {
        setBaseErr("Cancelled.");
        return;
      }

      setDeleteLoadingId(userId);
      await apiDelete(`/api/admin/users/${userId}`);

      await loadBase(); // refresh users + stats
    } catch (e) {
      setBaseErr(e?.message || "Failed to delete user");
    } finally {
      setDeleteLoadingId(null);
    }
  }



  async function changeUserRole(user) {
    setBaseErr("");
    try {
      const userId = user?.id;
      if (!userId) return;

      // Safety: do not allow ENV admin mutation
      if (String(userId) === "admin") {
        setBaseErr("ENV admin role can't be changed.");
        return;
      }

      const current = (user?.role || "user").toLowerCase();
      const next = current === "admin" ? "user" : "admin";

      // Safety: prevent demoting last admin (DB admins)
      if (current === "admin" && adminCount <= 1) {
        setBaseErr("You cannot demote the last admin.");
        return;
      }

      setRoleLoadingId(userId);
      await apiPatch(`/api/admin/users/${userId}/role`, { role: next });

      // refresh base
      await loadBase();
    } catch (e) {
      setBaseErr(e?.message || "Failed to update role");
    } finally {
      setRoleLoadingId(null);
    }
  }

  useEffect(() => {
    loadBase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tab === "scans" && scans.length === 0) {
      loadScans({ reset: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const systemOk = Boolean(stats);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm text-slate-400">Admin</div>
          <div className="mt-1 flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              System Management
            </h1>
            <StatusBadge ok={systemOk} />
          </div>
          <p className="mt-2 text-sm text-slate-300">
            Manage users, scans, reports, and system controls.
          </p>
        </div>

        <button
          onClick={() => {
            loadBase();
            if (tab === "scans") loadScans({ reset: true });
          }}
          className="w-fit rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
        >
          Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        <TabBtn active={tab === "overview"} onClick={() => setTab("overview")}>
          Overview
        </TabBtn>
        <TabBtn active={tab === "users"} onClick={() => setTab("users")}>
          Users
        </TabBtn>
        <TabBtn active={tab === "scans"} onClick={() => setTab("scans")}>
          Scans
        </TabBtn>
        <TabBtn active={tab === "settings"} onClick={() => setTab("settings")}>
          Settings
        </TabBtn>
      </div>

      {/* Base error (single, clean) */}
      {baseErr ? <Alert kind="error" className="mt-6">{baseErr}</Alert> : null}

      {/* Content */}
      <div className="mt-6">
        {loadingBase ? (
          <Skeleton />
        ) : tab === "overview" ? (
          <Overview stats={stats} />
        ) : tab === "users" ? (
          <UsersTable
            users={filteredUsers}
            query={userQuery}
            setQuery={setUserQuery}
            onToggleRole={changeUserRole}
            onDeleteUser={deleteUser}                 // ✅ add
            roleLoadingId={roleLoadingId}
            deleteLoadingId={deleteLoadingId}         // ✅ add
            adminCount={adminCount}
          />

        ) : tab === "scans" ? (
          <ScansTable
            scans={scans}
            loading={loadingScans}
            error={scansErr}
            available={scansAvailable}
            onReload={() => loadScans({ reset: true })}
            onLoadMore={() => loadScans({ reset: false })}
            canLoadMore={canLoadMoreScans}
            total={scanPage.total}
          />
        ) : (
          <SettingsCard />
        )}
      </div>
    </div>
  );
}

/* ---------------- UI bits ---------------- */

function Skeleton() {
  return (
    <div className="h-[240px] animate-pulse rounded-2xl border border-white/10 bg-white/5" />
  );
}

function Alert({ kind = "error", className = "", children }) {
  const styles =
    kind === "success"
      ? "border-emerald-300/20 bg-emerald-500/10 text-emerald-200"
      : "border-rose-300/20 bg-rose-500/10 text-rose-200";

  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${styles} ${className}`}>
      {children}
    </div>
  );
}

function StatusBadge({ ok }) {
  return (
    <span
      className={[
        "rounded-full border px-2 py-1 text-xs",
        ok
          ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
          : "border-amber-400/30 bg-amber-500/10 text-amber-200",
      ].join(" ")}
    >
      {ok ? "Live" : "Degraded"}
    </span>
  );
}

function TabBtn({ active, children, ...props }) {
  return (
    <button
      {...props}
      className={[
        "rounded-xl px-4 py-2 text-sm transition",
        active
          ? "bg-white text-slate-950"
          : "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/* ---------------- Overview ---------------- */

function Overview({ stats }) {
  const totals = stats?.totals || {};
  const cards = [
    { label: "Total Users", value: totals.users ?? "—" },
    { label: "Total Scans", value: totals.scans ?? "—" },
    { label: "Reports Generated", value: totals.reports ?? "—" },
    { label: "System Status", value: stats ? "OK" : "—" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cards.map((c) => (
        <KpiCard key={c.label} label={c.label} value={c.value} />
      ))}

      <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-base font-semibold text-white">Stage Distribution</div>
            <div className="mt-1 text-xs text-slate-400">
              Breakdown of scan stage labels.
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {(stats?.stageDistribution || []).length === 0 ? (
            <div className="text-sm text-slate-400">No stage data yet.</div>
          ) : (
            stats.stageDistribution.map((s, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-slate-400">{s.stage}</div>
                <div className="mt-1 text-xl font-semibold text-white">{s.count}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-100">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

/* ---------------- Users ---------------- */

function UsersTable({
  users,
  query,
  setQuery,
  onToggleRole,
  onDeleteUser,
  roleLoadingId,
  deleteLoadingId,
  adminCount,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-100">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-base font-semibold text-white">Users</div>
          <div className="mt-1 text-xs text-slate-400">Admins in DB: {adminCount}</div>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name or email..."
          className="w-full md:w-72 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-white/20"
        />
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-400">
            <tr>
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-right">Action</th>
              <th className="text-right">Delete</th> {/* ✅ new column */}
            </tr>
          </thead>

          <tbody className="text-slate-100">
            {users.length === 0 ? (
              <tr>
                <td className="py-4 text-slate-400" colSpan={5}>
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u) => {
                const isEnvAdmin = String(u.id) === "admin";
                const role = (u.role || "user").toLowerCase();

                const roleBusy = roleLoadingId === u.id;
                const delBusy = deleteLoadingId === u.id;

                const nextLabel = role === "admin" ? "Demote" : "Promote";

                return (
                  <tr key={u.id} className="border-t border-white/10">
                    <td className="py-3">{u.name || "—"}</td>
                    <td className="text-slate-200">{u.email || "—"}</td>

                    <td>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs capitalize">
                        {role}
                      </span>
                      {isEnvAdmin ? (
                        <span className="ml-2 text-xs text-slate-500">(env)</span>
                      ) : null}
                    </td>

                    {/* Promote/Demote */}
                    <td className="text-right">
                      <button
                        disabled={isEnvAdmin || roleBusy || delBusy}
                        onClick={() => onToggleRole(u)}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10 disabled:opacity-40"
                      >
                        {roleBusy ? "Updating..." : nextLabel}
                      </button>
                    </td>

                    {/* ✅ Delete */}
                    <td className="text-right">
                      <button
                        disabled={isEnvAdmin || delBusy || roleBusy}
                        onClick={() => onDeleteUser(u)}
                        className="rounded-lg border border-rose-300/20 bg-rose-500/10 px-3 py-2 text-xs text-rose-200 hover:bg-rose-500/15 disabled:opacity-40"
                        title={isEnvAdmin ? "ENV admin can't be deleted" : ""}
                      >
                        {delBusy ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


/* ---------------- Scans ---------------- */

function ScansTable({ scans, loading, error, available, onReload, onLoadMore, canLoadMore, total }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-100">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-base font-semibold text-white">Recent Scans</div>
          <div className="mt-1 text-xs text-slate-400">Total scans: {total ?? "—"}</div>
        </div>

        <button
          onClick={onReload}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
        >
          Reload
        </button>
      </div>

      {!available ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          <div className="font-semibold text-white">Scans list endpoint missing</div>
          <div className="mt-1 text-slate-400">
            Implement <span className="text-slate-200">GET /api/admin/scans</span> to enable this tab.
          </div>
        </div>
      ) : (
        <>
          {error ? <Alert kind="error" className="mt-4">{error}</Alert> : null}

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-400">
                <tr>
                  <th className="py-2">Scan ID</th>
                  <th>User</th>
                  <th>Stage</th>
                  <th>File</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody className="text-slate-100">
                {loading && scans.length === 0 ? (
                  <tr>
                    <td className="py-4 text-slate-400" colSpan={5}>
                      Loading scans...
                    </td>
                  </tr>
                ) : scans.length === 0 ? (
                  <tr>
                    <td className="py-4 text-slate-400" colSpan={5}>
                      No scans found.
                    </td>
                  </tr>
                ) : (
                  scans.map((s) => (
                    <tr key={s.id} className="border-t border-white/10">
                      <td className="py-3">{String(s.id).slice(0, 12)}</td>
                      <td className="text-slate-300">{s.userId || "—"}</td>
                      <td>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs">
                          {s.stage || "Pending"}
                        </span>
                      </td>
                      <td className="text-slate-300">{s.fileName || "—"}</td>
                      <td className="text-slate-400">{s.createdAt || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Showing {scans.length} of {total ?? "—"}
            </div>

            <button
              disabled={!canLoadMore || loading}
              onClick={onLoadMore}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10 disabled:opacity-40"
            >
              {loading ? "Loading..." : canLoadMore ? "Load more" : "No more"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------- Settings ---------------- */
function SettingsCard() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  // server settings
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [auditLogs, setAuditLogs] = useState(true);
  const [adminConfigured, setAdminConfigured] = useState(false);

  // extra (frontend-only policy toggles, still saved to backend if you want later)
  const [requireStrongPasswords, setRequireStrongPasswords] = useState(true);
  const [blockUploadsInMaintenance, setBlockUploadsInMaintenance] = useState(true);

  // health
  const [health, setHealth] = useState(null);
  const [latencyMs, setLatencyMs] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);

  // change tracking
  const [initial, setInitial] = useState(null);

  const dirty = useMemo(() => {
    if (!initial) return false;
    return (
      initial.maintenanceMode !== maintenanceMode ||
      initial.auditLogs !== auditLogs ||
      initial.requireStrongPasswords !== requireStrongPasswords ||
      initial.blockUploadsInMaintenance !== blockUploadsInMaintenance
    );
  }, [initial, maintenanceMode, auditLogs, requireStrongPasswords, blockUploadsInMaintenance]);

  async function loadHealth() {
    try {
      const t0 = performance.now();
      const h = await apiGet("/api/health");
      const t1 = performance.now();

      setHealth(h);
      setLatencyMs(Math.round(t1 - t0));
      setLastChecked(new Date().toLocaleTimeString());
    } catch (e) {
      // don't hard-fail settings if health fails
      setHealth(null);
      setLatencyMs(null);
      setLastChecked(new Date().toLocaleTimeString());
    }
  }

  async function load() {
    setLoading(true);
    setErr("");
    setOk("");

    try {
      const s = await apiGet("/api/admin/settings");

      const next = {
        maintenanceMode: !!s?.maintenanceMode,
        auditLogs: !!s?.auditLogs,
        adminConfigured: !!s?.adminConfigured,

        // optional local policy flags (if backend doesn't store them yet)
        requireStrongPasswords: !!s?.requireStrongPasswords ?? true,
        blockUploadsInMaintenance: !!s?.blockUploadsInMaintenance ?? true,
      };

      setMaintenanceMode(next.maintenanceMode);
      setAuditLogs(next.auditLogs);
      setAdminConfigured(next.adminConfigured);

      setRequireStrongPasswords(next.requireStrongPasswords);
      setBlockUploadsInMaintenance(next.blockUploadsInMaintenance);

      setInitial({
        maintenanceMode: next.maintenanceMode,
        auditLogs: next.auditLogs,
        requireStrongPasswords: next.requireStrongPasswords,
        blockUploadsInMaintenance: next.blockUploadsInMaintenance,
      });

      await loadHealth();
    } catch (e) {
      setErr(e?.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    setSaving(true);
    setErr("");
    setOk("");

    try {
      // ✅ Save only what backend supports now:
      // (You can later extend backend to store policy toggles too)
      await apiPatch("/api/admin/settings", {
        maintenanceMode,
        auditLogs,

        // If your backend accepts these, keep them.
        // Otherwise remove them from payload.
        requireStrongPasswords,
        blockUploadsInMaintenance,
      });

      setOk("Settings saved ✅");
      setInitial({
        maintenanceMode,
        auditLogs,
        requireStrongPasswords,
        blockUploadsInMaintenance,
      });

      await loadHealth();
    } catch (e) {
      setErr(e?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  function reset() {
    if (!initial) return;
    setMaintenanceMode(initial.maintenanceMode);
    setAuditLogs(initial.auditLogs);
    setRequireStrongPasswords(initial.requireStrongPasswords);
    setBlockUploadsInMaintenance(initial.blockUploadsInMaintenance);
    setOk("");
    setErr("");
  }

  async function dangerClear(target) {
    setSaving(true);
    setErr("");
    setOk("");

    try {
      const confirmText = target === "scans" ? "DELETE SCANS" : "DELETE REPORTS";
      const typed = prompt(
        `This will permanently delete ALL ${target}.\n\nType "${confirmText}" to confirm:`
      );

      if (typed !== confirmText) {
        setErr("Cancelled.");
        return;
      }

      const res = await apiPost("/api/admin/settings/danger/clear", { target });
      setOk(`Cleared ${res?.deleted || 0} ${target} ✅`);
      await loadHealth();
    } catch (e) {
      setErr(e?.message || "Failed to clear data");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auto-refresh health every 30s
  useEffect(() => {
    const id = setInterval(() => loadHealth(), 30000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="h-[240px] animate-pulse rounded-2xl border border-white/10 bg-white/5" />
    );
  }

  return (
    <div className="grid gap-4">
      {/* Top alerts */}
      {err ? (
        <div className="rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {err}
        </div>
      ) : null}

      {ok ? (
        <div className="rounded-xl border border-emerald-300/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {ok}
        </div>
      ) : null}

      {/* Save bar */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-white">Settings</div>
            <div className="mt-1 text-xs text-slate-400">
              {dirty ? "You have unsaved changes." : "All changes saved."}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={reset}
              disabled={!dirty || saving}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 hover:bg-white/10 disabled:opacity-40"
            >
              Reset
            </button>
            <button
              onClick={save}
              disabled={!dirty || saving}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-base font-semibold text-white">System Health</div>
            <div className="mt-1 text-xs text-slate-400">
              Live backend status, latency, and configuration.
            </div>
          </div>
          <button
            onClick={loadHealth}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 hover:bg-white/10"
          >
            Refresh
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <InfoTile label="API Status" value={health?.status || "—"} />
          <InfoTile label="Service" value={health?.service || "—"} />
          <InfoTile label="Latency" value={latencyMs != null ? `${latencyMs}ms` : "—"} />
          <InfoTile label="Last Checked" value={lastChecked || "—"} />
        </div>

        <div className="mt-3 text-xs text-slate-500">
          Admin ENV Config: <span className="text-slate-200">{adminConfigured ? "YES" : "NO"}</span>
        </div>
      </div>

      {/* Security & Policy */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="text-base font-semibold text-white">Security & Policy</div>
        <div className="mt-1 text-xs text-slate-400">
          Recommended controls for safer admin operations.
        </div>

        <div className="mt-4 space-y-4">
          <ToggleRow
            title="Require Strong Passwords"
            desc="Enforce stronger signup passwords (recommended)."
            checked={requireStrongPasswords}
            onChange={setRequireStrongPasswords}
          />

          <ToggleRow
            title="Block Uploads During Maintenance"
            desc="Prevent new uploads/inference when Maintenance Mode is ON."
            checked={blockUploadsInMaintenance}
            onChange={setBlockUploadsInMaintenance}
          />

          <ToggleRow
            title="Audit Logs"
            desc="Record admin actions (role changes, deletes) for traceability."
            checked={auditLogs}
            onChange={setAuditLogs}
          />
        </div>
      </div>

      {/* Feature Controls */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="text-base font-semibold text-white">Feature Controls</div>
        <div className="mt-1 text-xs text-slate-400">
          Operational toggles stored in MongoDB.
        </div>

        <div className="mt-4 space-y-4">
          <ToggleRow
            title="Maintenance Mode"
            desc="Temporarily disable sensitive operations during updates."
            checked={maintenanceMode}
            onChange={setMaintenanceMode}
          />
        </div>

        {maintenanceMode ? (
          <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            Maintenance Mode is ON — users may be restricted from uploading or running inference.
          </div>
        ) : null}
      </div>

      {/* Data & Maintenance */}
      <div className="rounded-2xl border border-rose-300/20 bg-rose-500/5 p-5">
        <div className="text-base font-semibold text-rose-200">Data & Maintenance</div>
        <div className="mt-1 text-xs text-rose-200/70">
          Permanent deletes. Use only for testing/reset environments.
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => dangerClear("scans")}
            disabled={saving}
            className="rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-200 hover:bg-rose-500/15 disabled:opacity-60"
          >
            Clear All Scans
          </button>

          <button
            onClick={() => dangerClear("reports")}
            disabled={saving}
            className="rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-200 hover:bg-rose-500/15 disabled:opacity-60"
          >
            Clear All Reports
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoTile({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

function ToggleRow({ title, desc, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="mt-1 text-xs text-slate-400">{desc}</div>
      </div>

      <button
        onClick={() => onChange(!checked)}
        className={[
          "h-7 w-12 rounded-full border transition",
          checked
            ? "border-emerald-400/30 bg-emerald-500/20"
            : "border-white/10 bg-white/5",
        ].join(" ")}
        aria-label={title}
      >
        <span
          className={[
            "block h-6 w-6 translate-x-0 rounded-full bg-white transition",
            checked ? "translate-x-5" : "translate-x-0.5",
          ].join(" ")}
        />
      </button>
    </div>
  );
}
