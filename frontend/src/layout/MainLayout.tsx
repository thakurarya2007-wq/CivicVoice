import type { ReactNode } from "react";

import TopBar from "../components/layout/TopBar";

type Props = {
  children: ReactNode;
};

export default function MainLayout({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-50">

      <TopBar />

      <main className="mx-auto max-w-7xl p-6">
        {children}
      </main>

    </div>
  );
}