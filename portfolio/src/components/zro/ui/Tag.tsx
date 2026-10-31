import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return <span className="zro-chip">{children}</span>;
}
