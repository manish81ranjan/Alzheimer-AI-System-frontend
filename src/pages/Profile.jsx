// // // frontend/src/pages/Profile.jsx
// // import React, { useMemo } from "react";
// // import { Link, useNavigate } from "react-router-dom";

// // /**
// //  * Profile
// //  * - Protected page
// //  * - Displays local user info (from localStorage)
// //  * - Logout action
// //  * - Later: connect to GET /api/auth/me + update profile endpoints
// //  */

// // export default function Profile() {
// //   const navigate = useNavigate();

// //   const user = useMemo(() => {
// //     try {
// //       return JSON.parse(localStorage.getItem("user") || "null");
// //     } catch {
// //       return null;
// //     }
// //   }, []);

// //   const token = localStorage.getItem("token");
// //   const isAdmin = (user?.role || "").toLowerCase() === "admin";

// //   function logout() {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     navigate("/login", { replace: true });
// //   }

// //   return (
// //     <div className="mx-auto max-w-6xl px-4 py-8">
// //       {/* Header */}
// //       <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
// //         <div>
// //           <div className="text-sm text-slate-400">Profile</div>
// //           <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
// //             Account Settings
// //           </h1>
// //           <p className="mt-2 text-sm text-slate-300">
// //             View your account details and manage session.
// //           </p>
// //         </div>

// //         <div className="flex flex-wrap gap-3">
// //           <Link
// //             to="/dashboard"
// //             className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
// //           >
// //             Dashboard
// //           </Link>
// //           {isAdmin ? (
// //             <Link
// //               to="/admin"
// //               className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
// //             >
// //               Admin Panel
// //             </Link>
// //           ) : null}
// //         </div>
// //       </div>

// //       {/* Content */}
// //       <div className="mt-8 grid gap-4 lg:grid-cols-3">
// //         {/* Left: user card */}
// //         <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
// //           <div className="flex items-center gap-3">
// //             <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10">
// //               <span className="text-lg">👤</span>
// //             </div>
// //             <div className="min-w-0">
// //               <div className="truncate text-base font-semibold text-white">
// //                 {user?.name || "Unknown User"}
// //               </div>
// //               <div className="truncate text-sm text-slate-400">
// //                 {user?.email || "—"}
// //               </div>
// //             </div>
// //           </div>

// //           <div className="mt-5 space-y-2 text-sm">
// //             <Row label="Role" value={user?.role || "user"} />
// //             <Row label="User ID" value={user?.id || "—"} />
// //             <Row label="Session" value={token ? "Active" : "Missing token"} />
// //           </div>

// //           <div className="mt-5 flex flex-wrap gap-2">
// //             <Pill label="JWT" />
// //             <Pill label="MongoDB" />
// //             <Pill label="Flask API" />
// //           </div>

// //           <button
// //             onClick={logout}
// //             className="mt-6 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
// //           >
// //             Logout
// //           </button>
// //         </div>

// //         {/* Right: settings placeholders */}
// //         <div className="lg:col-span-2 space-y-4">
// //           <Card title="Profile Details" subtitle="(Mock mode — backend later)">
// //             <div className="grid gap-4 md:grid-cols-2">
// //               <Field label="Full Name" value={user?.name || ""} />
// //               <Field label="Email" value={user?.email || ""} />
// //               <Field label="Role" value={user?.role || "user"} />
// //               <Field label="Account Status" value="Active" />
// //             </div>

// //             <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4 text-xs text-slate-400">
// //               Next step: connect Flask endpoints to fetch real profile data:
// //               <div className="mt-2 text-slate-300">
// //                 GET <span className="text-slate-100">/api/auth/me</span> and PATCH{" "}
// //                 <span className="text-slate-100">/api/users/me</span>
// //               </div>
// //             </div>
// //           </Card>

