// // frontend/src/components/common/Navbar.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";

// /**
//  * Navbar
//  * - Fully responsive (desktop + mobile drawer)
//  * - Shows Login/Register when logged out
//  * - Shows Dashboard/Upload/Reports/Profile + Admin when logged in
//  * - Uses localStorage token + user { role }
//  *
//  * Paths used:
//  *  /            Home
//  *  /dashboard   Dashboard
//  *  /upload      UploadScan
//  *  /reports     Reports
//  *  /profile     Profile
//  *  /admin       AdminPanel
//  *  /login       Login
//  *  /register    Register
//  */

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const user = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user") || "null");
//     } catch {
//       return null;
//     }
//   }, [token]);

//   const isAuthed = Boolean(token);
//   const isAdmin = (user?.role || "").toLowerCase() === "admin";

//   useEffect(() => {
//     // close drawer on route change (simple approach)
//     const close = () => setOpen(false);
//     window.addEventListener("popstate", close);
//     return () => window.removeEventListener("popstate", close);
//   }, []);

//   function logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setOpen(false);
//     navigate("/login");
//   }

//   return (
//     <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
//       <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
//         {/* Brand */}
//         <Link to="/" className="flex items-center gap-3">
//           <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
//             <span className="text-sm font-semibold">AI</span>
//           </div>
//           <div className="leading-tight">
//             <div className="text-sm font-semibold tracking-tight">
//               DEMNET MRI
//             </div>
//             <div className="text-[11px] text-slate-400">
//               Cognitive Disorder Detection
//             </div>
//           </div>
//         </Link>

//         {/* Desktop nav */}
//         <nav className="hidden items-center gap-2 md:flex">
//           {isAuthed ? (
//             <>
//               <NavItem to="/dashboard" label="Dashboard" />
//               <NavItem to="/upload" label="Upload" />
//               <NavItem to="/reports" label="Reports" />
//               <NavItem to="/profile" label="Profile" />
//               {isAdmin && <NavItem to="/admin" label="Admin" />}

//               <button
//                 onClick={logout}
//                 className="ml-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <NavItem to="/login" label="Login" />
//               <Link
//                 to="/register"
//                 className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
//               >
//                 Register
//               </Link>
//             </>

//           )}
//         </nav>

//         {/* Mobile hamburger */}
//         <button
//           onClick={() => setOpen((s) => !s)}
//           className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
//           aria-label="Open menu"
//         >
//           <span className="text-lg">{open ? "✕" : "☰"}</span>
//         </button>
//       </div>

//       {/* Mobile drawer */}
//       <div
//         className={`md:hidden ${
//           open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
//         } overflow-hidden border-t border-white/10 bg-slate-950/90 backdrop-blur transition-all`}
//       >
//         <div className="mx-auto max-w-6xl px-4 py-3">
//           {isAuthed ? (
//             <>
//               <MobileNavItem to="/dashboard" label="Dashboard" setOpen={setOpen} />
//               <MobileNavItem to="/upload" label="Upload MRI" setOpen={setOpen} />
//               <MobileNavItem to="/reports" label="Reports" setOpen={setOpen} />
//               <MobileNavItem to="/profile" label="Profile" setOpen={setOpen} />
//               {isAdmin && (
//                 <MobileNavItem to="/admin" label="Admin Panel" setOpen={setOpen} />
//               )}

//               <button
//                 onClick={logout}
//                 className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-white/10"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <MobileNavItem to="/login" label="Login" setOpen={setOpen} />
//               <MobileNavItem to="/register" label="Register" setOpen={setOpen} />
//             </>
//           )}

//           {/* small footer note */}
//           <div className="mt-3 text-xs text-slate-500">
//             Secure • Fast • Explainable
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// /* -------------------- helpers -------------------- */

// function NavItem({ to, label }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         [
//           "rounded-xl px-4 py-2 text-sm transition",
//           isActive
//             ? "bg-white text-slate-950"
//             : "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
//         ].join(" ")
//       }
//     >
//       {label}
//     </NavLink>
//   );
// }

// function MobileNavItem({ to, label, setOpen }) {
//   return (
//     <NavLink
//       to={to}
//       onClick={() => setOpen(false)}
//       className={({ isActive }) =>
//         [
//           "block w-full rounded-xl px-4 py-3 text-sm transition",
//           isActive
//             ? "bg-white text-slate-950"
//             : "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
//         ].join(" ")
//       }
//     >
//       {label}
//     </NavLink>
//   );
// }


// // frontend/src/components/common/Navbar.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

// /**
//  * Navbar
//  * - Fully responsive (desktop + mobile drawer)
//  * - Shows Login/Register when logged out
//  * - Shows Dashboard/Upload/Reports/Profile + Admin when logged in
//  * - Adds Help Chat button in navbar (desktop + mobile)
//  * - Uses localStorage token + user { role }
//  */

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [chatOpen, setChatOpen] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const token = localStorage.getItem("token");

//   const user = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user") || "null");
//     } catch {
//       return null;
//     }
//   }, [token]);

//   const isAuthed = Boolean(token);
//   const isAdmin = (user?.role || "").toLowerCase() === "admin";

//   // Close mobile drawer on route change
//   useEffect(() => {
//     setOpen(false);
//   }, [location.pathname]);

//   function logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setOpen(false);
//     setChatOpen(false);
//     navigate("/login");
//   }

//   return (
//     <>
//       <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
//         <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
//           {/* Brand */}
//           <Link to="/" className="flex items-center gap-3">
//             <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
//               <span className="text-sm font-semibold">AI</span>
//             </div>
//             <div className="leading-tight">
//               <div className="text-sm font-semibold tracking-tight">
//                 DEMNET MRI
//               </div>
//               <div className="text-[11px] text-slate-400">
//                 Cognitive Disorder Detection
//               </div>
//             </div>
//           </Link>

//           {/* Desktop nav */}
//           <nav className="hidden items-center gap-2 md:flex">
//             {isAuthed ? (
//               <>
//                 <NavItem to="/dashboard" label="Dashboard" />
//                 <NavItem to="/upload" label="Upload" />
//                 <NavItem to="/reports" label="Reports" />
//                 <NavItem to="/profile" label="Profile" />
//                 {isAdmin && <NavItem to="/admin" label="Admin" />}

//                 {/* Help Chat */}
//                 <button
//                   onClick={() => setChatOpen(true)}
//                   className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Help Chat
//                 </button>

//                 <button
//                   onClick={logout}
//                   className="ml-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <NavItem to="/login" label="Login" />
//                 <Link
//                   to="/register"
//                   className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
//                 >
//                   Register
//                 </Link>

//                 {/* Help Chat for logged-out users too */}
//                 <button
//                   onClick={() => setChatOpen(true)}
//                   className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Help Chat
//                 </button>
//               </>
//             )}
//           </nav>

//           {/* Mobile hamburger */}
//           <button
//             onClick={() => setOpen((s) => !s)}
//             className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
//             aria-label="Open menu"
//           >
//             <span className="text-lg">{open ? "✕" : "☰"}</span>
//           </button>
//         </div>

//         {/* Mobile drawer */}
//         <div
//           className={`md:hidden ${
//             open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
//           } overflow-hidden border-t border-white/10 bg-slate-950/90 backdrop-blur transition-all`}
//         >
//           <div className="mx-auto max-w-6xl px-4 py-3">
//             {isAuthed ? (
//               <>
//                 <MobileNavItem to="/dashboard" label="Dashboard" setOpen={setOpen} />
//                 <MobileNavItem to="/upload" label="Upload MRI" setOpen={setOpen} />
//                 <MobileNavItem to="/reports" label="Reports" setOpen={setOpen} />
//                 <MobileNavItem to="/profile" label="Profile" setOpen={setOpen} />
//                 {isAdmin && (
//                   <MobileNavItem to="/admin" label="Admin Panel" setOpen={setOpen} />
//                 )}

//                 {/* Help Chat */}
//                 <button
//                   onClick={() => {
//                     setOpen(false);
//                     setChatOpen(true);
//                   }}
//                   className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Help Chat
//                 </button>

