import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import Rotas from "./src/routes";

export default function App() {
  return (
    // O Provider no topo garante disponibilidade global e resolve o Prop Drilling
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  );
}
