import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-[#fbf8f1]/95 backdrop-blur dark:border-stone-800 dark:bg-[#1a1814]/95">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
        <Link
          href="/"
          className="text-base font-medium tracking-wide [font-variant-caps:small-caps]"
        >
          OOSE-DT
        </Link>
      </div>
    </header>
  );
}
