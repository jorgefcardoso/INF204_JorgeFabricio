import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ItemTarefa, { Tarefa } from "./ItemTarefa";

export default function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: 1, descricao: "Estudar", concluida: true },
    { id: 2, descricao: "Configurar", concluida: true },
    { id: 3, descricao: "Entender JSX", concluida: true },
    { id: 4, descricao: "Finalizar Pratica 2", concluida: true },
    { id: 5, descricao: "Testar Pratica 2", concluida: false },
  ]);

  const tarefasPendentes: Tarefa[] = tarefas.filter(
    (tarefa: Tarefa) => !tarefa.concluida,
  );

  const adicionarTarefa = (): void => {
    setTarefas((tarefasAtuais: Tarefa[]): Tarefa[] => {
      const maiorId: number = tarefasAtuais.reduce(
        (maior: number, tarefa: Tarefa): number =>
          Math.max(maior, tarefa.id),
        0,
      );

      const proximoId: number = maiorId + 1;

      const novaTarefa: Tarefa = {
        id: proximoId,
        descricao: `Nova tarefa ${proximoId}`,
        concluida: false,
      };

      return [...tarefasAtuais, novaTarefa];
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.titulo}>Lista de Tarefas</Text>

      <Text style={styles.subtitulo}>Todas as tarefas</Text>

      {/* Renderização da lista principal utilizando map */}
      {tarefas.map((tarefa: Tarefa) => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}

      <Text style={styles.subtitulo}>Tarefas pendentes</Text>

      {/* Renderização condicional com operador ternário. */}
      {tarefasPendentes.length > 0 ? (
        tarefasPendentes.map((tarefa: Tarefa) => (
          <ItemTarefa key={`pendente-${tarefa.id}`} tarefa={tarefa} />
        ))
      ) : (
        <Text style={styles.mensagem}>Nenhuma tarefa pendente.</Text>
      )}

      <TouchableOpacity
        style={styles.botao}
        onPress={adicionarTarefa}
      >
        <Text style={styles.textoBotao}>Adicionar nova tarefa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#20325a",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#20325a",
    marginTop: 10,
    marginBottom: 10,
  },
  mensagem: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 10,
  },
  botao: {
    backgroundColor: "#20325a",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  textoBotao: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