// //           <Card title="Security" subtitle="Session & token storage">
// //             <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
// //               <li>
// //                 Token stored in <span className="text-slate-100">localStorage</span>{" "}
// //                 (prototype)
// //               </li>
// //               <li>
// //                 In production, consider <span className="text-slate-100">httpOnly cookies</span>
// //               </li>
// //               <li>
// //                 Add refresh tokens + expiration handling in backend
// //               </li>
// //             </ul>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* -------------------- small components -------------------- */

// // function Card({ title, subtitle, children }) {
// //   return (
// //     <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
// //       <div>
// //         <div className="text-base font-semibold text-white">{title}</div>
// //         {subtitle ? (
// //           <div className="mt-1 text-xs text-slate-400">{subtitle}</div>
// //         ) : null}
// //       </div>
// //       <div className="mt-4">{children}</div>
// //     </div>
// //   );
// // }

// // function Row({ label, value }) {
// //   return (
// //     <div className="flex items-start justify-between gap-4">
// //       <div className="text-slate-400">{label}</div>
// //       <div className="text-right font-semibold text-slate-100">{value}</div>
// //     </div>
// //   );
// // }

// // function Pill({ label }) {
// //   return (
// //     <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200">
// //       {label}
// //     </span>
// //   );
// // }

// // function Field({ label, value }) {
// //   return (
// //     <div className="rounded-xl border border-white/10 bg-black/25 p-4">
// //       <div className="text-xs text-slate-400">{label}</div>
// //       <div className="mt-1 truncate text-sm font-semibold text-slate-100">
// //         {value || "—"}
// //       </div>
// //     </div>
// //   );
// // }


// // frontend/src/pages/Profile.jsx
// import React, { useMemo } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import { tokenStorage } from "../api/tokenStorage";
// import { authService } from "../features/auth/authService";

// /**
//  * Profile (API-ready)
//  * - Reads user/token from tokenStorage
//  * - Logout uses authService.logout()
//  * - Later you can call authService.me() to refresh user
//  */

// export default function Profile() {
//   const navigate = useNavigate();

//   const user = useMemo(() => tokenStorage.getUser(), []);
//   const token = tokenStorage.getToken();
//   const isAdmin = tokenStorage.isAdmin();

//   function logout() {
//     authService.logout();
//     navigate("/login", { replace: true });
//   }

//   return (
//     <div className="mx-auto max-w-6xl px-4 py-8">
//       {/* Header */}
//       <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
//         <div>
//           <div className="text-sm text-slate-400">Profile</div>
//           <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
//             Account Settings
//           </h1>
//           <p className="mt-2 text-sm text-slate-300">
//             View your account details and manage session.
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           <Link
//             to="/dashboard"
//             className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
//           >
//             Dashboard
//           </Link>

//           {isAdmin ? (
//             <Link
//               to="/admin"
//               className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
//             >
//               Admin Panel
//             </Link>
//           ) : null}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="mt-8 grid gap-4 lg:grid-cols-3">
//         {/* Left: user card */}
//         <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
//           <div className="flex items-center gap-3">
//             <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10">
//               <span className="text-lg">👤</span>
//             </div>
//             <div className="min-w-0">
//               <div className="truncate text-base font-semibold text-white">
//                 {user?.name || "Unknown User"}
//               </div>
//               <div className="truncate text-sm text-slate-400">
//                 {user?.email || "—"}
//               </div>
//             </div>
//           </div>

//           <div className="mt-5 space-y-2 text-sm">
//             <Row label="Role" value={user?.role || "user"} />
//             <Row label="User ID" value={user?.id || "—"} />
//             <Row label="Session" value={token ? "Active" : "Missing token"} />
//           </div>

//           <div className="mt-5 flex flex-wrap gap-2">
//             <Pill label="JWT" />
//             <Pill label="MongoDB" />
//             <Pill label="Flask API" />
//           </div>

