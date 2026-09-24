import React from "react";
import { View, Text, StyleSheet } from "react-native";
export default function DetalhesUsuario({ route }) {
// Desestruturando o parametro recebido da navegacao
const { nomeUsuario } = route.params;
return (
<View style={styles.container}>
<Text style={styles.titulo}>Detalhes do Perfil</Text>
<Text style={styles.texto}>Bem-vindo, {nomeUsuario}!</Text>
</View>
);
}
const styles = StyleSheet.create({
container: { flex: 1, justifyContent: "center", alignItems: "center" },
titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
texto: { fontSize: 18, color: "#555" }
});