"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";

type HugeIconProps = Omit<
  ComponentProps<typeof HugeiconsIcon>,
  "primaryColor" | "secondaryColor"
> & {
  primaryColor?: string;
  secondaryColor?: string;
};

/** Always render Hugeicons in duotone (primary + secondary). */
export function HugeIcon({
  primaryColor = "currentColor",
  secondaryColor = "color-mix(in srgb, currentColor 35%, transparent)",
  strokeWidth = 1.5,
  size = 28,
  disableSecondaryOpacity = true,
  ...rest
}: HugeIconProps) {
  return (
    <HugeiconsIcon
      size={size}
      strokeWidth={strokeWidth}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      disableSecondaryOpacity={disableSecondaryOpacity}
      {...rest}
    />
  );
}
