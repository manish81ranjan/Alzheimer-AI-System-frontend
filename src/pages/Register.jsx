// // frontend/src/pages/Register.jsx
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// /**
//  * Register
//  * - Public page
//  * - Styled register UI (responsive)
//  * - On success: saves token + user in localStorage then redirects to /dashboard
//  *
//  * Later connect:
//  *  POST /api/auth/register
//  *   -> { token, user: { id, name, email, role } }
//  */

// export default function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirm: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");

//   function onChange(e) {
//     setErr("");
//     setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
//   }

//   function validate() {
//     if (!form.name || !form.email || !form.password || !form.confirm) {
//       return "All fields are required.";
//     }
//     if (form.password.length < 6) {
//       return "Password must be at least 6 characters.";
//     }
//     if (form.password !== form.confirm) {
//       return "Passwords do not match.";
//     }
//     return "";
//   }

//   async function onSubmit(e) {
//     e.preventDefault();
//     setErr("");

//     const v = validate();
//     if (v) {
//       setErr(v);
//       return;
//     }

//     setLoading(true);

//     try {
//       // ✅ Mock register (replace with real API call)
//       // const res = await axios.post("/api/auth/register", {...})
//       // localStorage.setItem("token", res.data.token)
//       // localStorage.setItem("user", JSON.stringify(res.data.user))

//       await new Promise((r) => setTimeout(r, 700));

//       const mockUser = {
//         id: "u_" + Math.floor(Math.random() * 9000 + 1000),
//         name: form.name.trim(),
//         email: form.email.trim(),
//         role: "user",
//       };

//       localStorage.setItem("token", "mock_jwt_token_456");
//       localStorage.setItem("user", JSON.stringify(mockUser));

//       navigate("/dashboard", { replace: true });
//     } catch (error) {
//       setErr("Registration failed. Please try again.");
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
//             <span className="h-2 w-2 rounded-full bg-cyan-300" />
//             Create account • Start uploading MRI
//           </div>

//           <h1 className="mt-5 text-4xl font-semibold tracking-tight">
//             Create your
//             <span className="text-slate-200"> DEMNET MRI</span> account
//           </h1>

//           <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
//             Your account stores scan history, predictions, generated reports, and
//             analytics in MongoDB via Flask backend.
//           </p>

//           <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
//             <InfoCard title="Upload" value="MRI images (PNG/JPG)" />
//             <InfoCard title="Predict" value="4 stages classification" />
//             <InfoCard title="Explain" value="Grad-CAM heatmaps" />
//             <InfoCard title="Report" value="Auto clinical summary" />
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
//                 <div className="text-base font-semibold">Create account</div>
//                 <div className="text-xs text-slate-400">
//                   Register to continue
//                 </div>
//               </div>
//             </div>

//             <form onSubmit={onSubmit} className="mt-6 space-y-4">
//               <Field label="Full Name">
//                 <input
//                   name="name"
//                   value={form.name}
//                   onChange={onChange}
//                   placeholder="Manish Ranjan"
//                   className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/20"
//                 />
//               </Field>

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
//                   placeholder="Minimum 6 characters"
//                   className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/20"
//                 />
//               </Field>

//               <Field label="Confirm Password">
//                 <input
//                   name="confirm"
//                   type="password"
//                   value={form.confirm}
//                   onChange={onChange}
//                   placeholder="Re-enter password"
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
//                 {loading ? "Creating..." : "Create Account"}
//               </button>

//               <div className="text-center text-sm text-slate-400">
//                 Already have an account?{" "}
//                 <Link to="/login" className="text-slate-200 hover:text-white">
//                   Login
//                 </Link>
//               </div>

//               <div className="mt-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-slate-400">
//                 This page is in mock mode. Next we’ll connect Flask + MongoDB auth.
//               </div>
//             </form>
//           </div>

//           <div className="mt-6 text-center text-xs text-slate-500">
//             By registering, you agree to the prototype disclaimer.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------- helpers -------------------- */

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


// // frontend/src/pages/Register.jsx
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import { validateRegister } from "../features/auth/validators";
// import { authService } from "../features/auth/authService";

// /**
//  * Register (API-ready)
//  * - Uses validators + authService
//  * - Stores token/user via tokenStorage inside authService
//  *
//  * Backend:
//  *  POST /api/auth/register -> { token, user }
//  */

// export default function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirm: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");

//   function onChange(e) {
//     setErr("");
//     setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
//   }

//   async function onSubmit(e) {
//     e.preventDefault();
//     setErr("");

//     const msg = validateRegister(form);
//     if (msg) {
//       setErr(msg);
//       return;
//     }

//     setLoading(true);
//     try {
//       await authService.register({
//         name: form.name.trim(),
//         email: form.email.trim(),
//         password: form.password,
//       });

//       navigate("/dashboard", { replace: true });
//     } catch (error) {
//       setErr(error?.message || "Registration failed. Please try again.");
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
//             <span className="h-2 w-2 rounded-full bg-cyan-300" />
//             Create account • Start uploading MRI
//           </div>

//           <h1 className="mt-5 text-4xl font-semibold tracking-tight">
//             Create your <span className="text-slate-200">DEMNET MRI</span>{" "}
//             account
//           </h1>

//           <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
//             Store scan history, predictions, generated reports, and analytics in
//             MongoDB via Flask backend.
//           </p>

