'use client';

import React, {
    forwardRef,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import gsap from 'gsap';

type PlayOptions = {
    color?: string;
    duration?: number;
};

export type LiquidWipeHandle = {
    cover: (opts?: PlayOptions) => Promise<void>;
    reveal: (opts?: Omit<PlayOptions, 'color'>) => Promise<void>;
};

function prefersReducedMotion() {
    return typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
}

export const LiquidWipe = forwardRef<LiquidWipeHandle, { defaultColor?: string }>(
    function LiquidWipe({ defaultColor = '#0b0b0b' }, ref) {
        const [active, setActive] = useState(false);
        const [color, setColor] = useState(defaultColor);

        const rootRef = useRef<HTMLDivElement | null>(null);

        const cMain = useRef<SVGCircleElement | null>(null);
        const c1 = useRef<SVGCircleElement | null>(null);
        const c2 = useRef<SVGCircleElement | null>(null);
        const c3 = useRef<SVGCircleElement | null>(null);
        const c4 = useRef<SVGCircleElement | null>(null);
        const c5 = useRef<SVGCircleElement | null>(null);

        const tlRef = useRef<gsap.core.Timeline | null>(null);

        useLayoutEffect(() => {
            // Prep initial hidden state
            if (!rootRef.current) return;
            gsap.set(rootRef.current, { autoAlpha: 0 });
        }, []);

        function lockPage(locked: boolean) {
            if (typeof document === 'undefined') return;
            const el = document.documentElement;
            if (locked) el.dataset.transitioning = '1';
            else delete el.dataset.transitioning;
        }

        function setInitialBlob() {
            // Coordinates in a 0..100 viewBox
            const setCircle = (el: SVGCircleElement | null, cx: number, cy: number, r: number) => {
                if (!el) return;
                el.setAttribute('cx', String(cx));
                el.setAttribute('cy', String(cy));
                el.setAttribute('r', String(r));
            };

            // Start clustered near top-left, mostly offscreen so it "washes in" from corner
            setCircle(cMain.current, -10, 10, 0);

            setCircle(c1.current, -5, 18, 6);
            setCircle(c2.current, 8, 6, 4);
            setCircle(c3.current, 14, 22, 5);
            setCircle(c4.current, 2, 30, 3);
            setCircle(c5.current, 20, 10, 4);
        }

        function buildCoverTimeline(duration: number) {
            const tl = gsap.timeline();

            // Fade overlay in immediately
            if (rootRef.current) tl.set(rootRef.current, { autoAlpha: 1 });

            // Main blob expands and moves, eventually covering everything
            tl.to(
                cMain.current,
                {
                    attr: { cx: 50, cy: 50, r: 150 }, // r big enough to cover full screen from centerish
                    duration,
                    ease: 'power2.inOut',
                },
                0
            );

            // Droplets drift a bit to create organic edge motion
            tl.to(
                c1.current,
                { attr: { cx: 10, cy: 20, r: 10 }, duration: duration * 0.9, ease: 'power2.inOut' },
                0.05
            );
            tl.to(
                c2.current,
                { attr: { cx: 22, cy: 8, r: 8 }, duration: duration * 0.9, ease: 'power2.inOut' },
                0.08
            );
            tl.to(
                c3.current,
                { attr: { cx: 28, cy: 26, r: 9 }, duration: duration * 0.9, ease: 'power2.inOut' },
                0.06
            );
            tl.to(
                c4.current,
                { attr: { cx: 16, cy: 34, r: 7 }, duration: duration * 0.9, ease: 'power2.inOut' },
                0.1
            );
            tl.to(
                c5.current,
                { attr: { cx: 34, cy: 12, r: 8 }, duration: duration * 0.9, ease: 'power2.inOut' },
                0.07
            );

            return tl;
        }

        function buildRevealTimeline(duration: number) {
            const tl = gsap.timeline();

            // Pull the blob off to the bottom-right and shrink it
            tl.to(cMain.current, {
                attr: { cx: 120, cy: 120, r: 0 },
                duration,
                ease: 'power2.inOut',
            });

            // Fade overlay out at the end
            if (rootRef.current) tl.to(rootRef.current, { autoAlpha: 0, duration: 0.15 }, '>-0.05');

            return tl;
        }

        useImperativeHandle(ref, () => ({
            cover: async (opts?: PlayOptions) => {
                const duration = Math.max(0.35, opts?.duration ?? 0.9);
                if (prefersReducedMotion()) {
                    setColor(opts?.color ?? defaultColor);
                    setActive(true);
                    lockPage(true);
                    if (rootRef.current) gsap.set(rootRef.current, { autoAlpha: 1 });
                    return;
                }

                setColor(opts?.color ?? defaultColor);
                setActive(true);
                lockPage(true);
                setInitialBlob();

                tlRef.current?.kill();
                tlRef.current = buildCoverTimeline(duration);

                await new Promise<void>((resolve) => {
                    tlRef.current?.eventCallback('onComplete', () => resolve());
                });
            },

            reveal: async (opts?: Omit<PlayOptions, 'color'>) => {
                const duration = Math.max(0.3, opts?.duration ?? 0.7);
                if (prefersReducedMotion()) {
                    lockPage(false);
                    setActive(false);
                    if (rootRef.current) gsap.set(rootRef.current, { autoAlpha: 0 });
                    return;
                }

                tlRef.current?.kill();
                tlRef.current = buildRevealTimeline(duration);

                await new Promise<void>((resolve) => {
                    tlRef.current?.eventCallback('onComplete', () => {
                        lockPage(false);
                        setActive(false);
                        resolve();
                    });
                });
            },
        }));

        // Render even when inactive so it’s ready instantly
        return (
            <div
                ref={rootRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 2147483647, // Max int to defeat all other layers (Lenis/Next defaults)
                    pointerEvents: active ? 'all' : 'none',
                    visibility: active ? 'visible' : 'hidden', // Explicit visibility
                }}
                aria-hidden
            >
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        {/* Goo + wobble edge */}
                        <filter id="liquidFilter">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 28 -12"
                                result="goo"
                            />
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.015"
                                numOctaves={2}
                                seed={2}
                                result="noise"
                            >
                                <animate
                                    attributeName="baseFrequency"
                                    dur="1.2s"
                                    values="0.012;0.02;0.012"
                                    repeatCount="indefinite"
                                />
                            </feTurbulence>
                            <feDisplacementMap
                                in="goo"
                                in2="noise"
                                scale="10"
                                xChannelSelector="R"
                                yChannelSelector="G"
                                result="displaced"
                            />
                            <feComposite in="displaced" in2="displaced" operator="over" />
                        </filter>

                        <mask id="liquidMask">
                            <rect width="100" height="100" fill="black" />
                            <g filter="url(#liquidFilter)">
                                <circle ref={cMain} fill="white" />
                                <circle ref={c1} fill="white" />
                                <circle ref={c2} fill="white" />
                                <circle ref={c3} fill="white" />
                                <circle ref={c4} fill="white" />
                                <circle ref={c5} fill="white" />
                            </g>
                        </mask>
                    </defs>

                    {/* This is the paint layer */}
                    <rect width="100" height="100" fill={color} mask="url(#liquidMask)" />
                </svg>
            </div>
        );
    }
);
