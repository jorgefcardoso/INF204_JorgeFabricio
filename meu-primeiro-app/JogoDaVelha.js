import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TABULEIRO_VAZIO = Array(9).fill(null);

const LINHAS_VENCEDORAS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calcularVencedor(casas) {
  for (const [a, b, c] of LINHAS_VENCEDORAS) {
    if (casas[a] && casas[a] === casas[b] && casas[a] === casas[c]) {
      return casas[a];
    }
  }
  return null;
}

export default function JogoDaVelha() {
  const [casas, setCasas] = useState(TABULEIRO_VAZIO);
  const [jogadorAtual, setJogadorAtual] = useState("X");

  const vencedor = calcularVencedor(casas);
  const empate = !vencedor && casas.every((casa) => casa !== null);

  const jogar = (indice) => {
    if (casas[indice] || vencedor) return;

    const novasCasas = [...casas];
    novasCasas[indice] = jogadorAtual;
    setCasas(novasCasas);
    setJogadorAtual(jogadorAtual === "X" ? "O" : "X");
  };

  const reiniciar = () => {
    setCasas(TABULEIRO_VAZIO);
    setJogadorAtual("X");
  };

  let mensagemStatus = `Vez de: ${jogadorAtual}`;
  if (vencedor) mensagemStatus = `Vencedor: ${vencedor}`;
  else if (empate) mensagemStatus = "Empate!";

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{mensagemStatus}</Text>

      <View style={styles.tabuleiro}>
        {[0, 1, 2].map((linha) => (
          <View style={styles.linha} key={linha}>
            {[0, 1, 2].map((coluna) => {
              const indice = linha * 3 + coluna;
              return (
                <TouchableOpacity
                  key={indice}
                  style={styles.celula}
                  onPress={() => jogar(indice)}
                  activeOpacity={0.6}
                >
                  <Text style={styles.simbolo}>{casas[indice]}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciar}>
        <Text style={styles.textoBotaoReiniciar}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 30,
  },
  status: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#20325A",
    marginBottom: 15,
  },
  tabuleiro: {
    flexDirection: "column",
  },
  linha: {
    flexDirection: "row",
  },
  celula: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: "#20325A",
    justifyContent: "center",
    alignItems: "center",
  },
  simbolo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#20325A",
  },
  botaoReiniciar: {
    marginTop: 15,
    backgroundColor: "#20325A",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  textoBotaoReiniciar: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});