//                 <button
//                   onClick={logout}
//                   className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <MobileNavItem to="/login" label="Login" setOpen={setOpen} />
//                 <MobileNavItem to="/register" label="Register" setOpen={setOpen} />

//                 {/* Help Chat */}
//                 <button
//                   onClick={() => {
//                     setOpen(false);
//                     setChatOpen(true);
//                   }}
//                   className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Help Chat
//                 </button>
//               </>
//             )}

//             {/* small footer note */}
//             <div className="mt-3 text-xs text-slate-500">
//               Secure • Fast • Explainable
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Floating Help Chat */}
//       <HelpChat open={chatOpen} onClose={() => setChatOpen(false)} isAuthed={isAuthed} />
//     </>
//   );
// }

// /* -------------------- helpers -------------------- */

// function NavItem({ to, label }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         [
//           "rounded-xl px-4 py-2 text-sm transition",
//           isActive
//             ? "bg-white text-slate-950"
//             : "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
//         ].join(" ")
//       }
//     >
//       {label}
//     </NavLink>
//   );
// }

// function MobileNavItem({ to, label, setOpen }) {
//   return (
//     <NavLink
//       to={to}
//       onClick={() => setOpen(false)}
//       className={({ isActive }) =>
//         [
//           "block w-full rounded-xl px-4 py-3 text-sm transition",
//           isActive
//             ? "bg-white text-slate-950"
//             : "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
//         ].join(" ")
//       }
//     >
//       {label}
//     </NavLink>
//   );
// }

// /* -------------------- Help Chat (mock for now) -------------------- */

// function HelpChat({ open, onClose, isAuthed }) {
//   const [messages, setMessages] = useState([
//     {
//       from: "bot",
//       text: "Hi! I’m DEMNET Help. Ask anything about Upload, Reports, or your account.",
//     },
//   ]);
//   const [text, setText] = useState("");

//   useEffect(() => {
//     if (!open) return;
//     // reset input focus-like behavior
//     setText("");
//   }, [open]);

//   if (!open) return null;

//   function send() {
//     if (!text.trim()) return;

//     const userMsg = { from: "user", text: text.trim() };

//     // Mock reply (later connect to backend)
//     const botMsg = {
//       from: "bot",
//       text: isAuthed
//         ? "✅ Got it. (Mock reply) Next we’ll connect this to /api/chat."
//         : "✅ You can login/register first, then I can help with scans & reports.",
//     };

//     setMessages((m) => [...m, userMsg, botMsg]);
//     setText("");
//   }

//   return (
//     <div className="fixed bottom-6 right-6 z-[60] w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur">
//       <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
//         <div className="text-sm font-semibold text-white">Help Chat</div>
//         <button
//           onClick={onClose}
//           className="rounded-lg px-2 py-1 text-slate-300 hover:bg-white/10 hover:text-white"
//           aria-label="Close chat"
//         >
//           ✕
//         </button>
//       </div>

//       <div className="h-[280px] space-y-2 overflow-y-auto p-3">
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
//               m.from === "user"
//                 ? "ml-auto bg-white text-slate-950"
//                 : "bg-white/5 text-slate-100 border border-white/10"
//             }`}
//           >
//             {m.text}
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-2 border-t border-white/10 p-3">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") send();
//           }}
//           placeholder="Type your message…"
//           className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
//         />
//         <button
//           onClick={send}
//           className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// // frontend/src/components/common/Navbar.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

// /**
//  * Navbar
//  * - Fully responsive (desktop + mobile drawer)
//  * - Shows Login/Register when logged out
//  * - Shows Dashboard/Upload/Reports/Profile + Admin when logged in
//  * - Adds Help Chat button in navbar (desktop + mobile)
//  * - Uses localStorage token + user { role }
//  */

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [chatOpen, setChatOpen] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const token = localStorage.getItem("token");

//   const user = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user") || "null");
//     } catch {
//       return null;
//     }
//   }, [token]);

//   const isAuthed = Boolean(token);
//   const isAdmin = (user?.role || "").toLowerCase() === "admin";

//   // Close mobile drawer on route change
//   useEffect(() => {
//     setOpen(false);
//   }, [location.pathname]);

//   function logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setOpen(false);
//     setChatOpen(false);
//     navigate("/login");
//   }

//   return (
//     <>
//       <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
//         <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
//           {/* Brand */}
//           <Link to="/" className="flex items-center gap-3">
//             <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
//               <span className="text-sm font-semibold">AI</span>
//             </div>
//             <div className="leading-tight">
//               <div className="text-sm font-semibold tracking-tight">DEMNET MRI</div>
//               <div className="text-[11px] text-slate-400">
//                 Cognitive Disorder Detection
//               </div>
//             </div>
//           </Link>

//           {/* Desktop nav */}
//           <nav className="hidden items-center gap-2 md:flex">
//             {isAuthed ? (
//               <>
//                 <NavItem to="/dashboard" label="Dashboard" />
//                 <NavItem to="/upload" label="Upload" />
//                 <NavItem to="/reports" label="Reports" />
//                 <NavItem to="/profile" label="Profile" />
//                 {isAdmin && <NavItem to="/admin" label="Admin" />}

//                 {/* Help Chat */}
//                 <button
//                   onClick={() => setChatOpen(true)}
//                   className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Help Chat
//                 </button>

//                 <button
//                   onClick={logout}
//                   className="ml-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <NavItem to="/login" label="Login" />
//                 <Link
//                   to="/register"
//                   className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
//                 >
//                   Register
//                 </Link>

//                 {/* Help Chat for logged-out users too */}
//                 <button
//                   onClick={() => setChatOpen(true)}
//                   className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Help Chat
//                 </button>
//               </>
//             )}
//           </nav>

//           {/* Mobile hamburger */}
//           <button
//             onClick={() => setOpen((s) => !s)}
//             className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
//             aria-label="Open menu"
//           >
//             <span className="text-lg">{open ? "✕" : "☰"}</span>
//           </button>
//         </div>

//         {/* Mobile drawer */}
//         <div
//           className={`md:hidden ${
//             open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
//           } overflow-hidden border-t border-white/10 bg-slate-950/90 backdrop-blur transition-all`}
//         >
//           <div className="mx-auto max-w-6xl px-4 py-3">
//             {isAuthed ? (
//               <>
//                 <MobileNavItem to="/dashboard" label="Dashboard" setOpen={setOpen} />
//                 <MobileNavItem to="/upload" label="Upload MRI" setOpen={setOpen} />
//                 <MobileNavItem to="/reports" label="Reports" setOpen={setOpen} />
//                 <MobileNavItem to="/profile" label="Profile" setOpen={setOpen} />
//                 {isAdmin && (
//                   <MobileNavItem to="/admin" label="Admin Panel" setOpen={setOpen} />
//                 )}

//                 {/* Help Chat */}
//                 <button
//                   onClick={() => {
//                     setOpen(false);
//                     setChatOpen(true);
//                   }}
//                   className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Help Chat
//                 </button>

//                 <button
//                   onClick={logout}
//                   className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <MobileNavItem to="/login" label="Login" setOpen={setOpen} />
//                 <MobileNavItem to="/register" label="Register" setOpen={setOpen} />

//                 {/* Help Chat */}
//                 <button
//                   onClick={() => {
//                     setOpen(false);
//                     setChatOpen(true);
//                   }}
//                   className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Help Chat
//                 </button>
//               </>
//             )}

//             <div className="mt-3 text-xs text-slate-500">Secure • Fast • Explainable</div>
//           </div>
//         </div>
//       </header>

//       {/* Optional floating button (shows only when chat closed) */}
//       {!chatOpen && (
//         <button
//           onClick={() => setChatOpen(true)}
//           className="fixed bottom-6 right-6 z-[55] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10"
//         >
//           Help
//         </button>
//       )}

//       {/* Floating Help Chat */}
//       <HelpChat open={chatOpen} onClose={() => setChatOpen(false)} isAuthed={isAuthed} />
//     </>
//   );
// }

