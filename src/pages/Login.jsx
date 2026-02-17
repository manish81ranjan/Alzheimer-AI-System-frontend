// // frontend/src/pages/Login.jsx
// import React, { useMemo, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// /**
//  * Login
//  * - Public page
//  * - Styled auth UI (responsive)
//  * - On success: saves token + user in localStorage
//  *
//  * Later connect:
//  *  POST /api/auth/login
//  *   -> { token, user: { id, name, email, role } }
//  */

// export default function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = useMemo(() => {
//     // ProtectedRoute sends: state: { from: location.pathname }
//     const p = location.state?.from;
//     return typeof p === "string" ? p : "/dashboard";
//   }, [location.state]);

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");

//   function onChange(e) {
//     setErr("");
//     setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
//   }

//   async function onSubmit(e) {
//     e.preventDefault();
//     setErr("");

//     if (!form.email || !form.password) {
//       setErr("Please enter email and password.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // ✅ Mock login (replace with real API call)
//       // const res = await axios.post("/api/auth/login", form)
//       // localStorage.setItem("token", res.data.token)
//       // localStorage.setItem("user", JSON.stringify(res.data.user))

//       await new Promise((r) => setTimeout(r, 650));

//       const mockUser = {
//         id: "u_1001",
//         name: "Manish",
//         email: form.email,
//         role: form.email.toLowerCase().includes("admin") ? "admin" : "user",
//       };

//       localStorage.setItem("token", "mock_jwt_token_123");
//       localStorage.setItem("user", JSON.stringify(mockUser));

//       navigate(from, { replace: true });
//     } catch (error) {
//       setErr("Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
//       <div className="mx-auto grid min-h-screen max-w-6xl items-center px-4 py-12 lg:grid-cols-2">
//         {/* Left: Brand/Info */}
//         <div className="hidden lg:block">
//           <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur">
//             <span className="h-2 w-2 rounded-full bg-emerald-400" />
//             Secure Auth • JWT • MongoDB
//           </div>

//           <h1 className="mt-5 text-4xl font-semibold tracking-tight">
//             Sign in to
//             <span className="text-slate-200"> DEMNET MRI</span>
//           </h1>

//           <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
//             Access your dashboard, upload MRI scans, view prediction history,
//             generate reports, and manage analytics (admin).
//           </p>

//           <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
//             <InfoCard title="Stages" value="ND • VMD • MID • MOD" />
//             <InfoCard title="Explainability" value="Grad-CAM ready" />
//             <InfoCard title="Reports" value="Text + PDF" />
//             <InfoCard title="Backend" value="Flask + MongoDB" />
//           </div>
//         </div>

//         {/* Right: Form */}
//         <div className="mx-auto w-full max-w-md">
//           <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
//             <div className="flex items-center gap-3">
//               <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
//                 <span className="text-sm font-semibold">AI</span>
//               </div>
//               <div>
//                 <div className="text-base font-semibold">Welcome back</div>
//                 <div className="text-xs text-slate-400">
//                   Login to continue
//                 </div>
//               </div>
//             </div>

//             <form onSubmit={onSubmit} className="mt-6 space-y-4">
//               <Field label="Email">
//                 <input
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   onChange={onChange}
//                   placeholder="you@example.com"
//                   className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/20"
//                 />
//               </Field>

//               <Field label="Password">
//                 <input
//                   name="password"
//                   type="password"
//                   value={form.password}
//                   onChange={onChange}
//                   placeholder="••••••••"
//                   className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/20"
//                 />
//               </Field>

//               {err ? (
//                 <div className="rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
//                   {err}
//                 </div>
//               ) : null}

//               <button
//                 disabled={loading}
//                 className={[
//                   "w-full rounded-xl px-4 py-3 text-sm font-semibold transition",
//                   loading
//                     ? "cursor-not-allowed bg-white/20 text-white/60"
//                     : "bg-white text-slate-950 hover:bg-slate-200",
//                 ].join(" ")}
//               >
//                 {loading ? "Signing in..." : "Sign In"}
//               </button>

//               <div className="text-center text-sm text-slate-400">
//                 Don’t have an account?{" "}
//                 <Link to="/register" className="text-slate-200 hover:text-white">
//                   Register
//                 </Link>
//               </div>

//               <div className="mt-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-slate-400">
//                 Tip: Use an email containing <span className="text-slate-200">admin</span>{" "}
//                 to simulate admin login (mock mode).
//               </div>
//             </form>
//           </div>

