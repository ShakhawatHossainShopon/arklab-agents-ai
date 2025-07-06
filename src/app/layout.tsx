import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { Providers } from "@/store/provider";
import { AuthProvider } from "./../context/AuthContext";

export const metadata: Metadata = {
  title: "ArkLab - Mock Project For Interns",
  description: "ArkLab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <body>
          <AuthProvider>
            <Providers>
              <Navbar />
              {children}
            </Providers>
          </AuthProvider>
        </body>
      </body>
    </html>
  );
}
