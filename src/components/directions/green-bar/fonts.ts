import { Doto, IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";

const cond = IBM_Plex_Sans_Condensed({ variable: "--gb-cond", subsets: ["latin"], weight: ["500", "600", "700"] });
const sans = IBM_Plex_Sans({ variable: "--gb-sans", subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = IBM_Plex_Mono({ variable: "--gb-mono", subsets: ["latin"], weight: ["400", "500", "600"] });
const dots = Doto({ variable: "--gb-dots", subsets: ["latin"], weight: ["700", "900"] });

export const greenFonts = `${cond.variable} ${sans.variable} ${mono.variable} ${dots.variable}`;
