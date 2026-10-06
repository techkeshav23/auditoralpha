import type { MetadataRoute } from "next";

/** Installable as a home-screen app: opens full-screen with no browser chrome. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Auditor Alpha",
    short_name: "Auditor Alpha",
    description: "Catch revenue that was closed in HubSpot but never invoiced in Xero.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f6f5f0",
    theme_color: "#f6f5f0",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
