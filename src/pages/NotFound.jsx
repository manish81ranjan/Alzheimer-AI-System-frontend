// frontend/src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * NotFound
 * - Simple, clean 404
 * - Works with your routes.jsx redirect to /404
 */

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-rose-300" />
          404 • Page not found
        </div>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
          This page doesn’t exist.
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
          The link may be broken, or the page might have been moved. Go back to
          the homepage or open your dashboard.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
          >
            Go Home
          </Link>

          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-100 backdrop-blur transition hover:bg-white/10"
          >
            Dashboard
          </Link>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="text-sm font-semibold">Quick Links</div>
          <div className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
            <Link className="hover:text-white" to="/upload">
              Upload MRI Scan
            </Link>
            <Link className="hover:text-white" to="/reports">
              Reports
            </Link>
            <Link className="hover:text-white" to="/profile">
              Profile
            </Link>
            <Link className="hover:text-white" to="/login">
              Login
            </Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          DEMNET MRI • React + Tailwind + Three.js • Flask + MongoDB
        </div>
      </div>
    </div>
  );
}
