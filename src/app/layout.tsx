import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";
import { Providers } from "@/components";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://teslo-shop-h81v8ze8c-brunotorneses-projects.vercel.app/"
  ),
  title: {
    template: "%s - Teslo | Shop",
    default: "Home - Teslo | Shop",
  },
  description: "Shop virtual of Tesla products",
  openGraph: {
    title: "Shop virtual of Tesla products",
    description: "Explore our exclusive Tesla merchandise",
    images: [
      {
        url: "/path/to/your/image.jpg",
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop virtual of Tesla products",
    description: "Explore our exclusive Tesla merchandise",
    images: ["/path/to/your/image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
