import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import JogoDaVelha from "./JogoDaVelha";

function CartaoPerfil({ nomeInicial, profissao }) {
  const [nome, setNome] = useState(nomeInicial);
  const [seguindo, setSeguindo] = useState(false);

  const alternarSeguir = () => {
    setSeguindo((atual) => !atual);
  };

  return (
    <View style={styles.cartao}>

      <Text style={styles.nomeUsuario}>{nome}</Text>
      <Text style={styles.profissao}>{profissao}</Text>

      {/* Multiplos estilos via array: simula o estado "Ja Seguindo" */}
      <TouchableOpacity
        style={[styles.botao, seguindo && styles.botaoDesativado]}
        activeOpacity={0.7}
        onPress={alternarSeguir}
      >
        <Text style={styles.textoBotao}>
          {seguindo ? "Seguindo" : "Seguir"}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Alterar nome..."
        value={nome}
        onChangeText={(texto) => setNome(texto)}
      />
    </View>
  );
}

export default function App() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.titulo}>Perfis</Text>

      <CartaoPerfil
        nomeInicial="Joao Vitor"
        profissao="Engenheiro de Software"
      />
      <CartaoPerfil
        nomeInicial="Jorge Lucas Freitas Cardoso"
        profissao="Desenvolvedor Full-Stack"
      />
      <CartaoPerfil
        nomeInicial="Fabricio Fialho"
        profissao="Desenvolvedor Mobile"
      />

      <Text style={styles.subtitulo}>Jogo da Velha</Text>
      <JogoDaVelha />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#20325A",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#20325A",
    marginTop: 10,
    marginBottom: 15,
  },
  cartao: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "100%",
    marginBottom: 20,
  },
  nomeUsuario: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#14325A",
  },
  profissao: {
    fontSize: 16,
    color: "#505050",
    marginBottom: 20,
  },
  botao: {
    backgroundColor: "#0064A0",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
  },
  botaoDesativado: {
    backgroundColor: "#AAAAAA",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    textAlign: "center",
  },
});