// /* -------------------- helpers -------------------- */

// function NavItem({ to, label }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         [
//           "rounded-xl px-4 py-2 text-sm transition",
//           isActive
//             ? "bg-white text-slate-950"
//             : "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
//         ].join(" ")
//       }
//     >
//       {label}
//     </NavLink>
//   );
// }

// function MobileNavItem({ to, label, setOpen }) {
//   return (
//     <NavLink
//       to={to}
//       onClick={() => setOpen(false)}
//       className={({ isActive }) =>
//         [
//           "block w-full rounded-xl px-4 py-3 text-sm transition",
//           isActive
//             ? "bg-white text-slate-950"
//             : "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
//         ].join(" ")
//       }
//     >
//       {label}
//     </NavLink>
//   );
// }

// /* -------------------- Help Chat (mock for now) -------------------- */

// function HelpChat({ open, onClose, isAuthed }) {
//   const initialMessages = useMemo(
//     () => [
//       {
//         from: "bot",
//         text: "Hi! I’m DEMNET Help. Ask anything about Upload, Reports, or your account.",
//       },
//     ],
//     []
//   );

//   const [messages, setMessages] = useState(initialMessages);
//   const [text, setText] = useState("");

//   // Reset chat when opened (fresh session)
//   useEffect(() => {
//     if (!open) return;
//     setText("");
//     setMessages(initialMessages);
//   }, [open, initialMessages]);

//   if (!open) return null;

//   function send() {
//     const msg = text.trim();
//     if (!msg) return;

//     const userMsg = { from: "user", text: msg };

//     const botMsg = {
//       from: "bot",
//       text: isAuthed
//         ? "✅ Got it. (Mock reply) Next we’ll connect this to backend /api/chat."
//         : "✅ Please login/register first. Then I can help with scans & reports.",
//     };

//     setMessages((m) => [...m, userMsg, botMsg]);
//     setText("");
//   }

//   return (
//     <div className="fixed bottom-6 right-6 z-[60] w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur">
//       <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
//         <div className="text-sm font-semibold text-white">Help Chat</div>
//         <button
//           onClick={onClose}
//           className="rounded-lg px-2 py-1 text-slate-300 hover:bg-white/10 hover:text-white"
//           aria-label="Close chat"
//         >
//           ✕
//         </button>
//       </div>

//       <div className="h-[280px] space-y-2 overflow-y-auto p-3">
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
//               m.from === "user"
//                 ? "ml-auto bg-white text-slate-950"
//                 : "border border-white/10 bg-white/5 text-slate-100"
//             }`}
//           >
//             {m.text}
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-2 border-t border-white/10 p-3">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") send();
//           }}
//           placeholder="Type your message…"
//           className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
//         />
//         <button
//           onClick={send}
//           className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }


// // frontend/src/components/common/Navbar.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

// /**
//  * Navbar
//  * - Responsive (desktop + mobile drawer)
//  * - Uses localStorage token + user { role }
//  * - Shows Admin only if role === "admin"
//  * - Adds Help Chat button (desktop + mobile)
//  */

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [chatOpen, setChatOpen] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const token = localStorage.getItem("token");

//   const user = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user") || "null");
//     } catch {
//       return null;
//     }
//   }, [token]);

//   const isAuthed = Boolean(token);
//   const isAdmin = (user?.role || "").toLowerCase() === "admin";

//   // Close mobile drawer when route changes
//   useEffect(() => {
//     setOpen(false);
//   }, [location.pathname]);

//   function logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setOpen(false);
//     setChatOpen(false);
//     navigate("/login");
//   }

//   return (
//     <>
//       <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
//         <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
//           {/* Brand */}
//           <Link to="/" className="flex items-center gap-3">
//             <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
//               <span className="text-sm font-semibold">AI</span>
//             </div>
//             <div className="leading-tight">
//               <div className="text-sm font-semibold tracking-tight">
//                 DEMNET MRI
//               </div>
//               <div className="text-[11px] text-slate-400">
//                 Cognitive Disorder Detection
//               </div>
//             </div>
//           </Link>

//           {/* Desktop nav */}
//           <nav className="hidden items-center gap-2 md:flex">
//             {isAuthed ? (
//               <>
//                 <NavItem to="/dashboard" label="Dashboard" />
//                 <NavItem to="/upload" label="Upload" />
//                 <NavItem to="/reports" label="Reports" />
//                 <NavItem to="/profile" label="Profile" />
//                 {isAdmin && <NavItem to="/admin" label="Admin" />}

//                 <button
//                   onClick={() => setChatOpen(true)}
//                   className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Help Chat
//                 </button>

//                 <button
//                   onClick={logout}
//                   className="ml-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <NavItem to="/login" label="Login" />
//                 <Link
//                   to="/register"
//                   className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
//                 >
//                   Register
//                 </Link>

//                 <button
//                   onClick={() => setChatOpen(true)}
//                   className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Help Chat
//                 </button>
//               </>
//             )}
//           </nav>

//           {/* Mobile hamburger */}
//           <button
//             onClick={() => setOpen((s) => !s)}
//             className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
//             aria-label="Open menu"
//           >
//             <span className="text-lg">{open ? "✕" : "☰"}</span>
//           </button>
//         </div>

//         {/* Mobile drawer */}
//         <div
//           className={`md:hidden ${
//             open ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
//           } overflow-hidden border-t border-white/10 bg-slate-950/90 backdrop-blur transition-all`}
//         >
//           <div className="mx-auto max-w-6xl px-4 py-3">
//             {isAuthed ? (
//               <>
//                 <MobileNavItem to="/dashboard" label="Dashboard" setOpen={setOpen} />
//                 <MobileNavItem to="/upload" label="Upload MRI" setOpen={setOpen} />
//                 <MobileNavItem to="/reports" label="Reports" setOpen={setOpen} />
//                 <MobileNavItem to="/profile" label="Profile" setOpen={setOpen} />
//                 {isAdmin && (
//                   <MobileNavItem to="/admin" label="Admin Panel" setOpen={setOpen} />
//                 )}

//                 <button
//                   onClick={() => {
//                     setOpen(false);
//                     setChatOpen(true);
//                   }}
//                   className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Help Chat
//                 </button>

//                 <button
//                   onClick={logout}
//                   className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <MobileNavItem to="/login" label="Login" setOpen={setOpen} />
//                 <MobileNavItem to="/register" label="Register" setOpen={setOpen} />

//                 <button
//                   onClick={() => {
//                     setOpen(false);
//                     setChatOpen(true);
//                   }}
//                   className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-white/10"
//                 >
//                   Help Chat
//                 </button>
//               </>
//             )}

//             <div className="mt-3 text-xs text-slate-500">
//               Secure • Fast • Explainable
//             </div>
//           </div>
//         </div>
//       </header>

//       <HelpChat open={chatOpen} onClose={() => setChatOpen(false)} isAuthed={isAuthed} />
//     </>
//   );
// }

// /* -------------------- helpers -------------------- */

// function NavItem({ to, label }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         [
//           "rounded-xl px-4 py-2 text-sm transition",
//           isActive
//             ? "bg-white text-slate-950"
//             : "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
//         ].join(" ")
//       }
//     >
//       {label}
//     </NavLink>
//   );
// }

// function MobileNavItem({ to, label, setOpen }) {
//   return (
//     <NavLink
//       to={to}
//       onClick={() => setOpen(false)}
//       className={({ isActive }) =>
//         [
//           "block w-full rounded-xl px-4 py-3 text-sm transition",
//           isActive
//             ? "bg-white text-slate-950"
//             : "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
//         ].join(" ")
//       }
//     >
//       {label}
//     </NavLink>
//   );
// }

// /* -------------------- Help Chat (mock for now) -------------------- */

// function HelpChat({ open, onClose, isAuthed }) {
//   const [messages, setMessages] = useState([
//     {
//       from: "bot",
//       text: "Hi! I’m DEMNET Help. Ask anything about Upload, Reports, or your account.",
//     },
//   ]);
//   const [text, setText] = useState("");

