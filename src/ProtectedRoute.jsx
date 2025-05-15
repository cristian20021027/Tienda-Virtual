// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setChecking(false);
    };

    // Escucha cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    getSession();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (checking) return null; // o un loader

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
