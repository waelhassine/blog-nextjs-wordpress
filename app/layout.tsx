import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/component/navbar";
import Footer from "@/components/component/footer";

// export const metadata: Metadata = {
//   title: "Final Answer",
//   description: "Blog for All News Technologie and lifestyle",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full transition delay-500 duration-500 ease-in-out">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
