import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useTema } from "../hooks/useTema";

const Stack = createNativeStackNavigator();

// --- TELAS SIMULADAS ---
function TelaLogin() {
  const { signIn } = useAuth(); // Usando o nosso hook customizado!
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Área Restrita</Text>
      <Button title="Entrar no Sistema" onPress={() => signIn("teste@email.com", "123")} />
    </View>
  );
}

function TelaDashboard() {
  const { usuario, signOut } = useAuth();
  const { tema, alternarTema } = useTema(); // Segundo contexto, consumido em paralelo

  const escuro = tema === "escuro";
  const corFundo = escuro ? "#121212" : "#FFFFFF";
  const corTexto = escuro ? "#FFFFFF" : "#000000";

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: corFundo }}>
      <Text style={{ fontSize: 24, marginBottom: 20, color: corTexto }}>Bem-vindo, {usuario?.nome}</Text>
      <Text style={{ marginBottom: 20, color: corTexto }}>Tema atual: {tema}</Text>
      <View style={{ marginBottom: 12 }}>
        <Button title={escuro ? "Mudar para tema claro" : "Mudar para tema escuro"} onPress={alternarTema} />
      </View>
      <Button title="Sair da Conta" color="red" onPress={signOut} />
    </View>
  );
}

// --- ROTEADOR PRINCIPAL ---
export default function Rotas() {
  const { logado } = useAuth(); // Escuta ativamente o estado global

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Renderizacao Condicional de Rotas baseada no estado Global */}
        {logado ? (
          <Stack.Screen name="Dashboard" component={TelaDashboard} />
        ) : (
          <Stack.Screen name="Login" component={TelaLogin} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
