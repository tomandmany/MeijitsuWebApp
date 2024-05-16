import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "本祭シフト",
  description: "明大祭本祭のシフトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
