import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default function Contador() {
  const [contagem, setContagem] = useState(0);

  const incrementar = () => {
    setContagem(contagem + 1);
  };

  const decrementar = () => {
    if (contagem > 0) {
      setContagem(contagem - 1);
    }
  };

  const zerar = () => {
    setContagem(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contagem Atual:</Text>

      <Text style={styles.numero}>{contagem}</Text>

      <TouchableOpacity
        style={styles.botaoIncrementar}
        onPress={incrementar}
      >
        <Text style={styles.textoBotao}>Incrementar +1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoDecrementar}
        onPress={decrementar}
      >
        <Text style={styles.textoBotao}>Decrementar -1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoZerar}
        onPress={zerar}
      >
        <Text style={styles.textoBotao}>Zerar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  titulo: {
    fontSize: 20,
    color: "#333333",
    marginBottom: 10,
  },

  numero: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 30,
  },

  botaoIncrementar: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },

  botaoDecrementar: {
    backgroundColor: "#f44336",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },

  botaoZerar: {
    backgroundColor: "#2196f3",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  textoBotao: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});