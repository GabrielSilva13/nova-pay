"use client";

import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { AppHeader } from "@/components/common/app-header";
import { useAuth } from "@/features/auth/hooks/use-auth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, router, pathname]);

  if (!isAuthenticated) {
    return (
      <div
        className="p-6 text-sm text-[color:var(--color-muted)]"
        aria-live="polite"
      >
        Redirecionando…
      </div>
    );
  }

  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