//           <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
//             <InfoCard title="Upload" value="MRI images (PNG/JPG)" />
//             <InfoCard title="Predict" value="4 stages classification" />
//             <InfoCard title="Explain" value="Grad-CAM heatmaps" />
//             <InfoCard title="Report" value="Auto clinical summary" />
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
//                 <div className="text-base font-semibold">Create account</div>
//                 <div className="text-xs text-slate-400">
//                   Register to continue
//                 </div>
//               </div>
//             </div>

//             <form onSubmit={onSubmit} className="mt-6 space-y-4">
//               <Field label="Full Name">
//                 <input
//                   name="name"
//                   value={form.name}
//                   onChange={onChange}
//                   placeholder="Manish Ranjan"
//                   className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/20"
//                 />
//               </Field>

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
//                   placeholder="Minimum 6 characters"
//                   className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/20"
//                 />
//               </Field>

//               <Field label="Confirm Password">
//                 <input
//                   name="confirm"
//                   type="password"
//                   value={form.confirm}
//                   onChange={onChange}
//                   placeholder="Re-enter password"
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
//                 {loading ? "Creating..." : "Create Account"}
//               </button>

//               <div className="text-center text-sm text-slate-400">
//                 Already have an account?{" "}
//                 <Link to="/login" className="text-slate-200 hover:text-white">
//                   Login
//                 </Link>
//               </div>

//               <div className="mt-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-slate-400">
//                 Note: Register will work after backend is running (Flask API).
//               </div>
//             </form>
//           </div>

//           <div className="mt-6 text-center text-xs text-slate-500">
//             Prototype UI • API-ready signup
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------- helpers -------------------- */

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
// frontend/src/pages/Register.jsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { validateRegister } from "../features/auth/validators";
import { authService } from "../features/auth/authService";

/**
 * Register (UI improved + API-ready)
 * Backend:
 *  POST /api/auth/register -> { token, user }
 */
export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  function onChange(e) {
    setErr("");
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    const msg = validateRegister(form);
    if (msg) return setErr(msg);

    setLoading(true);
    try {
      await authService.register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErr(error?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const strength = useMemo(() => {
    const p = form.password || "";
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;

    if (!p) return { label: "—", value: 0 };
    if (score <= 2) return { label: "Weak", value: 35 };
    if (score <= 4) return { label: "Good", value: 70 };
    return { label: "Strong", value: 100 };
  }, [form.password]);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-220px] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-500/18 blur-[110px]" />
        <div className="absolute right-[-180px] top-[20%] h-[520px] w-[720px] rounded-full bg-cyan-500/14 blur-[120px]" />
        <div className="absolute bottom-[-240px] left-[-180px] h-[520px] w-[720px] rounded-full bg-fuchsia-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2">
        {/* LEFT */}
        <div className="hidden lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-200 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,.45)]" />
            Create account • Start uploading MRI
          </div>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight">
            Create your{" "}
            <span className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
              DEMNET MRI
            </span>{" "}
            account
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
            Save scan history, predictions, generated reports, and analytics in MongoDB
            via Flask backend.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
            <InfoCard title="Upload" value="MRI images (PNG/JPG)" icon={<IconUpload />} />
            <InfoCard title="Predict" value="4 stages classification" icon={<IconSpark />} />
            <InfoCard title="Explain" value="Grad-CAM heatmaps" icon={<IconEye />} />
            <InfoCard title="Report" value="Auto clinical summary" icon={<IconDoc />} />
          </div>

          <div className="mt-8 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px w-10 bg-white/10" />
            Secure signup • JWT session
          </div>
        </div>

        {/* RIGHT */}
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_30px_120px_rgba(0,0,0,.55)] backdrop-blur-xl">
            {/* header */}
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <span className="text-sm font-semibold tracking-wide">AI</span>
              </div>
              <div className="min-w-0">
                <div className="text-base font-semibold">Create account</div>
                <div className="text-xs text-slate-400">Register to continue</div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <Field label="Full Name">
                <InputShell>
                  <span className="text-slate-400">
                    <IconUser />
                  </span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Manish Ranjan"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    autoComplete="name"
                  />
                </InputShell>
              </Field>

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
                    placeholder="you@example.com"
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
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={onChange}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200 hover:bg-white/10"
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </InputShell>

                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Password strength</span>
                    <span className="text-slate-300">{strength.label}</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-white/40 transition-all"
                      style={{ width: `${strength.value}%` }}
                    />
                  </div>
                </div>
              </Field>

              <Field label="Confirm Password">
                <InputShell>
                  <span className="text-slate-400">
                    <IconLock />
                  </span>
                  <input
                    name="confirm"
                    type={showConfirm ? "text" : "password"}
                    value={form.confirm}
                    onChange={onChange}
                    placeholder="Re-enter password"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200 hover:bg-white/10"
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </button>
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
                      Creating...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </span>
              </button>

              <div className="text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link to="/login" className="text-slate-200 hover:text-white">
                  Login
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-xs text-slate-400">
                Note: Register will work after backend is running (Flask API).
              </div>
            </form>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Prototype UI • API-ready signup
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- helpers -------------------- */

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

function InfoCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur transition hover:translate-y-[-1px] hover:bg-white/[0.06]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-slate-400">{title}</div>
          <div className="mt-1 text-sm font-semibold text-slate-100">{value}</div>
        </div>
        <span className="text-slate-300">{icon}</span>
      </div>
    </div>
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

/* -------------------- tiny icons (no libs) -------------------- */

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

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 11h12v10H6V11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function IconUpload() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m7 8 5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 21h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l1.2 5.2L18 9l-4.8 1.8L12 16l-1.2-5.2L6 9l4.8-1.8L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconEye() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 15a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 3h7l3 3v15H7V3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M14 3v3h3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
