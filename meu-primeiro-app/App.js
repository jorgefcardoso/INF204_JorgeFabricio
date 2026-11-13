import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import api from "./src/services/api";
import FormularioUsuario from "./src/screens/FormularioUsuario";

export default function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [utilizadores, setUtilizadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Funcao reutilizada na montagem e no pull-to-refresh
  const buscarDados = async () => {
    try {
      // Os dados devolvidos ficam na propriedade "data" do Axios
      const resposta = await api.get("/users");
      setUtilizadores(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar dados:", erro.message);
    } finally {
      // Oculta os indicadores de carregamento, independentemente de erro ou sucesso
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    buscarDados();
  }, []); // Array vazio garante execucao unica na montagem

  // Desafio: Pull-to-Refresh -> exibe o icone nativo e refaz o pedido a API
  const aoPuxarLista = () => {
    setRefreshing(true);
    buscarDados();
  };

  // Desafio: ecra adicional com o formulario de POST
  if (mostrarFormulario) {
    return <FormularioUsuario onVoltar={() => setMostrarFormulario(false)} />;
  }

  // Fornece um feedback visual enquanto o estado e "Pending"
  if (loading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>A carregar utilizadores...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Utilizadores</Text>
      <TouchableOpacity style={styles.botaoNovo} onPress={() => setMostrarFormulario(true)}>
        <Text style={styles.textoBotao}>+ Novo Utilizador</Text>
      </TouchableOpacity>
      <FlatList
        data={utilizadores}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={aoPuxarLista}
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <Text style={styles.nome}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingTop: 50, paddingHorizontal: 20 },
  centro: { flex: 1, justifyContent: "center", alignItems: "center" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#14325A" },
  cartao: { backgroundColor: "#FFF", padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
  nome: { fontSize: 18, fontWeight: "bold" },
  email: { color: "#666", marginTop: 5 },
  botaoNovo: { backgroundColor: "#0064A0", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 15 },
  textoBotao: { color: "#FFF", fontWeight: "bold" }
});