//           <div className="mt-6 text-center text-xs text-slate-500">
//             This is a prototype UI. Connect Flask auth API next.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------- small components -------------------- */

// function Field({ label, children }) {
//   return (
//     <label className="block">
//       <div className="mb-2 text-xs font-medium text-slate-300">{label}</div>
//       {children}
//     </label>
//   );
// }

// function InfoCard({ title, value }) {
//   return (
//     <div className="rounded-xl border border-white/10 bg-white/5 p-4">
//       <div className="text-xs text-slate-400">{title}</div>
//       <div className="mt-1 text-sm font-semibold text-slate-100">{value}</div>
//     </div>
//   );
// }

// // frontend/src/pages/Login.jsx
// import React, { useMemo, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// import { validateLogin } from "../features/auth/validators";
// import { authService } from "../features/auth/authService";

// /**
//  * Login (API-ready)
//  * - Uses validators + authService
//  * - Stores token/user via tokenStorage inside authService
//  * - Auto-redirects admin -> /admin
//  *
//  * Backend:
//  *  POST /api/auth/login -> { token, user }
//  */

// export default function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = useMemo(() => {
//     const p = location.state?.from;
//     return typeof p === "string" ? p : "/dashboard";
//   }, [location.state]);

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");

//   function onChange(e) {
//     setErr("");
//     setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
//   }

//   async function onSubmit(e) {
//     e.preventDefault();
//     setErr("");

//     const msg = validateLogin(form);
//     if (msg) {
//       setErr(msg);
//       return;
//     }

//     setLoading(true);
//     try {
//       // ✅ IMPORTANT: authService.login MUST return { token, user }
//       const res = await authService.login({
//         email: form.email.trim(),
//         password: form.password,
//       });

//       const role = (res?.user?.role || "").toLowerCase();

//       // ✅ Admin auto redirect
//       if (role === "admin") {
//         navigate("/admin", { replace: true });
//       } else {
//         navigate(from, { replace: true });
//       }
//     } catch (error) {
//       setErr(error?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
//       <div className="mx-auto grid min-h-screen max-w-6xl items-center px-4 py-12 lg:grid-cols-2">
//         {/* Left: Info */}
//         <div className="hidden lg:block">
//           <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur">
//             <span className="h-2 w-2 rounded-full bg-emerald-400" />
//             Secure Auth • JWT • MongoDB
//           </div>

//           <h1 className="mt-5 text-4xl font-semibold tracking-tight">
//             Sign in to <span className="text-slate-200">DEMNET MRI</span>
//           </h1>

//           <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
//             Access your dashboard, upload MRI scans, view prediction history,
//             generate reports, and manage analytics (admin).
//           </p>

//           <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
//             <InfoCard title="Stages" value="ND • VMD • MID • MOD" />
//             <InfoCard title="Explainability" value="Grad-CAM ready" />
//             <InfoCard title="Reports" value="Text + PDF" />
//             <InfoCard title="Backend" value="Flask + MongoDB" />
//           </div>
//         </div>

//         {/* Right: Form */}
//         <div className="mx-auto w-full max-w-md">
//           <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
//             <div className="flex items-center gap-3">
//               <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
//                 <span className="text-sm font-semibold">AI</span>
//               </div>
//               <div>
//                 <div className="text-base font-semibold">Welcome back</div>
//                 <div className="text-xs text-slate-400">Login to continue</div>
//               </div>
//             </div>

//             <form onSubmit={onSubmit} className="mt-6 space-y-4">
//               <Field label="Email">
//                 <input
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   onChange={onChange}
//                   placeholder="you@example.com"
//                   className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/20"
//                 />
//               </Field>

//               <Field label="Password">
//                 <input
//                   name="password"
//                   type="password"
//                   value={form.password}
//                   onChange={onChange}
//                   placeholder="••••••••"
//                   className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/20"
//                 />
//               </Field>

//               {err ? (
//                 <div className="rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
//                   {err}
//                 </div>
//               ) : null}

//               <button
//                 disabled={loading}
//                 className={[
//                   "w-full rounded-xl px-4 py-3 text-sm font-semibold transition",
//                   loading
//                     ? "cursor-not-allowed bg-white/20 text-white/60"
//                     : "bg-white text-slate-950 hover:bg-slate-200",
//                 ].join(" ")}
//               >
//                 {loading ? "Signing in..." : "Sign In"}
//               </button>

//               <div className="text-center text-sm text-slate-400">
//                 Don’t have an account?{" "}
//                 <Link to="/register" className="text-slate-200 hover:text-white">
//                   Register
//                 </Link>
//               </div>

