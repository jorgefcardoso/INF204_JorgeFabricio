import React from "react";
import { ThemeProvider } from "./src/contexts/TemaContext";
import { AuthProvider } from "./src/contexts/AuthContext";
import Rotas from "./src/routes";

export default function App() {
  return (
    // Aninhamento de Providers: o ThemeProvider envolve o AuthProvider
    // O Provider no topo garante disponibilidade global e resolve o Prop Drilling
    <ThemeProvider>
      <AuthProvider>
        <Rotas />
      </AuthProvider>
    </ThemeProvider>
  );
}
