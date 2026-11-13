import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Chave usada para persistir a sessao no disco
const CHAVE_USUARIO = "@INF204:usuario";

// 1. Criacao do objeto de Contexto
// Valor padrao null: assim o useAuth consegue detetar uso fora do AuthProvider
export const AuthContext = createContext(null);

// 2. O componente Provider que ira envelopar a aplicacao
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // null = Visitante
  // Desafio: enquanto le o disco, evita que a tela de Login "pisque"
  const [carregando, setCarregando] = useState(true);

  // Desafio: ao carregar a aplicacao, restaura a sessao guardada no disco
  useEffect(() => {
    async function carregarSessao() {
      try {
        const usuarioSalvo = await AsyncStorage.getItem(CHAVE_USUARIO);
        if (usuarioSalvo) {
          setUsuario(JSON.parse(usuarioSalvo));
        }
      } catch (erro) {
        console.error("Falha ao restaurar a sessao", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarSessao();
  }, []);

  // Simulacao de um Login
  async function signIn(email, senha) {
    // Aqui aconteceria uma chamada de API (axios.post)
    const respostaAPI = { id: "123", nome: "Turma INF204", email: email };
    setUsuario(respostaAPI);
    // Desafio: persiste o utilizador (o AsyncStorage so guarda Strings)
    await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(respostaAPI));
  }

  // Simulacao de um Logout
  async function signOut() {
    setUsuario(null);
    // Desafio: remove a sessao do disco
    await AsyncStorage.removeItem(CHAVE_USUARIO);
  }

  return (
    // Injetamos as propriedades e metodos no "canal" global
    // A conversao booleana (!!usuario) indica se ha alguem logado
    <AuthContext.Provider value={{ logado: !!usuario, usuario, carregando, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