//               <div className="mt-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-slate-400">
//                 Note: Login will work after backend is running (Flask API).
//               </div>
//             </form>
//           </div>

//           <div className="mt-6 text-center text-xs text-slate-500">
//             Prototype UI • API-ready auth
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------- small components -------------------- */

// function Field({ label, children }) {
//   return (
//     <label className="block">
//       <div className="mb-2 text-xs font-medium text-slate-300">{label}</div>
//       {children}
//     </label>
//   );
// }

// function InfoCard({ title, value }) {
//   return (
//     <div className="rounded-xl border border-white/10 bg-white/5 p-4">
//       <div className="text-xs text-slate-400">{title}</div>
//       <div className="mt-1 text-sm font-semibold text-slate-100">{value}</div>
//     </div>
//   );
// }
// // frontend/src/pages/Login.jsx
// import React, { useMemo, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// import { validateLogin } from "../features/auth/validators";
// import { authService } from "../features/auth/authService";

// /**
//  * Login (API-ready)
//  * - User/Admin selector is REAL (sent to backend as loginAs)
//  * - loginAs="admin" -> backend allows ONLY ENV admin (or DB role=admin if you added)
//  * - loginAs="user"  -> backend allows ONLY normal users (registered users)
//  */

// export default function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = useMemo(() => {
//     const p = location.state?.from;
//     return typeof p === "string" ? p : "/dashboard";
//   }, [location.state]);

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loginAs, setLoginAs] = useState("user"); // "user" | "admin"

//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");

//   function onChange(e) {
//     setErr("");
//     setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
//   }

//   async function onSubmit(e) {
//     e.preventDefault();
//     setErr("");

//     const msg = validateLogin(form);
//     if (msg) return setErr(msg);

//     setLoading(true);
//     try {
//       // ✅ IMPORTANT: send loginAs to backend
//       const res = await authService.login({
//         email: form.email.trim(),
//         password: form.password,
//         loginAs, // ✅ THIS is the missing piece
//       });

//       const role = (res?.user?.role || "").toLowerCase();

//       // ✅ Final routing based on actual role from token/user
//       if (role === "admin") navigate("/admin", { replace: true });
//       else navigate(from, { replace: true });
//     } catch (error) {
//       // backend should return message like:
//       // "Please use Admin login option..." OR "Admin credentials are invalid."
//       setErr(error?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
//       <div className="mx-auto grid min-h-screen max-w-6xl items-center px-4 py-12 lg:grid-cols-2">
//         {/* Left */}
//         <div className="hidden lg:block">
//           <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur">
//             <span className="h-2 w-2 rounded-full bg-emerald-400" />
//             Secure Auth • JWT • MongoDB
//           </div>

//           <h1 className="mt-5 text-4xl font-semibold tracking-tight">
//             Sign in to <span className="text-slate-200">DEMNET MRI</span>
//           </h1>

//           <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
//             Users login after Register. Admin login uses fixed ENV admin
//             credentials.
//           </p>

//           <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
//             <InfoCard title="User" value="Upload • History • Reports" />
//             <InfoCard title="Admin" value="Users • Analytics • Controls" />
//             <InfoCard title="Security" value="JWT protected APIs" />
//             <InfoCard title="Backend" value="Flask + MongoDB" />
//           </div>
//         </div>

//         {/* Right */}
//         <div className="mx-auto w-full max-w-md">
//           <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
//             <div className="flex items-center gap-3">
//               <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
//                 <span className="text-sm font-semibold">AI</span>
//               </div>
//               <div>
//                 <div className="text-base font-semibold">Welcome back</div>
//                 <div className="text-xs text-slate-400">Login to continue</div>
//               </div>
//             </div>

//             {/* Role selector */}
//             <div className="mt-5">
//               <div className="text-xs font-medium text-slate-300">Login as</div>
//               <div className="mt-2 grid grid-cols-2 gap-2">
//                 <RoleBtn
//                   active={loginAs === "user"}
//                   onClick={() => setLoginAs("user")}
//                 >
//                   User
//                 </RoleBtn>
//                 <RoleBtn
//                   active={loginAs === "admin"}
//                   onClick={() => setLoginAs("admin")}
//                 >
//                   Admin
//                 </RoleBtn>
//               </div>

//               <div className="mt-2 text-xs text-slate-400">
//                 {loginAs === "admin"
//                   ? "Admin login: only ENV admin credentials will work."
//                   : "User login: only accounts created via Register will work."}
//               </div>
//             </div>

