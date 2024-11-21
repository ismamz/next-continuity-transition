import { Box } from "@/app/box";
import { data } from "@/app/data";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = data.find((o) => o.name === id);

  if (!item) notFound();

  return (
    <main className="mx-auto max-w-screen-md px-5">
      <div className="py-20">
        <Link href="/">← back to list</Link>
      </div>

      <Box color={item.color} id="target" data-flip-id="demo">
        {id}
      </Box>
    </main>
  );
}

export function generateStaticParams() {
  return data.map((item) => ({
    id: item.name,
  }));
}
