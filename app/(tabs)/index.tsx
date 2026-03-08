import React, { useState, useCallback } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/lib/useTheme";
import { getRandomState } from "@/lib/content-loader";
import { PlateRenderer } from "@/components/plates/PlateRenderer";
import type { StateMetadata } from "@/types/content";

const SAMPLE_PLATES = [
  "10SNE1",
  "LUV2RUN",
  "NVRMND",
  "OUTATIME",
  "LWYRUP",
  "PB4WEGO",
  "HIOFCR",
  "XCLNCE",
];

export default function HomeScreen() {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const [state, setState] = useState<StateMetadata>(getRandomState);
  const [plateText, setPlateText] = useState(
    () => SAMPLE_PLATES[Math.floor(Math.random() * SAMPLE_PLATES.length)]
  );

  const shuffle = useCallback(() => {
    setState(getRandomState());
    setPlateText(
      SAMPLE_PLATES[Math.floor(Math.random() * SAMPLE_PLATES.length)]
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          padding: spacing.lg,
        }}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: typography.fontSize["4xl"],
            fontWeight: typography.fontWeight.black,
            color: colors.secondary,
            marginBottom: spacing.xs,
            letterSpacing: 2,
          }}
        >
          PLATE WIZ
        </Text>
        <Text
          style={{
            fontSize: typography.fontSize.base,
            color: colors.textMuted,
            marginBottom: spacing.xl,
          }}
        >
          Phase 1 Test Screen
        </Text>

        {/* Plate */}
        <PlateRenderer plateText={plateText} state={state} />

        {/* State info card */}
        <View
          style={{
            marginTop: spacing.lg,
            backgroundColor: colors.backgroundLight,
            borderRadius: borderRadius.lg,
            padding: spacing.lg,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Text
            style={{
              fontSize: typography.fontSize["2xl"],
              fontWeight: typography.fontWeight.bold,
              color: colors.text,
              marginBottom: spacing.xs,
            }}
          >
            {state.state_name}
          </Text>
          <Text
            style={{
              fontSize: typography.fontSize.sm,
              color: colors.textMuted,
              marginBottom: spacing.md,
            }}
          >
            {state.nickname} | Capital: {state.capital}
          </Text>

          {state.slogan ? (
            <View style={{ marginBottom: spacing.md }}>
              <Text
                style={{
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.secondary,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: spacing.xs,
                }}
              >
                Plate Slogan
              </Text>
              <Text
                style={{
                  fontSize: typography.fontSize.lg,
                  color: colors.text,
                  fontWeight: typography.fontWeight.medium,
                }}
              >
                {state.slogan}
                {state.slogan_since ? ` (since ${state.slogan_since})` : ""}
              </Text>
            </View>
          ) : null}

          {state.symbols.length > 0 ? (
            <View style={{ marginBottom: spacing.md }}>
              <Text
                style={{
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.secondary,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: spacing.xs,
                }}
              >
                State Symbols
              </Text>
              <Text
                style={{
                  fontSize: typography.fontSize.base,
                  color: colors.text,
                }}
              >
                {state.symbols.join(", ")}
              </Text>
            </View>
          ) : null}

          {state.notable_facts.length > 0 ? (
            <View>
              <Text
                style={{
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.secondary,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: spacing.xs,
                }}
              >
                Notable Facts
              </Text>
              {state.notable_facts.map((fact, i) => (
                <Text
                  key={i}
                  style={{
                    fontSize: typography.fontSize.sm,
                    color: colors.text,
                    marginBottom: spacing.sm,
                    lineHeight: typography.fontSize.sm * 1.5,
                  }}
                >
                  {fact}
                </Text>
              ))}
            </View>
          ) : null}
        </View>

        {/* Shuffle button */}
        <Pressable
          onPress={shuffle}
          style={{
            marginTop: spacing.lg,
            backgroundColor: colors.secondary,
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.xl,
            borderRadius: borderRadius.lg,
          }}
        >
          <Text
            style={{
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.bold,
              color: colors.textDark,
            }}
          >
            Random Plate
          </Text>
        </Pressable>

        {/* Plate colors debug */}
        <View
          style={{
            marginTop: spacing.lg,
            flexDirection: "row",
            gap: spacing.sm,
          }}
        >
          {(
            ["background", "text", "accent"] as Array<
              keyof typeof state.plate_colors
            >
          ).map((key) => (
            <View
              key={key}
              style={{
                alignItems: "center",
                gap: spacing.xs,
              }}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: borderRadius.sm,
                  backgroundColor: state.plate_colors[key],
                  borderWidth: 1,
                  borderColor: colors.textMuted,
                }}
              />
              <Text
                style={{
                  fontSize: typography.fontSize.xs,
                  color: colors.textMuted,
                }}
              >
                {key}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