//           <button
//             onClick={logout}
//             className="mt-6 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Right: settings placeholders */}
//         <div className="lg:col-span-2 space-y-4">
//           <Card title="Profile Details" subtitle="(API-ready — backend later)">
//             <div className="grid gap-4 md:grid-cols-2">
//               <Field label="Full Name" value={user?.name || ""} />
//               <Field label="Email" value={user?.email || ""} />
//               <Field label="Role" value={user?.role || "user"} />
//               <Field label="Account Status" value="Active" />
//             </div>

//             <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4 text-xs text-slate-400">
//               Next: connect profile fetch endpoint:
//               <div className="mt-2 text-slate-300">
//                 GET <span className="text-slate-100">/api/auth/me</span>
//               </div>
//             </div>
//           </Card>

//           <Card title="Security" subtitle="Session & token storage">
//             <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
//               <li>
//                 Token stored in{" "}
//                 <span className="text-slate-100">localStorage</span> (prototype)
//               </li>
//               <li>
//                 In production use{" "}
//                 <span className="text-slate-100">httpOnly cookies</span>
//               </li>
//               <li>Add refresh tokens + expiration in backend</li>
//             </ul>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------- small components -------------------- */

// function Card({ title, subtitle, children }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
//       <div>
//         <div className="text-base font-semibold text-white">{title}</div>
//         {subtitle ? (
//           <div className="mt-1 text-xs text-slate-400">{subtitle}</div>
//         ) : null}
//       </div>
//       <div className="mt-4">{children}</div>
//     </div>
//   );
// }

// function Row({ label, value }) {
//   return (
//     <div className="flex items-start justify-between gap-4">
//       <div className="text-slate-400">{label}</div>
//       <div className="text-right font-semibold text-slate-100">{value}</div>
//     </div>
//   );
// }

// function Pill({ label }) {
//   return (
//     <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200">
//       {label}
//     </span>
//   );
// }

// function Field({ label, value }) {
//   return (
//     <div className="rounded-xl border border-white/10 bg-black/25 p-4">
//       <div className="text-xs text-slate-400">{label}</div>
//       <div className="mt-1 truncate text-sm font-semibold text-slate-100">
//         {value || "—"}
//       </div>
//     </div>
//   );
// }
// frontend/src/pages/Profile.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { tokenStorage } from "../api/tokenStorage";
import { authService } from "../features/auth/authService";
import { apiDelete, apiPatch } from "../api/http";

