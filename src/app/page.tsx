import Link from "next/link";
import { Box } from "@/app/(components)/box";
import { data } from "@/app/data";

export default function Home() {
  return (
    <main className="mx-auto max-w-screen-md px-5">
      <div id="grid" className="grid grid-cols-2 py-20 gap-5 md:gap-10">
        {data.map((item) => (
          <Link
            key={item.name}
            href={`/p/${item.name}`}
            className="aspect-video"
          >
            <Box color={item.color}>{item.name}</Box>
          </Link>
        ))}
      </div>
    </main>
  );
}
