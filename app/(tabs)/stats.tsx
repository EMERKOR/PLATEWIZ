import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/lib/useTheme";

export default function StatsScreen() {
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
          Statistics
        </Text>
        <Text
          style={{
            fontSize: typography.fontSize.base,
            color: colors.textMuted,
            textAlign: "center",
          }}
        >
          Scores, streaks, and achievements coming in Phase 3.
        </Text>
      </View>
    </SafeAreaView>
  );
}
