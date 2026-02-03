'use client';
import React from 'react';
import { useTransitions } from './TransitionProvider';

export default function TransitionLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
    const { go } = useTransitions();

    return (
        <a
            href={href}
            className={className}
            onClick={(e) => {
                if (href.startsWith('/')) {
                    e.preventDefault();
                    go(href);
                }
            }}
        >
            {children}
        </a>
    );
}
