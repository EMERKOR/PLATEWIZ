import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@/lib/useTheme";
import type { StateMetadata } from "@/types/content";

interface PlateRendererProps {
  plateText: string;
  state: StateMetadata;
}

export function PlateRenderer({ plateText, state }: PlateRendererProps) {
  const { plate, typography, spacing, borderRadius } = useTheme();

  const plateBackground = state.plate_colors.background || plate.backgroundColor;
  const plateTextColor = state.plate_colors.text || plate.textColor;
  const plateAccent = state.plate_colors.accent;

  // Auto-size text: reduce font size for longer plate text
  const baseFontSize = plate.fontSize;
  const textLength = plateText.length;
  const fontSize = textLength > 6 ? baseFontSize * (6 / textLength) : baseFontSize;

  return (
    <View
      style={{
        width: plate.width,
        height: plate.height,
        borderRadius: plate.borderRadius,
        borderWidth: plate.borderWidth,
        borderColor: plate.borderColor,
        backgroundColor: plateBackground,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        ...(plate.embossedShadow
          ? {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 8,
            }
          : {}),
      }}
    >
      {/* State name at top */}
      <View
        style={{
          position: "absolute",
          top: spacing.sm,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.bold,
            color: plateAccent || plateTextColor,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {state.state_name}
        </Text>
      </View>

      {/* Plate text (main) */}
      <Text
        style={{
          fontSize,
          fontWeight: typography.fontWeight.black,
          fontFamily: typography.fontFamily.plate,
          color: plateTextColor,
          letterSpacing: 4,
          textTransform: "uppercase",
          ...(plate.embossedShadow
            ? {
                textShadowColor: "rgba(0,0,0,0.15)",
                textShadowOffset: { width: 1, height: 2 },
                textShadowRadius: 1,
              }
            : {}),
        }}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {plateText}
      </Text>

      {/* Slogan at bottom */}
      {state.slogan ? (
        <View
          style={{
            position: "absolute",
            bottom: spacing.sm,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: typography.fontSize.xs,
              fontWeight: typography.fontWeight.medium,
              color: plateAccent || plateTextColor,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {state.slogan}
          </Text>
        </View>
      ) : null}

      {/* Registration dot accents */}
      <View
        style={{
          position: "absolute",
          left: spacing.sm,
          top: "50%",
          width: 6,
          height: 6,
          borderRadius: borderRadius.full,
          backgroundColor: plateAccent || plateTextColor,
          opacity: 0.4,
        }}
      />
      <View
        style={{
          position: "absolute",
          right: spacing.sm,
          top: "50%",
          width: 6,
          height: 6,
          borderRadius: borderRadius.full,
          backgroundColor: plateAccent || plateTextColor,
          opacity: 0.4,
        }}
      />
    </View>
  );
}