//   useEffect(() => {
//     if (!open) return;
//     setText("");
//   }, [open]);

//   if (!open) return null;

//   function send() {
//     if (!text.trim()) return;

//     const userMsg = { from: "user", text: text.trim() };

//     const botMsg = {
//       from: "bot",
//       text: isAuthed
//         ? "✅ Got it. (Mock reply) Next we’ll connect this to /api/chat."
//         : "✅ Please login/register first, then I can help with scans & reports.",
//     };

//     setMessages((m) => [...m, userMsg, botMsg]);
//     setText("");
//   }

//   return (
//     <div className="fixed bottom-6 right-6 z-[60] w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur">
//       <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
//         <div className="text-sm font-semibold text-white">Help Chat</div>
//         <button
//           onClick={onClose}
//           className="rounded-lg px-2 py-1 text-slate-300 hover:bg-white/10 hover:text-white"
//           aria-label="Close chat"
//         >
//           ✕
//         </button>
//       </div>

//       <div className="h-[280px] space-y-2 overflow-y-auto p-3">
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
//               m.from === "user"
//                 ? "ml-auto bg-white text-slate-950"
//                 : "border border-white/10 bg-white/5 text-slate-100"
//             }`}
//           >
//             {m.text}
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-2 border-t border-white/10 p-3">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && send()}
//           placeholder="Type your message…"
//           className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
//         />
//         <button
//           onClick={send}
//           className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
// // frontend/src/components/common/Navbar.jsx
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

// /**
//  * FINAL Navbar (Most professional, no duplicates)
//  * ✅ Admin link comes from ONE navItems array -> cannot double show
//  * ✅ Clean SaaS layout: Brand | Nav | Right actions
//  * ✅ Mobile drawer: overlay + slide + outside click + ESC close
//  * ✅ Subtle animations: underline, hover glow, smooth transitions
//  */

// export default function Navbar() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const token = localStorage.getItem("token");
//   const user = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user") || "null");
//     } catch {
//       return null;
//     }
//   }, [token]);

//   const isAuthed = Boolean(token);
//   const isAdmin = (user?.role || "").toLowerCase() === "admin";

//   // ✅ ONE SOURCE OF TRUTH (prevents double admin)
//   const navItems = useMemo(() => {
//     if (!isAuthed) return [];
//     const base = [
//       { to: "/dashboard", label: "Dashboard" },
//       { to: "/upload", label: "Upload" },
//       { to: "/reports", label: "Reports" },
//     ];
//     if (isAdmin) base.push({ to: "/admin", label: "Admin" });
//     return base;
//   }, [isAuthed, isAdmin]);

//   const initials = useMemo(() => {
//     const name = user?.name || "User";
//     const parts = String(name).trim().split(/\s+/);
//     const a = parts[0]?.[0] || "U";
//     const b = parts[1]?.[0] || "";
//     return (a + b).toUpperCase();
//   }, [user?.name]);

//   // Close drawer on route change
//   useEffect(() => {
//     setDrawerOpen(false);
//     setProfileOpen(false);
//   }, [location.pathname]);

//   // Close profile dropdown on outside click
//   const profileRef = useRef(null);
//   useEffect(() => {
//     const onDown = (e) => {
//       if (!profileRef.current) return;
//       if (!profileRef.current.contains(e.target)) setProfileOpen(false);
//     };
//     document.addEventListener("mousedown", onDown);
//     return () => document.removeEventListener("mousedown", onDown);
//   }, []);

//   // ESC closes drawer/profile
//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") {
//         setDrawerOpen(false);
//         setProfileOpen(false);
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   // Body lock for mobile drawer
//   useEffect(() => {
//     if (!drawerOpen) return;
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = prev;
//     };
//   }, [drawerOpen]);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setDrawerOpen(false);
//     setProfileOpen(false);
//     navigate("/login");
//   };

//   return (
//     <>
//       <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
//         {/* subtle top highlight */}
//         <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

//         <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
//           {/* Brand */}
//           <Link to="/" className="group flex items-center gap-3">
//             <div className="relative grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] shadow-[0_24px_90px_rgba(0,0,0,.6)]">
//               <span className="relative z-[1] text-sm font-semibold text-white">
//                 AI
//               </span>
//               <span className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-indigo-500/25 via-transparent to-cyan-400/20 opacity-0 transition group-hover:opacity-100" />
//             </div>
//             <div className="leading-tight">
//               <div className="text-sm font-semibold tracking-tight text-white">
//                 DEMNET MRI
//               </div>
//               <div className="text-[11px] text-slate-400">
//                 Cognitive Disorder Detection
//               </div>
//             </div>
//           </Link>

//           {/* Desktop center nav */}
//           <nav className="hidden items-center gap-1 md:flex">
//             {isAuthed ? (
//               navItems.map((it) => (
//                 <TopLink key={it.to} to={it.to}>
//                   {it.label}
//                 </TopLink>
//               ))
//             ) : (
//               <>
//                 <TopLink to="/login">Login</TopLink>
//                 <Link
//                   to="/register"
//                   className="ml-1 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 active:scale-[0.99]"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </nav>

//           {/* Right actions */}
//           <div className="hidden items-center gap-2 md:flex">
//             <button
//               className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-100 transition hover:bg-white/[0.08] hover:text-white active:scale-[0.99]"
//               onClick={() => window.dispatchEvent(new CustomEvent("open-help-chat"))}
//               title="Help"
//             >
//               Help
//             </button>

//             {isAuthed ? (
//               <div className="relative" ref={profileRef}>
//                 <button
//                   onClick={() => setProfileOpen((s) => !s)}
//                   className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-100 transition hover:bg-white/[0.08] hover:text-white active:scale-[0.99]"
//                   aria-label="Open profile menu"
//                 >
//                   <span className="grid h-8 w-8 place-items-center rounded-2xl bg-white/10 text-xs font-bold text-white">
//                     {initials}
//                   </span>
//                   <span className="hidden lg:block">
//                     {user?.name ? String(user.name).split(" ")[0] : "Account"}
//                   </span>
//                   <ChevronDown />
//                 </button>

//                 {profileOpen ? (
//                   <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-[0_30px_120px_rgba(0,0,0,.7)] backdrop-blur-xl animate-pop">
//                     <div className="px-4 py-3 border-b border-white/10">
//                       <div className="text-sm font-semibold text-white truncate">
//                         {user?.name || "User"}
//                       </div>
//                       <div className="text-[11px] text-slate-400 truncate">
//                         {user?.email || ""}
//                       </div>
//                     </div>

//                     <MenuLink to="/profile" onClick={() => setProfileOpen(false)}>
//                       Profile
//                     </MenuLink>

//                     {/* ✅ Admin appears only if isAdmin AND only from one place (no duplicates) */}
//                     {isAdmin ? (
//                       <MenuLink to="/admin" onClick={() => setProfileOpen(false)}>
//                         Admin Panel
//                       </MenuLink>
//                     ) : null}

//                     <button
//                       onClick={logout}
//                       className="w-full text-left px-4 py-3 text-sm text-slate-200 hover:bg-white/[0.06] transition"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 ) : null}
//               </div>
//             ) : null}
//           </div>

//           {/* Mobile hamburger */}
//           <button
//             onClick={() => setDrawerOpen(true)}
//             className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/[0.08] active:scale-[0.99] md:hidden"
//             aria-label="Open menu"
//           >
//             <IconMenu />
//           </button>
//         </div>
//       </header>

//       {/* Mobile Drawer */}
//       <MobileDrawer
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         isAuthed={isAuthed}
//         isAdmin={isAdmin}
//         navItems={navItems}
//         user={user}
//         initials={initials}
//         onLogout={logout}
//       />

//       {/* Help Chat (opens via event so you can reuse anywhere) */}
//       <HelpChatLauncher isAuthed={isAuthed} />
//       <style>{styles}</style>
//     </>
//   );
// }

// /* -------------------- Desktop nav link (premium underline) -------------------- */

