// import React, { useState } from "react";

// export default function HelpChat({ open, onClose }) {
//   const [messages, setMessages] = useState([
//     { from: "bot", text: "Hi! How can I help you?" },
//   ]);
//   const [text, setText] = useState("");

//   if (!open) return null;

//   const send = () => {
//     if (!text.trim()) return;

//     const userMsg = { from: "user", text };
//     const botMsg = { from: "bot", text: "Got it ✅ (mock reply). We’ll connect AI later." };

//     setMessages((m) => [...m, userMsg, botMsg]);
//     setText("");
//   };

//   return (
//     <div className="fixed bottom-6 right-6 w-[320px] rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl">
//       <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
//         <div className="text-white font-semibold">Help Chat</div>
//         <button onClick={onClose} className="text-slate-300 hover:text-white">✕</button>
//       </div>

//       <div className="h-[280px] overflow-y-auto p-3 space-y-2">
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             className={`px-3 py-2 rounded-xl text-sm ${
//               m.from === "user"
//                 ? "bg-white text-slate-900 ml-auto w-fit max-w-[80%]"
//                 : "bg-slate-800 text-white w-fit max-w-[80%]"
//             }`}
//           >
//             {m.text}
//           </div>
//         ))}
//       </div>

//       <div className="p-3 border-t border-white/10 flex gap-2">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Type..."
//           className="flex-1 rounded-xl px-3 py-2 bg-slate-800 text-white outline-none"
//         />
//         <button
//           onClick={send}
//           className="px-3 py-2 rounded-xl bg-emerald-500 text-slate-950 font-semibold"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * HelpChat (Pro)
 * - Minimize bubble + unread badge
 * - Drag to move (desktop)
 * - localStorage persistence
 * - Enter to send, Shift+Enter newline
 * - Typing indicator, "delivered" tick
 * - Small quick actions (professional, not clutter)
 */

const STORAGE_KEY = "demnet_helpchat_v1";

