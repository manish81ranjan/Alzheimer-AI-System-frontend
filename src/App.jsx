// frontend/src/App.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/common/Footer.jsx";

/**
 * App Layout Wrapper
 * - Renders Navbar + Footer on most pages
 * - Hides Navbar/Footer on auth pages (login/register)
 *
 * Note:
 * AppRoutes is mounted in main.jsx (RouterProvider or BrowserRouter)
 * This file provides a consistent layout shell.
 */
export default function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {!isAuthPage && <Navbar />}

      <main className={!isAuthPage ? "pt-16" : ""}>
        <Outlet />
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}