// function TopLink({ to, children }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         [
//           "navlink relative rounded-2xl px-4 py-2 text-sm transition",
//           isActive
//             ? "text-white bg-white/[0.06]"
//             : "text-slate-200 hover:text-white hover:bg-white/[0.04]",
//         ].join(" ")
//       }
//     >
//       {children}
//       <span className="nav-underline absolute left-4 right-4 bottom-1.5 h-[2px] rounded-full" />
//     </NavLink>
//   );
// }

// /* -------------------- Dropdown link -------------------- */

// function MenuLink({ to, children, onClick }) {
//   return (
//     <Link
//       to={to}
//       onClick={onClick}
//       className="block px-4 py-3 text-sm text-slate-200 hover:bg-white/[0.06] transition"
//     >
//       {children}
//     </Link>
//   );
// }

// /* -------------------- Mobile Drawer -------------------- */

// function MobileDrawer({
//   open,
//   onClose,
//   isAuthed,
//   isAdmin,
//   navItems,
//   user,
//   initials,
//   onLogout,
// }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-[60] md:hidden">
//       {/* overlay */}
//       <button
//         onClick={onClose}
//         className="absolute inset-0 bg-black/60"
//         aria-label="Close menu"
//       />

//       {/* panel */}
//       <div className="animate-drawer absolute right-0 top-0 h-full w-[86%] max-w-[360px] overflow-hidden border-l border-white/10 bg-slate-950/88 backdrop-blur-xl shadow-[0_40px_140px_rgba(0,0,0,.75)]">
//         <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
//           <div className="text-sm font-semibold text-white">Menu</div>
//           <button
//             onClick={onClose}
//             className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-100 hover:bg-white/[0.08]"
//             aria-label="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {/* user header */}
//         {isAuthed ? (
//           <div className="px-4 py-4 border-b border-white/10">
//             <div className="flex items-center gap-3">
//               <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-xs font-bold text-white">
//                 {initials}
//               </div>
//               <div className="min-w-0">
//                 <div className="text-sm font-semibold text-white truncate">
//                   {user?.name || "User"}
//                 </div>
//                 <div className="text-[11px] text-slate-400 truncate">
//                   {(user?.role || "user").toUpperCase()}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : null}

//         <div className="p-4 space-y-2">
//           {isAuthed ? (
//             <>
//               {/* ✅ Uses SAME navItems -> no duplicate admin */}
//               {navItems.map((it) => (
//                 <MobileLink key={it.to} to={it.to} onClick={onClose}>
//                   {it.label}
//                 </MobileLink>
//               ))}

//               <MobileLink to="/profile" onClick={onClose}>
//                 Profile
//               </MobileLink>

//               {/* help */}
//               <button
//                 onClick={() => {
//                   onClose();
//                   window.dispatchEvent(new CustomEvent("open-help-chat"));
//                 }}
//                 className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-white/[0.08] active:scale-[0.99]"
//               >
//                 Help
//               </button>

//               <button
//                 onClick={onLogout}
//                 className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-white/[0.08] active:scale-[0.99]"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <MobileLink to="/login" onClick={onClose}>
//                 Login
//               </MobileLink>
//               <MobileLink to="/register" onClick={onClose}>
//                 Register
//               </MobileLink>

//               <button
//                 onClick={() => {
//                   onClose();
//                   window.dispatchEvent(new CustomEvent("open-help-chat"));
//                 }}
//                 className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-white/[0.08] active:scale-[0.99]"
//               >
//                 Help
//               </button>
//             </>
//           )}

//           <div className="pt-3 text-xs text-slate-500">
//             Secure • Fast • Explainable
//           </div>

//           {/* Admin note only if admin (NOT a link, just info) */}
//           {isAdmin ? (
//             <div className="text-xs text-slate-500">
//               Admin access enabled
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// }

// function MobileLink({ to, children, onClick }) {
//   return (
//     <NavLink
//       to={to}
//       onClick={onClick}
//       className={({ isActive }) =>
//         [
//           "block w-full rounded-2xl px-4 py-3 text-sm transition",
//           isActive
//             ? "bg-white text-slate-950"
//             : "border border-white/10 bg-white/[0.05] text-slate-100 hover:bg-white/[0.08] hover:text-white",
//         ].join(" ")
//       }
//     >
//       {children}
//     </NavLink>
//   );
// }

// /* -------------------- HelpChat (kept minimal + loved) -------------------- */

// function HelpChatLauncher({ isAuthed }) {
//   const [open, setOpen] = useState(false);
//   useEffect(() => {
//     const handler = () => setOpen(true);
//     window.addEventListener("open-help-chat", handler);
//     return () => window.removeEventListener("open-help-chat", handler);
//   }, []);

//   return <HelpChat open={open} onClose={() => setOpen(false)} isAuthed={isAuthed} />;
// }

// function HelpChat({ open, onClose, isAuthed }) {
//   const [minimized, setMinimized] = useState(false);
//   const [unread, setUnread] = useState(0);

//   const [messages, setMessages] = useState(() => [
//     { id: uid(), from: "bot", text: "Hi! Ask about Upload, Reports, or Login.", at: Date.now() },
//   ]);

//   const [text, setText] = useState("");
//   const [typing, setTyping] = useState(false);

//   const listRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (!open) return;
//     const t = setTimeout(() => inputRef.current?.focus(), 140);
//     return () => clearTimeout(t);
//   }, [open, minimized]);

//   useEffect(() => {
//     if (!open || minimized) return;
//     listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
//     setUnread(0);
//   }, [open, minimized, messages.length, typing]);

//   useEffect(() => {
//     if (!open) {
//       setMinimized(false);
//       setUnread(0);
//     }
//   }, [open]);

//   if (!open) return null;

//   const send = async (override) => {
//     const content = (override ?? text).trim();
//     if (!content || typing) return;

//     setMessages((m) => [...m, { id: uid(), from: "user", text: content, at: Date.now() }]);
//     setText("");
//     setTyping(true);

//     await sleep(480);

//     const reply = isAuthed
//       ? smartMockReply(content)
//       : "Please login/register first so I can help with scans & reports.";

//     setMessages((m) => [...m, { id: uid(), from: "bot", text: reply, at: Date.now() }]);
//     setTyping(false);

//     if (minimized) setUnread((u) => u + 1);
//   };

//   const onKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       send();
//     }
//   };

//   if (minimized) {
//     return (
//       <button
//         onClick={() => setMinimized(false)}
//         className="chat-pulse fixed bottom-6 right-6 z-[70] grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-slate-950/80 text-white shadow-[0_25px_90px_rgba(0,0,0,.55)] backdrop-blur-xl transition hover:bg-slate-950/95 active:scale-[0.99]"
//         aria-label="Open help chat"
//       >
//         <IconChat />
//         {unread ? (
//           <span className="absolute -top-2 -right-2 grid h-6 min-w-[24px] place-items-center rounded-full bg-emerald-400 px-2 text-xs font-bold text-slate-950">
//             {unread > 9 ? "9+" : unread}
//           </span>
//         ) : null}
//       </button>
//     );
//   }

//   return (
//     <div className="animate-chat fixed bottom-6 right-6 z-[70] w-[360px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/85 shadow-[0_30px_120px_rgba(0,0,0,.6)] backdrop-blur-xl">
//       {/* header */}
//       <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
//         <div className="min-w-0">
//           <div className="flex items-center gap-2">
//             <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,.12)]" />
//             <div className="truncate text-sm font-semibold text-white">Help</div>
//           </div>
//           <div className="mt-0.5 text-[11px] text-slate-400">
//             Quick answers • Demo mode
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setMinimized(true)}
//             className="grid h-8 w-8 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-100 transition hover:bg-white/[0.08]"
//             aria-label="Minimize"
//             title="Minimize"
//           >
//             <IconMinus />
//           </button>
//           <button
//             onClick={onClose}
//             className="grid h-8 w-8 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-100 transition hover:bg-white/[0.08]"
//             aria-label="Close chat"
//             title="Close"
//           >
//             ✕
//           </button>
//         </div>
//       </div>

