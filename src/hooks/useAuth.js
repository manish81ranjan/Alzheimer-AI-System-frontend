// frontend/src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { apiGet } from "@/api/http";
import { API } from "@/api/endpoints";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const isAuthed = Boolean(token);

  useEffect(() => {
    let alive = true;

    async function boot() {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await apiGet(API.AUTH.ME);
        const u = res?.user || null;

        if (alive) {
          setUser(u);
          localStorage.setItem("user", JSON.stringify(u)); // keep synced
        }
      } catch {
        // token invalid
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if (alive) setUser(null);
      } finally {
        if (alive) setLoading(false);
      }
    }

    boot();
    return () => {
      alive = false;
    };
  }, [token]);

  const isAdmin = (user?.role || "").toLowerCase() === "admin";

  return { loading, isAuthed, user, isAdmin };
}