//             <form onSubmit={onSubmit} className="mt-6 space-y-4">
//               <Field label="Email">
//                 <input
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   onChange={onChange}
//                   placeholder={
//                     loginAs === "admin" ? "ADMIN_EMAIL" : "you@example.com"
//                   }
//                   className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/20"
//                 />
//               </Field>

//               <Field label="Password">
//                 <input
//                   name="password"
//                   type="password"
//                   value={form.password}
//                   onChange={onChange}
//                   placeholder="••••••••"
//                   className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/20"
//                 />
//               </Field>

//               {err ? (
//                 <div className="rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
//                   {err}
//                 </div>
//               ) : null}

//               <button
//                 disabled={loading}
//                 className={[
//                   "w-full rounded-xl px-4 py-3 text-sm font-semibold transition",
//                   loading
//                     ? "cursor-not-allowed bg-white/20 text-white/60"
//                     : "bg-white text-slate-950 hover:bg-slate-200",
//                 ].join(" ")}
//               >
//                 {loading
//                   ? "Signing in..."
//                   : loginAs === "admin"
//                   ? "Sign In as Admin"
//                   : "Sign In"}
//               </button>

//               <div className="text-center text-sm text-slate-400">
//                 Don’t have an account?{" "}
//                 <Link to="/register" className="text-slate-200 hover:text-white">
//                   Register
//                 </Link>
//               </div>

//               <div className="mt-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-slate-400">
//                 Tip: If you changed backend auth, logout and login again.
//               </div>
//             </form>
//           </div>

//           <div className="mt-6 text-center text-xs text-slate-500">
//             API-ready auth
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- small components ---------- */

// function Field({ label, children }) {
//   return (
//     <label className="block">
//       <div className="mb-2 text-xs font-medium text-slate-300">{label}</div>
//       {children}
//     </label>
//   );
// }

// function InfoCard({ title, value }) {
//   return (
//     <div className="rounded-xl border border-white/10 bg-white/5 p-4">
//       <div className="text-xs text-slate-400">{title}</div>
//       <div className="mt-1 text-sm font-semibold text-slate-100">{value}</div>
//     </div>
//   );
// }

// function RoleBtn({ active, children, ...props }) {
//   return (
//     <button
//       type="button"
//       {...props}
//       className={[
//         "rounded-xl px-4 py-2 text-sm transition",
//         active
//           ? "bg-white text-slate-950 font-semibold"
//           : "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
//       ].join(" ")}
//     >
//       {children}
//     </button>
//   );
// }
// frontend/src/pages/Login.jsx
import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { validateLogin } from "../features/auth/validators";
import { authService } from "../features/auth/authService";