//       {/* quick chips */}
//       <div className="border-b border-white/10 px-3 py-3">
//         <div className="flex flex-wrap gap-2">
//           <Chip onClick={() => send("How to upload MRI scan?")}>Upload</Chip>
//           <Chip onClick={() => send("How to download report PDF?")}>Report PDF</Chip>
//           <Chip onClick={() => send("Login not working")}>Login</Chip>
//         </div>
//       </div>

//       {/* messages */}
//       <div ref={listRef} className="chat-scroll h-[300px] space-y-2 overflow-y-auto p-3">
//         {messages.map((m) => (
//           <div key={m.id} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
//             <div
//               className={[
//                 "chat-bubble max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
//                 m.from === "user"
//                   ? "bg-white text-slate-950 shadow-[0_10px_40px_rgba(255,255,255,.08)]"
//                   : "border border-white/10 bg-white/[0.04] text-slate-100",
//               ].join(" ")}
//             >
//               <div className="whitespace-pre-wrap break-words">{m.text}</div>
//               <div className={m.from === "user" ? "mt-1 text-[10px] text-slate-600" : "mt-1 text-[10px] text-slate-500"}>
//                 {formatTime(m.at)}
//               </div>
//             </div>
//           </div>
//         ))}

//         {typing ? (
//           <div className="chat-bubble w-fit max-w-[85%] rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-200">
//             <TypingDots />
//           </div>
//         ) : null}
//       </div>

//       {/* input */}
//       <div className="border-t border-white/10 p-3">
//         <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-black/25 px-3 py-2 focus-within:border-white/20 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,.16)]">
//           <textarea
//             ref={inputRef}
//             value={text}
//             onChange={(e) => setText(e.target.value.slice(0, 500))}
//             onKeyDown={onKeyDown}
//             rows={1}
//             placeholder="Type a message…"
//             className="max-h-24 min-h-[38px] flex-1 resize-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
//           />
//           <button
//             onClick={() => send()}
//             disabled={!text.trim() || typing}
//             className={[
//               "rounded-2xl px-3 py-2 text-sm font-semibold transition",
//               text.trim() && !typing
//                 ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300 active:scale-[0.99]"
//                 : "cursor-not-allowed bg-emerald-400/20 text-emerald-100/60",
//             ].join(" ")}
//           >
//             Send
//           </button>
//         </div>

//         <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
//           <span>Enter to send • Shift+Enter new line</span>
//           <span className="text-slate-600">{text.length}/500</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Chip({ children, onClick }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.08] hover:text-white active:scale-[0.99]"
//     >
//       {children}
//     </button>
//   );
// }

// function TypingDots() {
//   return (
//     <div className="flex items-center gap-1">
//       <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.2s]" />
//       <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.1s]" />
//       <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300" />
//       <span className="ml-2 text-xs text-slate-400">Typing…</span>
//     </div>
//   );
// }

// /* -------------------- helpers -------------------- */

// function smartMockReply(text) {
//   const t = String(text).toLowerCase();
//   if (t.includes("upload"))
//     return "Go to Upload → choose MRI image (PNG/JPG) → run analysis. If it fails, check file type/size.";
//   if (t.includes("pdf") || t.includes("report"))
//     return "Open Reports → select a report → click Download PDF. If blocked, allow popups.";
//   if (t.includes("login"))
//     return "Check credentials, token expiry, and backend URL. For admin, ensure ENV admin credentials match.";
//   return "Got it ✅ (mock reply). Next we’ll connect this to /api/chat.";
// }

// function formatTime(ts) {
//   try {
//     const d = new Date(ts);
//     return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   } catch {
//     return "";
//   }
// }

// function sleep(ms) {
//   return new Promise((r) => setTimeout(r, ms));
// }

// function uid() {
//   if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
//   return String(Date.now()) + Math.random().toString(16).slice(2);
// }

// /* -------------------- icons -------------------- */

// function IconMenu() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//       <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//       <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//       <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//     </svg>
//   );
// }

// function IconChat() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//       <path
//         d="M20 12c0 4-4 7-8 7-1.1 0-2.2-.2-3.2-.6L4 20l1.2-3.6A7.2 7.2 0 0 1 4 12c0-4 4-7 8-7s8 3 8 7Z"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function IconMinus() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//       <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//     </svg>
//   );
// }

// function ChevronDown() {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//       <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//     </svg>
//   );
// }

// /* -------------------- CSS (kept professional) -------------------- */

// const styles = `
// @keyframes drawerSlide {
//   from { transform: translateX(110%); opacity: .6; }
//   to { transform: translateX(0); opacity: 1; }
// }
// .animate-drawer { animation: drawerSlide .26s cubic-bezier(.4,0,.2,1); }

// @keyframes pop {
//   from { transform: translateY(6px) scale(.98); opacity: 0; }
//   to { transform: translateY(0) scale(1); opacity: 1; }
// }
// .animate-pop { animation: pop .15s ease-out; }

// .navlink .nav-underline {
//   background: linear-gradient(90deg, rgba(99,102,241,.92), rgba(34,211,238,.9));
//   transform: scaleX(0);
//   transform-origin: left;
//   transition: transform .22s ease;
//   opacity: .92;
// }
// .navlink:hover .nav-underline { transform: scaleX(1); }
// .navlink[aria-current="page"] .nav-underline { transform: scaleX(1); }

// @keyframes chatOpen {
//   from { opacity: 0; transform: translateY(12px) scale(.96); }
//   to { opacity: 1; transform: translateY(0) scale(1); }
// }
// .animate-chat { animation: chatOpen .18s ease-out; }

// @keyframes bubbleIn {
//   from { opacity: 0; transform: translateY(6px) scale(.985); }
//   to { opacity: 1; transform: translateY(0) scale(1); }
// }
// .chat-bubble { animation: bubbleIn .16s ease-out; }

// @keyframes pulseSoft {
//   0% { box-shadow: 0 0 0 0 rgba(16,185,129,.30); }
//   70% { box-shadow: 0 0 0 14px rgba(16,185,129,0); }
//   100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
// }
// .chat-pulse { animation: pulseSoft 2.2s infinite; }

// .chat-scroll::-webkit-scrollbar { width: 10px; }
// .chat-scroll::-webkit-scrollbar-thumb {
//   background: rgba(255,255,255,.10);
//   border-radius: 999px;
//   border: 3px solid rgba(0,0,0,0);
//   background-clip: padding-box;
// }
// .chat-scroll::-webkit-scrollbar-track { background: transparent; }
// `;

// frontend/src/components/common/Navbar.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

