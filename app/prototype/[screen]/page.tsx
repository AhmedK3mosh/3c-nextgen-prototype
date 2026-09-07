import { notFound } from "next/navigation";
import ReferenceV3Screen from "@/components/ReferenceV3Screen";

const screens = ["landing","assessment","profile","path","today","coach","projects","parent"] as const;
type Screen = typeof screens[number];

export default async function Page({ params }: { params: Promise<{ screen: string }> }) {
  const { screen } = await params;
  if (!screens.includes(screen as Screen)) notFound();
  return <ReferenceV3Screen screen={screen as Screen} />;
}