/**
 * Login (UI improved + API-ready)
 * - loginAs is sent to backend
 * - role-based navigation supported
 */
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = useMemo(() => {
    const p = location.state?.from;
    return typeof p === "string" ? p : "/dashboard";
  }, [location.state]);

  const [form, setForm] = useState({ email: "", password: "" });
  const [loginAs, setLoginAs] = useState("user"); // "user" | "admin"

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  function onChange(e) {
    setErr("");
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    const msg = validateLogin(form);
    if (msg) return setErr(msg);

    setLoading(true);
    try {
      const res = await authService.login({
        email: form.email.trim(),
        password: form.password,
        loginAs,
      });

      const role = (res?.user?.role || "").toLowerCase();
      if (role === "admin") navigate("/admin", { replace: true });
      else navigate(from, { replace: true });
    } catch (error) {
      setErr(error?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-220px] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-500/18 blur-[110px]" />
        <div className="absolute right-[-180px] top-[20%] h-[520px] w-[720px] rounded-full bg-cyan-500/14 blur-[120px]" />
        <div className="absolute bottom-[-220px] left-[-180px] h-[520px] w-[720px] rounded-full bg-fuchsia-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2">
        {/* LEFT (branding) */}
        <div className="hidden lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-200 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,.55)]" />
            Secure Auth • JWT • MongoDB
          </div>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight">
            Sign in to{" "}
            <span className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
              DEMNET MRI
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
            Users login after Register. Admin login uses fixed ENV admin credentials.
            Role-based routes are protected using JWT.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
            <InfoCard title="User Access" value="Upload • History • Reports" />
            <InfoCard title="Admin Access" value="Users • Analytics • Controls" />
            <InfoCard title="Security" value="JWT protected APIs" />
            <InfoCard title="Backend" value="Flask + MongoDB" />
          </div>

          <div className="mt-8 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px w-10 bg-white/10" />
            Production-ready UI
          </div>
        </div>

        {/* RIGHT (form card) */}
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_30px_120px_rgba(0,0,0,.55)] backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <span className="text-sm font-semibold tracking-wide">AI</span>
              </div>
              <div className="min-w-0">
                <div className="text-base font-semibold">Welcome back</div>
                <div className="text-xs text-slate-400">
                  Login to continue to your dashboard
                </div>
              </div>
            </div>

            {/* Role selector */}
            <div className="mt-5">
              <div className="text-xs font-medium text-slate-300">Login as</div>

              <div className="mt-2 rounded-2xl border border-white/10 bg-black/25 p-1">
                <div className="grid grid-cols-2 gap-1">
                  <RoleBtn
                    active={loginAs === "user"}
                    onClick={() => setLoginAs("user")}
                    icon={<IconUser />}
                  >
                    User
                  </RoleBtn>
                  <RoleBtn
                    active={loginAs === "admin"}
                    onClick={() => setLoginAs("admin")}
                    icon={<IconShield />}
                  >
                    Admin
                  </RoleBtn>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-xs">
                {loginAs === "admin" ? (
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className="mt-0.5 text-emerald-300">
                      <IconInfo />
                    </span>
                    <div>
                      <div className="font-semibold text-slate-100">
                        Admin login enabled
                      </div>
                      <div className="mt-1 text-slate-400">
                        Only ENV admin credentials will work here.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className="mt-0.5 text-emerald-300">
                      <IconInfo />
                    </span>
                    <div>
                      <div className="font-semibold text-slate-100">User login</div>
                      <div className="mt-1 text-slate-400">
                        Use an account created via Register.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <Field label="Email">
                <InputShell>
                  <span className="text-slate-400">
                    <IconMail />
                  </span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder={loginAs === "admin" ? "ADMIN_EMAIL" : "you@example.com"}
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    autoComplete="email"
                  />
                </InputShell>
              </Field>

              <Field label="Password">
                <InputShell>
                  <span className="text-slate-400">
                    <IconLock />
                  </span>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={onChange}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    autoComplete="current-password"
                  />
                </InputShell>
              </Field>

              {err ? (
                <div className="rounded-2xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {err}
                </div>
              ) : null}

              <button
                disabled={loading}
                className={[
                  "w-full rounded-2xl px-4 py-3 text-sm font-semibold transition",
                  "shadow-[0_18px_50px_rgba(255,255,255,.08)]",
                  loading
                    ? "cursor-not-allowed bg-white/20 text-white/60"
                    : "bg-white text-slate-950 hover:bg-slate-200 active:scale-[0.99]",
                ].join(" ")}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Spinner />
                      Signing in...
                    </>
                  ) : loginAs === "admin" ? (
                    "Sign In as Admin"
                  ) : (
                    "Sign In"
                  )}
                </span>
              </button>

              <div className="text-center text-sm text-slate-400">
                Don’t have an account?{" "}
                <Link to="/register" className="text-slate-200 hover:text-white">
                  Register
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-xs text-slate-400">
                Tip: If you changed backend auth, logout and login again.
              </div>
            </form>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            DEMNET MRI • API-ready auth
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- small components ---------- */

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="mb-2 text-xs font-medium text-slate-300">{label}</div>
      {children}
    </label>
  );
}

function InputShell({ children }) {
  return (
    <div
      className={[
        "flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-3",
        "transition",
        "focus-within:border-white/20 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,.18)]",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
      <div className="text-xs text-slate-400">{title}</div>
      <div className="mt-1 text-sm font-semibold text-slate-100">{value}</div>
    </div>
  );
}

function RoleBtn({ active, icon, children, ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={[
        "flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm transition",
        "border",
        active
          ? "border-white/10 bg-white text-slate-950 font-semibold shadow-[0_12px_30px_rgba(255,255,255,.08)]"
          : "border-transparent text-slate-100 hover:bg-white/10",
      ].join(" ")}
    >
      <span className={active ? "text-slate-900" : "text-slate-300"}>{icon}</span>
      {children}
    </button>
  );
}

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-950/20 border-t-slate-950"
      aria-label="loading"
    />
  );
}

/* ---------- tiny icons (no libs) ---------- */

function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 21a8 8 0 1 0-16 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 20 6v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6h16v12H4V6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 11V8a5 5 0 0 1 10 0v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 11h12v10H6V11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 16v-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 8h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