/**
 * FINAL Navbar (Admin page cleaned)
 * ✅ On /admin: Hides Dashboard/Upload/Reports from top nav + drawer
 * ✅ On user pages: Shows Dashboard/Upload/Reports (+ Admin if role=admin)
 * ✅ No duplicate Admin links
 * ✅ Drawer + dropdown + ESC close + outside click
 * ✅ Help Chat still works everywhere (including /admin)
 */

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, [token]);

  const isAuthed = Boolean(token);
  const isAdmin = (user?.role || "").toLowerCase() === "admin";

  // ✅ detect admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  // ✅ ONE SOURCE OF TRUTH for nav
  // If /admin => hide Dashboard/Upload/Reports
  const navItems = useMemo(() => {
    if (!isAuthed) return [];

    // user-side nav only
    const userNav = [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/upload", label: "Upload" },
      { to: "/reports", label: "Reports" },
    ];

    // on admin route, remove user nav from navbar
    if (isAdminRoute) {
      return isAdmin ? [{ to: "/admin", label: "Admin" }] : [];
    }

    // normal routes
    const base = [...userNav];
    if (isAdmin) base.push({ to: "/admin", label: "Admin" });
    return base;
  }, [isAuthed, isAdmin, isAdminRoute]);

  const initials = useMemo(() => {
    const name = user?.name || "User";
    const parts = String(name).trim().split(/\s+/);
    const a = parts[0]?.[0] || "U";
    const b = parts[1]?.[0] || "";
    return (a + b).toUpperCase();
  }, [user?.name]);

  // close drawer/profile on route change
  useEffect(() => {
    setDrawerOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // outside click closes dropdown
  const profileRef = useRef(null);
  useEffect(() => {
    const onDown = (e) => {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // ESC closes drawer/profile/chat
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // body lock on drawer
  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [drawerOpen]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setDrawerOpen(false);
    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* Brand */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] shadow-[0_24px_90px_rgba(0,0,0,.6)]">
              <span className="relative z-[1] text-sm font-semibold text-white">
                AI
              </span>
              <span className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-indigo-500/25 via-transparent to-cyan-400/20 opacity-0 transition group-hover:opacity-100" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-white">
                DEMNET MRI
              </div>
              <div className="text-[11px] text-slate-400">
                Cognitive Disorder Detection
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {isAuthed ? (
              navItems.map((it) => (
                <TopLink key={it.to} to={it.to}>
                  {it.label}
                </TopLink>
              ))
            ) : (
              <>
                <TopLink to="/login">Login</TopLink>
                <Link
                  to="/register"
                  className="ml-1 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 active:scale-[0.99]"
                >
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Right actions */}
          <div className="hidden items-center gap-2 md:flex">
            <button
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-100 transition hover:bg-white/[0.08] hover:text-white active:scale-[0.99]"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-help-chat"))
              }
              title="Help"
            >
              Help
            </button>

            {isAuthed ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-100 transition hover:bg-white/[0.08] hover:text-white active:scale-[0.99]"
                  aria-label="Open profile menu"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-2xl bg-white/10 text-xs font-bold text-white">
                    {initials}
                  </span>
                  <span className="hidden lg:block">
                    {user?.name ? String(user.name).split(" ")[0] : "Account"}
                  </span>
                  <ChevronDown />
                </button>

                {profileOpen ? (
                  <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-[0_30px_120px_rgba(0,0,0,.7)] backdrop-blur-xl animate-pop">
                    <div className="px-4 py-3 border-b border-white/10">
                      <div className="text-sm font-semibold text-white truncate">
                        {user?.name || "User"}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {user?.email || ""}
                      </div>
                    </div>

                    <MenuLink
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </MenuLink>

                    {/* ✅ Admin appears ONLY here in dropdown (desktop) */}
                    {isAdmin ? (
                      <MenuLink
                        to="/admin"
                        onClick={() => setProfileOpen(false)}
                      >
                        Admin Panel
                      </MenuLink>
                    ) : null}

                    {/* <button
                      onClick={logout}
                      className="w-full text-left px-4 py-3 text-sm text-slate-200 hover:bg-white/[0.06] transition"
                    >
                      Logout
                    </button> */}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/[0.08] active:scale-[0.99] md:hidden"
            aria-label="Open menu"
          >
            <IconMenu />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        isAuthed={isAuthed}
        isAdmin={isAdmin}
        navItems={navItems}
        user={user}
        initials={initials}
        onLogout={logout}
      />

      {/* Help chat (event-based) */}
      <HelpChatLauncher isAuthed={isAuthed} />

      <style>{styles}</style>
    </>
  );
}

/* -------------------- Desktop NavLink -------------------- */
function TopLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "navlink relative rounded-2xl px-4 py-2 text-sm transition",
          isActive
            ? "text-white bg-white/[0.06]"
            : "text-slate-200 hover:text-white hover:bg-white/[0.04]",
        ].join(" ")
      }
    >
      {children}
      <span className="nav-underline absolute left-4 right-4 bottom-1.5 h-[2px] rounded-full" />
    </NavLink>
  );
}

function MenuLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-3 text-sm text-slate-200 hover:bg-white/[0.06] transition"
    >
      {children}
    </Link>
  );
}

/* -------------------- Mobile Drawer -------------------- */
function MobileDrawer({ open, onClose, isAuthed, navItems, user, initials, onLogout }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
        aria-label="Close menu"
      />

      <div className="animate-drawer absolute right-0 top-0 h-full w-[86%] max-w-[360px] overflow-hidden border-l border-white/10 bg-slate-950/88 backdrop-blur-xl shadow-[0_40px_140px_rgba(0,0,0,.75)]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <div className="text-sm font-semibold text-white">Menu</div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-100 hover:bg-white/[0.08]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {isAuthed ? (
          <div className="px-4 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-xs font-bold text-white">
                {initials}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white truncate">
                  {user?.name || "User"}
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  {(user?.role || "user").toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="p-4 space-y-2">
          {isAuthed ? (
            <>
              {/* ✅ uses SAME navItems (and on /admin it will contain only Admin) */}
              {navItems.map((it) => (
                <MobileLink key={it.to} to={it.to} onClick={onClose}>
                  {it.label}
                </MobileLink>
              ))}

              <MobileLink to="/profile" onClick={onClose}>
                Profile
              </MobileLink>

              <button
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent("open-help-chat"));
                }}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-white/[0.08] active:scale-[0.99]"
              >
                Help
              </button>

              <button
                onClick={onLogout}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-white/[0.08] active:scale-[0.99]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <MobileLink to="/login" onClick={onClose}>
                Login
              </MobileLink>
              <MobileLink to="/register" onClick={onClose}>
                Register
              </MobileLink>

              <button
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent("open-help-chat"));
                }}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-white/[0.08] active:scale-[0.99]"
              >
                Help
              </button>
            </>
          )}

          <div className="pt-3 text-xs text-slate-500">
            Secure • Fast • Explainable
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileLink({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "block w-full rounded-2xl px-4 py-3 text-sm transition",
          isActive
            ? "bg-white text-slate-950"
            : "border border-white/10 bg-white/[0.05] text-slate-100 hover:bg-white/[0.08] hover:text-white",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

// /* -------------------- Help Chat (event-based) -------------------- */
// function HelpChatLauncher({ isAuthed }) {
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const handler = () => setOpen(true);
//     window.addEventListener("open-help-chat", handler);
//     return () => window.removeEventListener("open-help-chat", handler);
//   }, []);

//   return (
//     <div
//       className={[
//         "fixed bottom-6 right-6 z-[70] w-[360px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/85 shadow-[0_30px_120px_rgba(0,0,0,.6)] backdrop-blur-xl",
//         open ? "animate-chat" : "hidden",
//       ].join(" ")}
//     >
//       <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
//         <div className="text-sm font-semibold text-white">Help</div>
//         <button
//           onClick={() => setOpen(false)}
//           className="rounded-xl px-2 py-1 hover:bg-white/10 text-slate-200"
//         >
//           ✕
//         </button>
//       </div>
//       <div className="p-4 text-sm text-slate-300">
//         {isAuthed
//           ? "Demo help chat. Connect to /api/chat later."
//           : "Please login/register first."}
//       </div>
//     </div>
//   );
// }

// /* -------------------- Icons -------------------- */
// function IconMenu() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//       <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//       <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//       <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//     </svg>
//   );
// }

// function ChevronDown() {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//       <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//     </svg>
//   );
// }

// /* -------------------- CSS -------------------- */
// const styles = `
// @keyframes drawerSlide {
//   from { transform: translateX(110%); opacity: .6; }
//   to { transform: translateX(0); opacity: 1; }
// }
// .animate-drawer { animation: drawerSlide .26s cubic-bezier(.4,0,.2,1); }

// @keyframes pop {
//   from { transform: translateY(6px) scale(.98); opacity: 0; }
//   to { transform: translateY(0) scale(1); opacity: 1; }
// }
// .animate-pop { animation: pop .15s ease-out; }

// .navlink .nav-underline {
//   background: linear-gradient(90deg, rgba(99,102,241,.92), rgba(34,211,238,.9));
//   transform: scaleX(0);
//   transform-origin: left;
//   transition: transform .22s ease;
//   opacity: .92;
// }
// .navlink:hover .nav-underline { transform: scaleX(1); }
// .navlink[aria-current="page"] .nav-underline { transform: scaleX(1); }

// @keyframes chatOpen {
//   from { opacity: 0; transform: translateY(12px) scale(.96); }
//   to { opacity: 1; transform: translateY(0) scale(1); }
// }
// .animate-chat { animation: chatOpen .18s ease-out; }
// `;


/* -------------------- HelpChat (kept minimal + loved) -------------------- */

function HelpChatLauncher({ isAuthed }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-help-chat", handler);
    return () => window.removeEventListener("open-help-chat", handler);
  }, []);

  return <HelpChat open={open} onClose={() => setOpen(false)} isAuthed={isAuthed} />;
}

