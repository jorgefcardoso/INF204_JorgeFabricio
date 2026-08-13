import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const BotaoCustomizado = ({
  titulo,
  ativo = true,
  onPress,
  tipo,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.botao,
        ativo
          ? tipo === "incrementar"
            ? styles.botaoIncrementar
            : tipo === "decrementar"
            ? styles.botaoDecrementar
            : styles.botaoZerar
          : styles.botaoDesativado,
      ]}
      onPress={onPress}
      disabled={!ativo}
    >
      <Text style={styles.textoBotao}>
        {titulo}
      </Text>
    </TouchableOpacity>
  );
};

export default function App() {
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

      <Text style={styles.titulo}>
        Contagem Atual:
      </Text>

      <Text style={styles.numero}>
        {contagem}
      </Text>

      <BotaoCustomizado
        titulo="Incrementar +1"
        ativo={true}
        tipo="incrementar"
        onPress={incrementar}
      />

      <BotaoCustomizado
        titulo="Decrementar -1"
        ativo={contagem > 0}
        tipo="decrementar"
        onPress={decrementar}
      />

      <BotaoCustomizado
        titulo="Zerar"
        ativo={contagem > 0}
        tipo="zerar"
        onPress={zerar}
      />

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

  botao: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    minWidth: 180,
  },

  botaoIncrementar: {
    backgroundColor: "#4caf50",
  },

  botaoDecrementar: {
    backgroundColor: "#f44336",
  },

  botaoZerar: {
    backgroundColor: "#2196f3",
  },

  botaoDesativado: {
    backgroundColor: "#bdbdbd",
  },

  textoBotao: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});