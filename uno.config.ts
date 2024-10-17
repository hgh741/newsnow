import { defineConfig, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from "unocss"
import { hex2rgba } from "@unocss/rule-utils"
import { sources } from "./shared/sources"

export default defineConfig({
  mergeSelectors: false,
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
    }),
  ],
  rules: [
    [/^sprinkle-(.+)$/, ([_, d], { theme }) => {
      // @ts-expect-error >_<
      if (theme.colors[d]) {
        // @ts-expect-error >_<
        const hex: any = theme.colors[d]?.[400]
        if (hex) {
          return {
            "background-image": `radial-gradient(ellipse 80% 80% at 50% -30%,
         rgba(${hex2rgba(hex)?.join(", ")}, 0.3), rgba(255, 255, 255, 0));`,
          }
        }
      }
    }],
    [
      "font-brand",
      {
        "font-family": `"Baloo 2", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace; `,
      },
    ],
  ],
  shortcuts: {
    "color-base": "color-neutral-800 dark:color-neutral-300",
    "bg-base": "bg-white dark:bg-dark-600",
    "btn": "op50 hover:op85",
  },
  safelist: [
    ...["bg", "color", "border", "sprinkle", "shadow"].map(t => [...Object.values(sources)].map(c => `${t}-${c.color}`)).flat(1),
  ],
  extendTheme: (theme) => {
    // @ts-expect-error >_<
    theme.colors.primary = theme.colors.red
    return theme
  },
})
