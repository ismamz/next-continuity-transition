import { Box } from "@/app/(components)/box";
import Link from "next/link";

const colors: { [key: string]: string } = {
  a: "bg-red-500",
  b: "bg-blue-500",
  c: "bg-green-500",
  d: "bg-yellow-500",
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <main className="container mx-auto">
      <div className="py-10">
        <Link href="/">← back to list</Link>
      </div>

      <Box color={colors[id] as string} id="final" data-flip-id="test">
        {id}
      </Box>
    </main>
  );
}
