import { VercelLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ModeToggle } from "~/components/mode-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-2 flex items-center md:mr-6 md:space-x-2">
          <VercelLogoIcon className="size-4" aria-hidden="true" />
        </Link>
        <nav className="flex flex-1 items-center md:justify-end">
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
