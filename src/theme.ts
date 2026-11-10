import { useCallback, useEffect, useState } from "react";
import type { Variants } from "framer-motion";

// Palette et typographies partagées par toutes les sections du portfolio.
// Les couleurs pointent vers des variables CSS définies dans src/index.css :
// le changement de thème est donc instantané, sans re-render des composants.
// Thème sombre par défaut : "Graphite & Cuivre".
export const colors = {
  canvas: "var(--color-canvas)",
  blobOrange: "var(--color-blob-orange)",
  blobViolet: "var(--color-blob-violet)",
  card: "var(--color-card)",
  cardSoft: "var(--color-card-soft)",
  ink: "var(--color-ink)",
  inkSoft: "var(--color-ink-soft)",
  inkFaint: "var(--color-ink-faint)",
  textLight: "var(--color-text-light)",
  textMuted: "var(--color-text-muted)",
  textFaint: "var(--color-text-faint)",
  lineLight: "var(--color-line-light)",
  accent: "var(--color-accent)",
  accentDeep: "var(--color-accent-deep)",
  accentSoft: "var(--color-accent-soft)",
  line: "var(--color-line)",
  editorBg: "var(--color-editor-bg)",
  editorBar: "var(--color-editor-bar)",
  success: "var(--color-success)",
  successDeep: "var(--color-success-deep)",
  // Variantes translucides : color-mix évite de concaténer un canal alpha
  // à une valeur CSS var (ce qui produirait une couleur invalide).
  canvasGlass: "color-mix(in srgb, var(--color-canvas) 80%, transparent)",
  glass: "color-mix(in srgb, var(--color-card) 70%, transparent)",
  accentGlow: "color-mix(in srgb, var(--color-accent) 67%, transparent)",
  successGlow: "color-mix(in srgb, var(--color-success) 67%, transparent)",
} as const;

export type ThemeName = "dark" | "light";

const THEME_STORAGE_KEY = "daladev-theme";

export function getStoredTheme(): ThemeName {
  if (typeof window === "undefined") return "dark";

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // localStorage peut être indisponible (navigation privée, restrictions)
  }

  return "dark";
}

export function applyTheme(theme: ThemeName) {
  if (typeof document === "undefined") return;

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // On ignore l'échec de persistance : le thème reste appliqué pour la session
  }
}

export function initTheme(): ThemeName {
  const theme = getStoredTheme();
  applyTheme(theme);
  return theme;
}

/**
 * Applique le thème initial avant le rendu React (voir main.tsx),
 * puis expose un hook pour basculer clair/sombre depuis la navbar.
 */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeName>(() => getStoredTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}

export const fonts = {
  display: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

// Import Google Fonts réutilisé par les composants qui injectent leurs styles.
export const fontImport =
  "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');";

// Animations d'apparition communes, réutilisées par les sections.
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1 },
};

// Conteneur + enfant pour les apparitions en cascade (grilles, listes).
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export const viewportOnce = { once: true, amount: 0.2 } as const;

export const hoverLift = {
  y: -5,
  transition: { duration: 0.25, ease: "easeOut" },
} as const;
