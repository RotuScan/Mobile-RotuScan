import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import type { ComponentProps } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./style";

export type AbaId = "inicio" | "historico" | "escanear" | "curtidos" | "perfil";

type Aba = {
  id: AbaId;
  rotulo: string;
  rota: string;
  icone?: ComponentProps<typeof Feather>["name"];
  destaque?: boolean;
};

// Ajuste as rotas conforme os arquivos que existem em app/
const ABAS: Aba[] = [
  { id: "inicio", rotulo: "Início", icone: "home", rota: "/" },
  { id: "historico", rotulo: "Histórico", icone: "clock", rota: "/historico" },
  { id: "escanear", rotulo: "Escanear", rota: "/scanner", destaque: true },
  { id: "curtidos", rotulo: "Curtidos", icone: "heart", rota: "/curtidos" },
  { id: "perfil", rotulo: "Perfil", icone: "user", rota: "/perfil" },
];

type Props = {
  abaAtiva: AbaId;
};

export default function TabBar({ abaAtiva }: Props) {
  const insets = useSafeAreaInsets();

  function aoPressionar(aba: Aba) {
    if (aba.id === abaAtiva) return;

    // Scanner abre por cima (dá pra voltar); as demais abas trocam de tela
    if (aba.destaque) {
      router.push(aba.rota as any);
    } else {
      router.replace(aba.rota as any);
    }
  }

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}
    >
      {ABAS.map((aba) => {
        const ativa = aba.id === abaAtiva;

        if (aba.destaque) {
          return (
            <View key={aba.id} style={styles.scanTab}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.scanButton}
                onPress={() => aoPressionar(aba)}
                accessibilityRole="button"
                accessibilityLabel="Escanear produto"
              >
                <MaterialCommunityIcons
                  name="barcode-scan"
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
          );
        }

        return (
          <TouchableOpacity
            key={aba.id}
            activeOpacity={0.7}
            style={styles.tab}
            onPress={() => aoPressionar(aba)}
            accessibilityRole="tab"
            accessibilityState={{ selected: ativa }}
            accessibilityLabel={aba.rotulo}
          >
            <View style={[styles.iconPill, ativa && styles.iconPillAtivo]}>
              <Feather
                name={aba.icone!}
                size={20}
                color={ativa ? "#006D37" : "#9CA3AF"}
              />
            </View>
            <Text style={[styles.label, ativa && styles.labelAtivo]}>
              {aba.rotulo}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}