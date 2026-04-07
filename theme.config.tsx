import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: (
    <div className="flex items-center gap-2">
       <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-black font-black">C</div>
       <span className="font-black tracking-tighter uppercase italic">Coderaf <span className="text-emerald-500">HUB</span></span>
    </div>
  ),
  project: {
    link: "https://github.com/coderafroj/coderafroj",
  },
  chat: {
    link: "https://discord.gg/coderafroj",
  },
  docsRepositoryBase: "https://github.com/coderafroj/coderafroj/tree/main",
  footer: {
    content: (
      <span>
        {new Date().getFullYear()} ©{" "}
        <a href="https://koderafroj.vercel.app" target="_blank">
          Coderafroj
        </a>
        . Built with Nextra + Appwrite.
      </span>
    ),
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Coderaf HUB Documentation" />
      <meta property="og:description" content="High-power documentation for the Coderafroj ecosystem." />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Coderaf HUB',
    }
  },
  banner: {
    key: '2.0-release',
    content: (
      <a href="/admin/notes" target="_blank">
        🚀 Coderaf HUB v2.0 is out! Check out the new Admin Panel.
      </a>
    )
  }
};

export default config;
