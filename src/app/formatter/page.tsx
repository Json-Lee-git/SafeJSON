import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter — Format JSON Online | SafeJSON",
  description: "Format and validate JSON online. Free client-side JSON formatter with tree view, error detection, and syntax highlighting. No data upload.",
  alternates: { canonical: "/" },
};

export default function FormatterPage() {
  redirect("/");
}
