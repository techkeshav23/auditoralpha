import { Archivo, Azeret_Mono } from "next/font/google";

const sans = Archivo({ variable: "--bn-sans", subsets: ["latin"], axes: ["wdth"] });
const mono = Azeret_Mono({ variable: "--bn-mono", subsets: ["latin"] });

export const numberFonts = `${sans.variable} ${mono.variable}`;
