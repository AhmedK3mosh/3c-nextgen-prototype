import { notFound } from "next/navigation";
import PrototypeScreen from "@/components/PrototypeScreen";

const screens = ["landing","assessment","profile","path","today","coach","projects","parent"] as const;
type Screen = typeof screens[number];

export default async function Page({ params }: { params: Promise<{ screen: string }> }) {
  const { screen } = await params;
  if (!screens.includes(screen as Screen)) notFound();
  return <PrototypeScreen screen={screen as Screen} />;
}
