import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/lib/useTheme";

export default function PlayScreen() {
  const { colors, typography, spacing } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: spacing.lg,
        }}
      >
        <Text
          style={{
            fontSize: typography.fontSize["2xl"],
            fontWeight: typography.fontWeight.bold,
            color: colors.text,
            marginBottom: spacing.sm,
          }}
        >
          Game Modes
        </Text>
        <Text
          style={{
            fontSize: typography.fontSize.base,
            color: colors.textMuted,
            textAlign: "center",
          }}
        >
          Decoder, Trivia, Spotter, and Logic modes coming in Phase 2.
        </Text>
      </View>
    </SafeAreaView>
  );
}
