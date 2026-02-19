import Link from "next/link";

const links = [
  { href: "/create", label: "Start" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "Over" },
  { href: "/privacy", label: "Privacy" }
];

export function SiteHeader() {
  return (
    <header className="mx-auto w-full max-w-6xl px-4 pt-6 md:px-8">
      <nav className="glass flex items-center justify-between rounded-3xl px-5 py-3">
        <Link href="/" className="text-sm font-semibold tracking-wide">
          MrHutch
        </Link>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-xl px-2 py-1 hover:bg-white/70 focus-visible:ring-2">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
