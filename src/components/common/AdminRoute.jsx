// frontend/src/components/common/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { tokenStorage } from "@/api/tokenStorage";

export default function AdminRoute({ children }) {
  const isAuthed = tokenStorage.isAuthenticated();
  const isAdmin = tokenStorage.isAdmin();

  if (!isAuthed) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
}
