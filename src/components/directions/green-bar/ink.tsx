import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/** One shared rubber-stamp ink filter: rough edges plus speckled gaps where the ink missed. */
export function InkDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <filter id="gb-ink" x="-4%" y="-4%" width="108%" height="108%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" result="warp" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="warp"
          scale="3.2"
          xChannelSelector="R"
          yChannelSelector="G"
          result="rough"
        />
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="11" result="speck" />
        <feColorMatrix
          in="speck"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.6 0 0 0 2.05"
          result="mask"
        />
        <feComposite in="rough" in2="mask" operator="in" />
      </filter>
    </svg>
  );
}

type Kind = "rect" | "pill" | "seal" | "box" | "tag";

/**
 * A rubber-stamp impression. `big` is the main word, `small` the line under it
 * (or the text around the ring for a seal).
 */
export function Stamp({
  kind,
  big,
  small,
  id,
  className,
  style,
}: {
  kind: Kind;
  big: string;
  small?: string;
  id: string;
  className?: string;
  style?: CSSProperties;
}) {
  if (kind === "seal") {
    return (
      <svg viewBox="0 0 200 200" aria-hidden className={cn("gb-stamp", className)} style={style}>
        <g filter="url(#gb-ink)" fill="none" stroke="currentColor">
          <circle cx="100" cy="100" r="92" strokeWidth="6" />
          <circle cx="100" cy="100" r="62" strokeWidth="3" />
          <path id={id} d="M100 100m-77 0a77 77 0 1 1 154 0a77 77 0 1 1 -154 0" stroke="none" />
          <text className="gb-stamp-small" fill="currentColor" stroke="none" fontSize="17" letterSpacing="2.5">
            <textPath href={`#${id}`}>{small}</textPath>
          </text>
          <text
            x="100"
            y="122"
            textAnchor="middle"
            className="gb-stamp-big"
            fill="currentColor"
            stroke="none"
            fontSize="62"
          >
            {big}
          </text>
        </g>
      </svg>
    );
  }

  if (kind === "tag") {
    // A single-line stamp, one printout row tall.
    return (
      <svg viewBox="0 0 340 92" aria-hidden className={cn("gb-stamp", className)} style={style}>
        <g filter="url(#gb-ink)" fill="none" stroke="currentColor">
          <rect x="5" y="5" width="330" height="82" rx="6" strokeWidth="7" />
          <text
            x="170"
            y="66"
            textAnchor="middle"
            className="gb-stamp-big"
            fill="currentColor"
            stroke="none"
            fontSize="56"
            textLength={big.length > 7 ? 296 : undefined}
            lengthAdjust="spacingAndGlyphs"
          >
            {big}
          </text>
        </g>
      </svg>
    );
  }

  const pill = kind === "pill";
  return (
    <svg viewBox="0 0 340 140" aria-hidden className={cn("gb-stamp", className)} style={style}>
      <g filter="url(#gb-ink)" fill="none" stroke="currentColor">
        <rect x="6" y="6" width="328" height="128" rx={pill ? 64 : 6} strokeWidth="7" />
        {kind === "rect" && <rect x="17" y="17" width="306" height="106" rx="2" strokeWidth="2.5" />}
        {kind === "box" && <path d="M6 98h328" strokeWidth="3" />}
        <text
          x="170"
          y={kind === "box" ? 76 : 82}
          textAnchor="middle"
          className="gb-stamp-big"
          fill="currentColor"
          stroke="none"
          fontSize={big.length > 10 ? 50 : 62}
          textLength={big.length > 7 ? 286 : undefined}
          lengthAdjust="spacingAndGlyphs"
        >
          {big}
        </text>
        <text
          x="170"
          y={kind === "box" ? 124 : 112}
          textAnchor="middle"
          className="gb-stamp-small"
          fill="currentColor"
          stroke="none"
          fontSize="17"
          letterSpacing="3"
        >
          {small}
        </text>
      </g>
    </svg>
  );
}
