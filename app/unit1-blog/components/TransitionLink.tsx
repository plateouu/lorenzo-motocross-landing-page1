"use client";

import Link from "next/link";

type TransitionLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export default function TransitionLink({ href, children, className, style, onClick }: TransitionLinkProps) {
  return (
    <Link href={href} onClick={onClick} className={className} style={style}>
      {children}
    </Link>
  );
}