function HelpChat({ open, onClose, isAuthed }) {
  const [minimized, setMinimized] = useState(false);
  const [unread, setUnread] = useState(0);

  const [messages, setMessages] = useState(() => [
    { id: uid(), from: "bot", text: "Hi! Ask about Upload, Reports, or Login.", at: Date.now() },
  ]);

  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);

  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 140);
    return () => clearTimeout(t);
  }, [open, minimized]);

  useEffect(() => {
    if (!open || minimized) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    setUnread(0);
  }, [open, minimized, messages.length, typing]);

  useEffect(() => {
    if (!open) {
      setMinimized(false);
      setUnread(0);
    }
  }, [open]);

  if (!open) return null;

  const send = async (override) => {
    const content = (override ?? text).trim();
    if (!content || typing) return;

    setMessages((m) => [...m, { id: uid(), from: "user", text: content, at: Date.now() }]);
    setText("");
    setTyping(true);

    await sleep(480);

    const reply = isAuthed
      ? smartMockReply(content)
      : "Please login/register first so I can help with scans & reports.";

    setMessages((m) => [...m, { id: uid(), from: "bot", text: reply, at: Date.now() }]);
    setTyping(false);

    if (minimized) setUnread((u) => u + 1);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="chat-pulse fixed bottom-6 right-6 z-[70] grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-slate-950/80 text-white shadow-[0_25px_90px_rgba(0,0,0,.55)] backdrop-blur-xl transition hover:bg-slate-950/95 active:scale-[0.99]"
        aria-label="Open help chat"
      >
        <IconChat />
        {unread ? (
          <span className="absolute -top-2 -right-2 grid h-6 min-w-[24px] place-items-center rounded-full bg-emerald-400 px-2 text-xs font-bold text-slate-950">
            {unread > 9 ? "9+" : unread}
          </span>
        ) : null}
      </button>
    );
  }

  return (
    <div className="animate-chat fixed bottom-6 right-6 z-[70] w-[360px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/85 shadow-[0_30px_120px_rgba(0,0,0,.6)] backdrop-blur-xl">
      {/* header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,.12)]" />
            <div className="truncate text-sm font-semibold text-white">Help</div>
          </div>
          <div className="mt-0.5 text-[11px] text-slate-400">
            Quick answers • Demo mode
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMinimized(true)}
            className="grid h-8 w-8 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-100 transition hover:bg-white/[0.08]"
            aria-label="Minimize"
            title="Minimize"
          >
            <IconMinus />
          </button>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-100 transition hover:bg-white/[0.08]"
            aria-label="Close chat"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* quick chips */}
      <div className="border-b border-white/10 px-3 py-3">
        <div className="flex flex-wrap gap-2">
          <Chip onClick={() => send("How to upload MRI scan?")}>Upload</Chip>
          <Chip onClick={() => send("How to download report PDF?")}>Report PDF</Chip>
          <Chip onClick={() => send("Login not working")}>Login</Chip>
        </div>
      </div>

      {/* messages */}
      <div ref={listRef} className="chat-scroll h-[300px] space-y-2 overflow-y-auto p-3">
        {messages.map((m) => (
          <div key={m.id} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={[
                "chat-bubble max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                m.from === "user"
                  ? "bg-white text-slate-950 shadow-[0_10px_40px_rgba(255,255,255,.08)]"
                  : "border border-white/10 bg-white/[0.04] text-slate-100",
              ].join(" ")}
            >
              <div className="whitespace-pre-wrap break-words">{m.text}</div>
              <div className={m.from === "user" ? "mt-1 text-[10px] text-slate-600" : "mt-1 text-[10px] text-slate-500"}>
                {formatTime(m.at)}
              </div>
            </div>
          </div>
        ))}

        {typing ? (
          <div className="chat-bubble w-fit max-w-[85%] rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-200">
            <TypingDots />
          </div>
        ) : null}
      </div>

      {/* input */}
      <div className="border-t border-white/10 p-3">
        <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-black/25 px-3 py-2 focus-within:border-white/20 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,.16)]">
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 500))}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Type a message…"
            className="max-h-24 min-h-[38px] flex-1 resize-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
          <button
            onClick={() => send()}
            disabled={!text.trim() || typing}
            className={[
              "rounded-2xl px-3 py-2 text-sm font-semibold transition",
              text.trim() && !typing
                ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300 active:scale-[0.99]"
                : "cursor-not-allowed bg-emerald-400/20 text-emerald-100/60",
            ].join(" ")}
          >
            Send
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>Enter to send • Shift+Enter new line</span>
          <span className="text-slate-600">{text.length}/500</span>
        </div>
      </div>
    </div>
  );
}

function Chip({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.08] hover:text-white active:scale-[0.99]"
    >
      {children}
    </button>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.2s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.1s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300" />
      <span className="ml-2 text-xs text-slate-400">Typing…</span>
    </div>
  );
}

/* -------------------- helpers -------------------- */

function smartMockReply(text) {
  const t = String(text).toLowerCase();
  if (t.includes("upload"))
    return "Go to Upload → choose MRI image (PNG/JPG) → run analysis. If it fails, check file type/size.";
  if (t.includes("pdf") || t.includes("report"))
    return "Open Reports → select a report → click Download PDF. If blocked, allow popups.";
  if (t.includes("login"))
    return "Check credentials, token expiry, and backend URL. For admin, ensure ENV admin credentials match.";
  return "Got it ✅ (mock reply). Next we’ll connect this to /api/chat.";
}

function formatTime(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function uid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return String(Date.now()) + Math.random().toString(16).slice(2);
}

/* -------------------- icons -------------------- */

function IconMenu() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 12c0 4-4 7-8 7-1.1 0-2.2-.2-3.2-.6L4 20l1.2-3.6A7.2 7.2 0 0 1 4 12c0-4 4-7 8-7s8 3 8 7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMinus() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* -------------------- CSS (kept professional) -------------------- */

const styles = `
@keyframes drawerSlide {
  from { transform: translateX(110%); opacity: .6; }
  to { transform: translateX(0); opacity: 1; }
}
.animate-drawer { animation: drawerSlide .26s cubic-bezier(.4,0,.2,1); }

@keyframes pop {
  from { transform: translateY(6px) scale(.98); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}
.animate-pop { animation: pop .15s ease-out; }

.navlink .nav-underline {
  background: linear-gradient(90deg, rgba(99,102,241,.92), rgba(34,211,238,.9));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .22s ease;
  opacity: .92;
}
.navlink:hover .nav-underline { transform: scaleX(1); }
.navlink[aria-current="page"] .nav-underline { transform: scaleX(1); }

@keyframes chatOpen {
  from { opacity: 0; transform: translateY(12px) scale(.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-chat { animation: chatOpen .18s ease-out; }

@keyframes bubbleIn {
  from { opacity: 0; transform: translateY(6px) scale(.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.chat-bubble { animation: bubbleIn .16s ease-out; }

@keyframes pulseSoft {
  0% { box-shadow: 0 0 0 0 rgba(16,185,129,.30); }
  70% { box-shadow: 0 0 0 14px rgba(16,185,129,0); }
  100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
}
.chat-pulse { animation: pulseSoft 2.2s infinite; }

.chat-scroll::-webkit-scrollbar { width: 10px; }
.chat-scroll::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,.10);
  border-radius: 999px;
  border: 3px solid rgba(0,0,0,0);
  background-clip: padding-box;
}
.chat-scroll::-webkit-scrollbar-track { background: transparent; }
`;
