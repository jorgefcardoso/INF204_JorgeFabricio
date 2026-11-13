import React, { createContext, useState } from "react";

// 1. Criacao do objeto de Contexto
// Valor padrao null: assim o useAuth consegue detetar uso fora do AuthProvider
export const AuthContext = createContext(null);

// 2. O componente Provider que ira envelopar a aplicacao
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // null = Visitante

  // Simulacao de um Login
  async function signIn(email, senha) {
    // Aqui aconteceria uma chamada de API (axios.post)
    const respostaAPI = { id: "123", nome: "Turma INF204", email: email };
    setUsuario(respostaAPI);
  }

  // Simulacao de um Logout
  function signOut() {
    setUsuario(null);
  }

  return (
    // Injetamos as propriedades e metodos no "canal" global
    // A conversao booleana (!!usuario) indica se ha alguem logado
    <AuthContext.Provider value={{ logado: !!usuario, usuario, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
