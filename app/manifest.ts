import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KUNALISTIC — Your Digital Toolbox",
    short_name: "Kunalistic",
    description: "One place. Every little tool. Privacy-first, in-browser utilities.",
    start_url: "/",
    display: "standalone",
    background_color: "#151130",
    theme_color: "#151130",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
