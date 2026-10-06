import { Bodoni_Moda, Instrument_Sans, Martian_Mono } from "next/font/google";

const display = Bodoni_Moda({
  variable: "--na-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});
const sans = Instrument_Sans({ variable: "--na-sans", subsets: ["latin"], axes: ["wdth"] });
const mono = Martian_Mono({ variable: "--na-mono", subsets: ["latin"], axes: ["wdth"] });

export const nightFonts = `${display.variable} ${sans.variable} ${mono.variable}`;
