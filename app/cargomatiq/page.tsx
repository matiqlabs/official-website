import type { Metadata } from "next";
import { CargoMatiqPage } from "@/components/CargoMatiqPage";
import siteCopy from "@/lib/site-copy.json";

export const metadata: Metadata = {
  title: siteCopy.meta.cargoTitle,
  description: siteCopy.meta.cargoDescription,
  alternates: { canonical: "/cargomatiq" },
  openGraph: {
    type: "website",
    title: siteCopy.meta.cargoTitle,
    description: siteCopy.meta.cargoDescription,
    url: "/cargomatiq",
    images: ["/cargomatiq-showcase.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteCopy.meta.cargoTitle,
    description: siteCopy.meta.cargoDescription,
    images: ["/cargomatiq-showcase.png"],
  },
};

export default function Page() {
  return <CargoMatiqPage />;
}