export default function HelpChat({ open, onClose }) {
  // If you keep open prop for toggling, we respect it.
  // But we also allow minimizing inside the chat.
  const [minimized, setMinimized] = useState(false);

  const [messages, setMessages] = useState(() => {
    const saved = safeParse(localStorage.getItem(STORAGE_KEY));
    if (saved?.messages?.length) return saved.messages;
    return [
      {
        id: cryptoId(),
        from: "bot",
        text: "Hi! How can I help you today?",
        at: Date.now(),
        status: "delivered",
      },
    ];
  });

  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);

  // Position (draggable)
  const [pos, setPos] = useState(() => {
    const saved = safeParse(localStorage.getItem(STORAGE_KEY));
    return saved?.pos || { right: 24, bottom: 24 }; // px
  });

  const listRef = useRef(null);
  const inputRef = useRef(null);

  const canSend = useMemo(() => text.trim().length > 0 && !isTyping, [text, isTyping]);

  // Persist
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ messages, pos, minimized })
    );
  }, [messages, pos, minimized]);

  // When parent open closes -> also close
  useEffect(() => {
    if (!open) return;
    // focus on open
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, [open]);

  // auto scroll
  useEffect(() => {
    if (!open || minimized) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    setUnread(0);
  }, [open, minimized, messages.length, isTyping]);

  // escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // if not open at all
  if (!open) return null;

  const send = async (overrideText) => {
    const content = (overrideText ?? text).trim();
    if (!content || isTyping) return;

    const userMsg = {
      id: cryptoId(),
      from: "user",
      text: content,
      at: Date.now(),
      status: "sent",
    };

    setMessages((m) => [...m, userMsg]);
    setText("");

    // simulate "delivered"
    setTimeout(() => {
      setMessages((m) =>
        m.map((x) => (x.id === userMsg.id ? { ...x, status: "delivered" } : x))
      );
    }, 250);

    // mock typing + reply
    setIsTyping(true);
    await sleep(650);

    const botMsg = {
      id: cryptoId(),
      from: "bot",
      text: mockReply(content),
      at: Date.now(),
      status: "delivered",
    };

    setMessages((m) => [...m, botMsg]);
    setIsTyping(false);

    // unread badge if minimized
    if (minimized) setUnread((u) => u + 1);
  };

  const clearChat = () => {
    setIsTyping(false);
    setText("");
    setUnread(0);
    setMessages([
      {
        id: cryptoId(),
        from: "bot",
        text: "Hi! How can I help you today?",
        at: Date.now(),
        status: "delivered",
      },
    ]);
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  const onInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Dragging (desktop)
  const drag = useDrag((dx, dy) => {
    setPos((p) => ({
      right: clamp(p.right - dx, 8, window.innerWidth - 80),
      bottom: clamp(p.bottom - dy, 8, window.innerHeight - 80),
    }));
  });

  return (
    <div
      className="fixed z-50"
      style={{ right: pos.right, bottom: pos.bottom }}
    >
      {/* Minimized bubble */}
      {minimized ? (
        <button
          onClick={() => {
            setMinimized(false);
            setTimeout(() => inputRef.current?.focus(), 120);
          }}
          className="group relative grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-slate-950/80 text-white shadow-[0_25px_90px_rgba(0,0,0,.55)] backdrop-blur-xl transition hover:bg-slate-950/95 active:scale-[0.99]"
          aria-label="Open help chat"
          title="Open help chat"
        >
          <span className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-400/20 opacity-0 transition group-hover:opacity-100" />
          <span className="relative">
            <IconChat />
          </span>

          {unread > 0 ? (
            <span className="absolute -top-2 -right-2 grid h-6 min-w-[24px] place-items-center rounded-full bg-emerald-400 px-2 text-xs font-bold text-slate-950">
              {unread > 9 ? "9+" : unread}
            </span>
          ) : null}
        </button>
      ) : (
        /* Full panel */
        <div
          className="w-[360px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,.6)] animate-chatIn"
          role="dialog"
          aria-label="Help chat"
        >
          {/* Header (draggable) */}
          <div
            {...drag.handlers}
            className="flex cursor-grab select-none items-center justify-between gap-3 border-b border-white/10 px-4 py-3 active:cursor-grabbing"
            title="Drag to move"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,.12)]" />
                <div className="truncate text-sm font-semibold text-white">
                  Help Chat
                </div>
              </div>
              <div className="mt-0.5 text-[11px] text-slate-400">
                DEMNET Support • Demo mode
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition hover:bg-white/10 hover:text-white"
                title="Clear chat"
              >
                Clear
              </button>

              <button
                onClick={() => setMinimized(true)}
                className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-white"
                aria-label="Minimize"
                title="Minimize"
              >
                <IconMinus />
              </button>

              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-white"
                aria-label="Close"
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Quick actions (minimal) */}
          <div className="border-b border-white/10 px-3 py-3">
            <div className="flex flex-wrap gap-2">
              <QuickChip onClick={() => send("How to upload MRI scan?")}>
                Upload help
              </QuickChip>
              <QuickChip onClick={() => send("Where can I download the report PDF?")}>
                Report PDF
              </QuickChip>
              <QuickChip onClick={() => send("I can’t login. What should I check?")}>
                Login issue
              </QuickChip>
            </div>
          </div>

          {/* Messages */}
          <div ref={listRef} className="h-[300px] overflow-y-auto px-3 py-3 space-y-2 chat-scroll">
            {messages.map((m) => (
              <MessageBubble key={m.id} m={m} />
            ))}

            {isTyping ? (
              <div className="w-fit max-w-[85%] rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-200">
                <TypingDots />
              </div>
            ) : null}
          </div>

          {/* Composer */}
          <div className="border-t border-white/10 p-3">
            <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-black/25 px-3 py-2 focus-within:border-white/20 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,.16)]">
              <AutoTextarea
                inputRef={inputRef}
                value={text}
                onChange={setText}
                onKeyDown={onInputKeyDown}
                placeholder="Type a message…"
              />

              <button
                onClick={() => send()}
                disabled={!canSend}
                className={[
                  "rounded-xl px-3 py-2 text-sm font-semibold transition",
                  canSend
                    ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300 active:scale-[0.99]"
                    : "cursor-not-allowed bg-emerald-400/20 text-emerald-100/60",
                ].join(" ")}
                title="Send (Enter)"
              >
                Send
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
              <span>Enter to send • Shift+Enter for new line</span>
              <span className="text-slate-600">{Math.min(text.length, 500)}/500</span>
            </div>
          </div>
        </div>
      )}

      {/* Local styles */}
      <style>{`
        @keyframes chatIn {
          0% { opacity: 0; transform: translateY(10px) scale(.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-chatIn { animation: chatIn .18s ease-out; }

        .chat-scroll::-webkit-scrollbar { width: 10px; }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,.10);
          border-radius: 999px;
          border: 3px solid rgba(0,0,0,0);
          background-clip: padding-box;
        }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
}

/* ---------------- Components ---------------- */

function QuickChip({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </button>
  );
}

function MessageBubble({ m }) {
  const mine = m.from === "user";
  return (
    <div className={mine ? "flex justify-end" : "flex justify-start"}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
          mine
            ? "bg-white text-slate-950 shadow-[0_10px_40px_rgba(255,255,255,.08)]"
            : "border border-white/10 bg-white/[0.04] text-slate-100",
        ].join(" ")}
      >
        <div className="whitespace-pre-wrap break-words">{m.text}</div>

        <div className={mine ? "mt-1 flex items-center gap-2 text-[10px] text-slate-600" : "mt-1 text-[10px] text-slate-500"}>
          <span>{formatTime(m.at)}</span>
          {mine ? (
            <span className="inline-flex items-center gap-1">
              <span className={m.status === "delivered" ? "text-emerald-600" : "text-slate-500"}>
                ✓
              </span>
              <span className={m.status === "delivered" ? "text-emerald-600" : "text-slate-500"}>
                ✓
              </span>
            </span>
          ) : null}
        </div>
      </div>
    </div>
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

function AutoTextarea({ inputRef, value, onChange, onKeyDown, placeholder }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = Math.min(el.scrollHeight, 96) + "px";
  }, [value]);

  return (
    <textarea
      ref={(node) => {
        ref.current = node;
        if (inputRef) inputRef.current = node;
      }}
      value={value}
      onChange={(e) => onChange(e.target.value.slice(0, 500))}
      onKeyDown={onKeyDown}
      rows={1}
      placeholder={placeholder}
      className="max-h-24 min-h-[38px] flex-1 resize-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
    />
  );
}

/* ---------------- Drag util ---------------- */

function useDrag(onMove) {
  const start = useRef(null);

  const handlers = {
    onMouseDown: (e) => {
      if (e.button !== 0) return;
      start.current = { x: e.clientX, y: e.clientY };
      const move = (ev) => {
        if (!start.current) return;
        const dx = ev.clientX - start.current.x;
        const dy = ev.clientY - start.current.y;
        start.current = { x: ev.clientX, y: ev.clientY };
        onMove(dx, dy);
      };
      const up = () => {
        start.current = null;
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    },
  };

  return { handlers };
}

/* ---------------- Helpers ---------------- */

function mockReply(userText) {
  const t = userText.toLowerCase();
  if (t.includes("upload")) return "Go to Upload Scan → select MRI image → run analysis. If it fails, check file type (PNG/JPG) and size.";
  if (t.includes("pdf") || t.includes("report")) return "Open Reports → select a report → click Download PDF. If blocked, allow popups for this site.";
  if (t.includes("login")) return "Check email/password, token expiry, and backend URL. If role is admin, ensure ENV admin credentials are correct.";
  return "Got it ✅ (mock reply). We’ll connect AI later.";
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

function safeParse(x) {
  try {
    return JSON.parse(x);
  } catch {
    return null;
  }
}

function cryptoId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return String(Date.now()) + Math.random().toString(16).slice(2);
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

/* ---------------- Icons ---------------- */

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
