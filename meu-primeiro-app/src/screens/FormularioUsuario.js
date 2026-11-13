import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import api from "../services/api";

// Desafio: Submissao de Formulario (POST)
export default function FormularioUsuario({ onVoltar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviarFormulario = async () => {
    if (nome.trim() === "" || email.trim() === "") {
      Alert.alert("Atencao", "Preencha o nome e o email.");
      return;
    }

    setEnviando(true);
    try {
      // O Axios serializa o objeto (payload) para JSON automaticamente
      const resposta = await api.post("/users", { name: nome, email: email });
      Alert.alert("Sucesso", `Utilizador criado com id ${resposta.data.id}.`);
      setNome("");
      setEmail("");
    } catch (erro) {
      Alert.alert("Erro", `Nao foi possivel criar o utilizador: ${erro.message}`);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Novo Utilizador</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.botao} onPress={enviarFormulario} disabled={enviando}>
        {enviando ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.textoBotao}>Enviar (POST)</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={[styles.botao, styles.botaoSecundario]} onPress={onVoltar}>
        <Text style={styles.textoBotao}>Voltar para a lista</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingTop: 50, paddingHorizontal: 20 },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#14325A" },
  input: { borderWidth: 1, borderColor: "#CCC", borderRadius: 8, padding: 10, backgroundColor: "#FFF", marginBottom: 12 },
  botao: { backgroundColor: "#0064A0", padding: 15, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  botaoSecundario: { backgroundColor: "#808080" },
  textoBotao: { color: "#FFF", fontWeight: "bold" }
});
