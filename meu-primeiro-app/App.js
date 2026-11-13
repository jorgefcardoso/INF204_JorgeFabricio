import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import api from "./src/services/api";

export default function App() {
  const [utilizadores, setUtilizadores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        // Os dados devolvidos ficam na propriedade "data" do Axios
        const resposta = await api.get("/users");
        setUtilizadores(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar dados:", erro.message);
      } finally {
        // Oculta o indicador de carregamento, independentemente de erro ou sucesso
        setLoading(false);
      }
    };

    buscarDados();
  }, []); // Array vazio garante execucao unica na montagem

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
      <FlatList
        data={utilizadores}
        keyExtractor={(item) => item.id.toString()}
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
  email: { color: "#666", marginTop: 5 }
});
