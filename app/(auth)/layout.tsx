import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="h-full grid place-items-center">{children}</div>;
}
