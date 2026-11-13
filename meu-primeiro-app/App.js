import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

// Funcao de inicializacao das tabelas no disco
const iniciarBanco = async (db) => {
  await db.execAsync("PRAGMA journal_mode = WAL;");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      concluida INTEGER DEFAULT 0
    );
  `);
  console.log("Base de Dados inicializada!");
};

export default function App() {
  return (
    // Engloba a aplicacao garantindo o acesso global
    <SQLiteProvider databaseName="app-database.db" onInit={iniciarBanco}>
      <EcraPrincipal />
    </SQLiteProvider>
  );
}

function EcraPrincipal() {
  // Acesso a instancia do banco de dados relacional
  const db = useSQLiteContext();

  // Desafio: o utilizador passa a ser um objeto (serializado no AsyncStorage)
  const [usuario, setUsuario] = useState({ nome: "Visitante", logado: true });
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  // Efeito para carregar dados assim que o ecra abrir
  useEffect(() => {
    carregarPreferencias();
    carregarTarefas();
  }, []);

  // Leitura Assincrona Chave-Valor (String JSON -> Objeto)
  // Chave nova para nao tentar fazer JSON.parse da string antiga "@AppTarefas:Nome"
  const carregarPreferencias = async () => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem("@AppTarefas:Usuario");
      if (usuarioSalvo) setUsuario(JSON.parse(usuarioSalvo));
    } catch (erro) {
      console.error("Falha ao ler o utilizador", erro);
    }
  };

  // Gravacao Assincrona Chave-Valor (Objeto -> String JSON)
  const salvarNome = async () => {
    const novoUsuario = { nome: "Estudante INF204", logado: true };
    await AsyncStorage.setItem("@AppTarefas:Usuario", JSON.stringify(novoUsuario));
    setUsuario(novoUsuario);
  };

  // Leitura SQL (SELECT)
  const carregarTarefas = async () => {
    try {
      const resultados = await db.getAllAsync("SELECT * FROM tarefas ORDER BY id DESC;");
      setTarefas(resultados);
    } catch (erro) {
      console.error("Falha ao ler dados", erro);
    }
  };

  // Insercao SQL com Bindings de Seguranca (INSERT)
  const adicionarTarefa = async () => {
    if (novaTarefa.trim() === "") return;

    try {
      await db.runAsync("INSERT INTO tarefas (descricao, concluida) VALUES (?, ?);", [novaTarefa, 0]);
      setNovaTarefa("");
      carregarTarefas(); // Atualiza a lista visualmente
    } catch (erro) {
      console.error("Erro no insert", erro);
    }
  };

  // Atualizacao SQL (UPDATE)
  const alternarStatus = async (id, statusAtual) => {
    const novoStatus = statusAtual === 1 ? 0 : 1;
    await db.runAsync("UPDATE tarefas SET concluida = ? WHERE id = ?;", [novoStatus, id]);
    carregarTarefas();
  };

  // Desafio: Eliminacao SQL com Bindings de Seguranca (DELETE)
  const eliminarTarefa = async (id) => {
    try {
      await db.runAsync("DELETE FROM tarefas WHERE id = ?;", [id]);
      carregarTarefas();
    } catch (erro) {
      console.error("Erro no delete", erro);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Olá, {usuario.nome}!</Text>
        <TouchableOpacity style={styles.botaoAcao} onPress={salvarNome}>
          <Text style={styles.textoBotao}>Mudar Nome</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <TouchableOpacity style={styles.botaoAdd} onPress={adicionarTarefa}>
          <Text style={styles.textoBotao}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <TouchableOpacity style={styles.areaTarefa} onPress={() => alternarStatus(item.id, item.concluida)}>
              <Text style={[styles.textoTarefa, item.concluida === 1 && styles.textoConcluido]}>
                {item.descricao}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoEliminar} onPress={() => eliminarTarefa(item.id)}>
              <Text style={styles.textoBotao}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingTop: 50, paddingHorizontal: 20 },
  cabecalho: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  titulo: { fontSize: 24, fontWeight: "bold", color: "#14325A" },
  botaoAcao: { backgroundColor: "#808080", padding: 10, borderRadius: 8 },
  inputContainer: { flexDirection: "row", marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: "#CCC", borderRadius: 8, padding: 10, backgroundColor: "#FFF" },
  botaoAdd: { backgroundColor: "#0064A0", padding: 15, borderRadius: 8, marginLeft: 10, justifyContent: "center" },
  textoBotao: { color: "#FFF", fontWeight: "bold" },
  cartao: { backgroundColor: "#FFF", padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2, flexDirection: "row", alignItems: "center" },
  areaTarefa: { flex: 1 },
  botaoEliminar: { backgroundColor: "#D32F2F", width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center", marginLeft: 10 },
  textoTarefa: { fontSize: 18, color: "#333" },
  textoConcluido: { textDecorationLine: "line-through", color: "#999" }
});
