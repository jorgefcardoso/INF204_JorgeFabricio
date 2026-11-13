import React, { createContext, useState } from "react";

// Segundo contexto (separacao de dominios): dado de baixa mutacao
export const TemaContext = createContext(null);

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState("claro"); // "claro" | "escuro"

  function alternarTema() {
    setTema((atual) => (atual === "claro" ? "escuro" : "claro"));
  }

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
}
