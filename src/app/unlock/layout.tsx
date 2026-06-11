import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Unlock SafeJSON Pro",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UnlockLayout({ children }: { children: ReactNode }) {
  return children;
}
