import Image from "next/image";
import type { ComponentProps } from "react";

type LogoVariant = "default" | "white";

type LogoProps = {
  variant?: LogoVariant;
  width?: number;
  height?: number;
  priority?: boolean;
} & Pick<ComponentProps<"img">, "className">;

const LOGO_SRC: Record<LogoVariant, string> = {
  default: "/images/logo.png",
  white: "/images/logo-white.png",
};

export default function Logo({
  variant = "default",
  width = 160,
  height = 40,
  className,
  priority = false,
}: LogoProps) {
  return (
    <Image
      src={LOGO_SRC[variant]}
      alt={variant === "white" ? "Tropify logo (white)" : "Tropify logo"}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}