export default function Profile() {
  const navigate = useNavigate();

  const storedUser = useMemo(() => tokenStorage.getUser(), []);
  const token = tokenStorage.getToken();
  const isAdmin = tokenStorage.isAdmin();

  const [user, setUser] = useState(storedUser);

  // alerts
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  // modals
  const [editOpen, setEditOpen] = useState(false);
  const [passOpen, setPassOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // edit form
  const [name, setName] = useState(storedUser?.name || "");
  const [email, setEmail] = useState(storedUser?.email || "");

  // password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // delete confirm
  const [deleteText, setDeleteText] = useState("");

  // session
  const sessionStatus = token ? "Active" : "Missing token";

  const lastLogin = useMemo(() => {
    // 1) If you explicitly store it after login, show it
    const stored = localStorage.getItem("last_login_at");
    if (stored) return stored;

    // 2) Otherwise decode JWT iat (issued-at) as last login
    try {
      if (!token || token.split(".").length !== 3) return "—";
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (!payload?.iat) return "—";
      const dt = new Date(payload.iat * 1000);
      return dt.toLocaleString();
    } catch {
      return "—";
    }
  }, [token]);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user]);

  function logout() {
    authService.logout();
    navigate("/login", { replace: true });
  }

  function resetAlerts() {
    setErr("");
    setOk("");
  }

  function copy(text, label) {
    resetAlerts();
    if (!text) return;
    navigator.clipboard
      .writeText(String(text))
      .then(() => setOk(`${label} ✅`))
      .catch(() => setErr("Copy failed."));
  }

  // ---------------- API calls ----------------
  // PATCH  /api/users/me               { name, email } -> { user }
  // PATCH  /api/users/me/password      { currentPassword, newPassword } -> { success, message }
  // DELETE /api/users/me
  // ------------------------------------------

  async function saveProfile() {
    setLoading(true);
    resetAlerts();

    try {
      if (!name.trim()) throw new Error("Name is required.");
      if (!email.trim()) throw new Error("Email is required.");

      const res = await apiPatch("/api/users/me", {
        name: name.trim(),
        email: email.trim(),
      });

      const nextUser = res?.user || {
        ...user,
        name: name.trim(),
        email: email.trim(),
      };

      setUser(nextUser);
      tokenStorage.setUser?.(nextUser);
      localStorage.setItem("user", JSON.stringify(nextUser)); // fallback

      setOk("Profile updated ✅");
      setEditOpen(false);
    } catch (e) {
      setErr(e?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  }

  async function changePassword() {
    setLoading(true);
    resetAlerts();

    try {
      if (!currentPassword) throw new Error("Current password is required.");
      if (!newPassword || newPassword.length < 6) {
        throw new Error("New password must be at least 6 characters.");
      }
      if (newPassword !== confirmNewPassword) {
        throw new Error("New passwords do not match.");
      }

      // ✅ FIX: correct backend endpoint + method
      await apiPatch("/api/users/me/password", {
        currentPassword,
        newPassword,
      });

      setOk("Password updated ✅");
      setPassOpen(false);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (e) {
      setErr(e?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteAccount() {
    setLoading(true);
    resetAlerts();

    try {
      if (deleteText !== "DELETE") throw new Error('Type "DELETE" to confirm.');

      await apiDelete("/api/users/me");

      authService.logout();
      navigate("/login", { replace: true });
    } catch (e) {
      setErr(e?.message || "Failed to delete account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm text-slate-400">My Account</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
            Profile
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Update your details, manage security, and view session.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/dashboard"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
          >
            Dashboard
          </Link>

          <Link
            to="/upload"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Upload Scan
          </Link>

          {isAdmin ? (
            <Link
              to="/admin"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
            >
              Admin
            </Link>
          ) : null}
        </div>
      </div>

      {/* Alerts */}
      {err ? (
        <div className="mt-6 rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {err}
        </div>
      ) : null}

      {ok ? (
        <div className="mt-6 rounded-xl border border-emerald-300/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {ok}
        </div>
      ) : null}

      {/* Main grid */}
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {/* Profile card */}
        <Card>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/10">
              <span className="text-lg">👤</span>
            </div>
            <div className="min-w-0">
              <div className="truncate text-base font-semibold text-white">
                {user?.name || "User"}
              </div>
              <div className="truncate text-sm text-slate-400">
                {user?.email || "—"}
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2 text-sm">
            <Row label="Role" value={(user?.role || "user").toUpperCase()} />
            <Row label="User ID" value={user?.id || "—"} />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <MiniBtn
              onClick={() => copy(user?.email, "Email copied")}
              disabled={!user?.email}
            >
              Copy Email
            </MiniBtn>
            <MiniBtn
              onClick={() => copy(user?.id, "User ID copied")}
              disabled={!user?.id}
            >
              Copy ID
            </MiniBtn>
          </div>

          <div className="mt-6 grid gap-2">
            <button
              onClick={() => {
                resetAlerts();
                setEditOpen(true);
              }}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 hover:bg-white/10"
            >
              Edit Profile
            </button>

            <button
              onClick={() => {
                resetAlerts();
                setPassOpen(true);
              }}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 hover:bg-white/10"
            >
              Change Password
            </button>

            <button
              onClick={logout}
              className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Logout
            </button>
          </div>
        </Card>

        {/* Right side */}
        <div className="lg:col-span-2 space-y-4">
          {/* Session */}
          <Card title="Session" subtitle="Basic status of your login session">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Session Status" value={sessionStatus} />
              <Field label="Last Login" value={lastLogin} />
            </div>
            <div className="mt-4 text-xs text-slate-400">
              If your session becomes invalid, logout and login again.
            </div>
          </Card>

          {/* Account info */}
          <Card title="Account Details" subtitle="Your saved account information">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full Name" value={user?.name || "—"} />
              <Field label="Email" value={user?.email || "—"} />
            </div>
          </Card>

          {/* Danger zone */}
          <div className="rounded-2xl border border-rose-300/20 bg-rose-500/5 p-6">
            <div className="text-base font-semibold text-rose-200">
              Danger Zone
            </div>
            <div className="mt-1 text-sm text-rose-200/70">
              Deleting your account permanently removes your data.
            </div>

            <button
              onClick={() => {
                resetAlerts();
                setDeleteText("");
                setDeleteOpen(true);
              }}
              className="mt-4 rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-200 hover:bg-rose-500/15"
            >
              Delete My Account
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {editOpen ? (
        <Modal title="Edit Profile" onClose={() => setEditOpen(false)}>
          <div className="grid gap-3">
            <Input
              label="Full Name"
              value={name}
              onChange={setName}
              placeholder="Your name"
            />
            <Input
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
            />
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => setEditOpen(false)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={saveProfile}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </Modal>
      ) : null}

      {passOpen ? (
        <Modal title="Change Password" onClose={() => setPassOpen(false)}>
          <div className="grid gap-3">
            <PasswordInput
              label="Current Password"
              value={currentPassword}
              onChange={setCurrentPassword}
            />
            <PasswordInput
              label="New Password"
              value={newPassword}
              onChange={setNewPassword}
            />
            <PasswordInput
              label="Confirm New Password"
              value={confirmNewPassword}
              onChange={setConfirmNewPassword}
            />
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => setPassOpen(false)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={changePassword}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </Modal>
      ) : null}

      {deleteOpen ? (
        <Modal title="Delete Account" onClose={() => setDeleteOpen(false)} danger>
          <div className="rounded-xl border border-rose-300/20 bg-rose-500/10 p-4 text-sm text-rose-200">
            This is permanent. Type <b>DELETE</b> to confirm.
          </div>

          <div className="mt-4">
            <Input
              label="Confirmation"
              value={deleteText}
              onChange={setDeleteText}
              placeholder='Type "DELETE"'
            />
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => setDeleteOpen(false)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              disabled={loading || deleteText !== "DELETE"}
              onClick={deleteAccount}
              className="rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-200 hover:bg-rose-500/15 disabled:opacity-60"
            >
              {loading ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

/* UI components */

function Card({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      {title ? (
        <div>
          <div className="text-base font-semibold text-white">{title}</div>
          {subtitle ? (
            <div className="mt-1 text-xs text-slate-400">{subtitle}</div>
          ) : null}
        </div>
      ) : null}
      <div className={title ? "mt-4" : ""}>{children}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="text-slate-400">{label}</div>
      <div className="text-right font-semibold text-slate-100">{value}</div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/25 p-4">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1 truncate text-sm font-semibold text-slate-100">
        {value || "—"}
      </div>
    </div>
  );
}

function MiniBtn({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={[
        "rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10 disabled:opacity-40",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Modal({ title, children, onClose, danger = false }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-950 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div
              className={
                danger
                  ? "text-rose-200 font-semibold"
                  : "text-white font-semibold"
              }
            >
              {title}
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-100 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder }) {
  return (
    <div>
      <div className="text-xs text-slate-400">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-white/20"
      />
    </div>
  );
}

function PasswordInput({ label, value, onChange }) {
  return (
    <div>
      <div className="text-xs text-slate-400">{label}</div>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="••••••••"
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-white/20"
      />
    </div>
  );
}
