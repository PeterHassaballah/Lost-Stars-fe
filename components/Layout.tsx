import Link from 'next/link';
import { PropsWithChildren } from 'react';

type LayoutProps = PropsWithChildren<{
  title?: string;
}>;

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-surface text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-semibold tracking-wide text-violet-300">
            Lost Stars Studio
          </Link>
          <nav aria-label="Primary" className="flex gap-4 text-sm font-medium sm:gap-6">
            <Link href="/" className="hover:text-violet-300">
              Home
            </Link>
            <a href="/#about" className="hover:text-violet-300">
              About
            </a>
            <a href="/#films" className="hover:text-violet-300">
              Films
            </a>
            <a href="/#contact" className="hover:text-violet-300">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-800 bg-slate-950/90">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-400 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Lost Stars Studio. All rights reserved.</p>
          <p className="text-xs text-slate-500">Made for cinematic stories and accessible browsing.</p>
        </div>
      </footer>
    </div>
  );
}
