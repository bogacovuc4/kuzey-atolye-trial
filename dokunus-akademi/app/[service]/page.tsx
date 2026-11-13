import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { ServiceView } from "@/components/ServiceView";
import { ChakraMap } from "@/components/ChakraMap";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.filter((s) => s.slug !== "tarot").map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const s = getService((await params).service);
  if (!s) return {};
  return { title: s.title, description: s.seoDescription, alternates: { canonical: `/${s.slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const s = getService((await params).service);
  if (!s || s.slug === "tarot") notFound();
  return <ServiceView s={s}>{s.slug === "enerji-ve-cakra" && <ChakraMap />}</ServiceView>;
}
