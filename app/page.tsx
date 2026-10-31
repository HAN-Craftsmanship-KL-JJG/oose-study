"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PAGES } from "@/lib/pages";
import { savedPlace } from "@/lib/resume";

const FIRST_PAGE = "/uml-symbols";

/** The site has no start page: it continues where the reader left off, or at the first page. */
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const saved = savedPlace()?.path;
    router.replace(saved && PAGES.some((p) => p.href === saved) ? saved : FIRST_PAGE);
  }, [router]);

  return (
    <p>
      <Link href={FIRST_PAGE}>Start reading</Link>
    </p>
  );
}
