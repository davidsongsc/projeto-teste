import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry"; // Adicione isto
import ThemeProvider from "@/src/theme/providers/ThemeProvider";
import Header from "@/src/components/Header";
import { AuthModal } from "@/src/components/Auth/AuthModal";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema ERP Teste",
  description: "Sistema de cadastro de vendas e produtos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <AntdRegistry>
          <ThemeProvider>
            <AuthModal />
            <Header />
            <main className="flex-grow">{children}</main>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}