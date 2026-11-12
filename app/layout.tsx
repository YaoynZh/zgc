import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "无人驾驶复杂威胁场景展示平台",
  description: "ScenGE、DriveArena、ThreatRange 与 ChatScene 四种场景生成方法的本地成果展示平台",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
