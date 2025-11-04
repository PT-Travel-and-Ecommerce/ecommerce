"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();

      if (data.authenticated) {
        setUser(data.user);
        setAuthenticated(true);
      } else {
        setUser(null);
        setAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setUser(null);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  function redirectToSSO(redirectUrl?: string) {
    const currentUrl = redirectUrl || window.location.href;
    const ssoUrl = `https://ssoauth.darulgs.co.id/login?redirectUrl=${encodeURIComponent(currentUrl)}`;
    window.location.href = ssoUrl;
  }

  return {
    user,
    loading,
    authenticated,
    redirectToSSO,
    refreshSession: checkSession,
  };
}
