import { Layout } from "@/processes/app-layout/ui/Layout";
import "@/app/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "test-h2o",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
