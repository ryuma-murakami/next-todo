import Link from 'next/link';
import type { Metadata } from 'next';
import type { LayoutProps } from '@/lib/type';
import './globals.css';
import { BookCheck, Trash2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Next TODO',
  description: 'A simple TODO application',
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ja">
      <body className="flex min-h-screen">
        <div className="flex min-w-64 flex-col gap-5 p-6">
          <h1 className="text-3xl">Todo App</h1>
          <nav>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  className="flex items-center gap-2 rounded px-5 py-3 bg-blue-400 text-white hover:bg-slate-100"
                  href="/"
                >
                  <BookCheck />
                  タスク一覧
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-2 rounded px-5 py-3 bg-blue-400 text-white hover:bg-slate-100"
                  href="/trash"
                >
                  <Trash2 />
                  ゴミ箱
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <main className="flex-1 overflow-y-auto bg-slate-100">{children}</main>
      </body>
    </html>
  );
}
