"use client";

import * as React from 'react';
import { useRef, useEffect } from 'react';

interface FadeContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: Element | string | null;
  blur?: boolean;
  disableOnMobile?: boolean;
  duration?: number;
  ease?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  yOffset?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  container,
  blur = false,
  disableOnMobile = true,
  duration = 1000,
  ease = 'power2.out',
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  yOffset = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power2.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  style,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobileViewport =
      disableOnMobile && window.matchMedia('(max-width: 767px)').matches;

    if (reduceMotion || mobileViewport) {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      el.style.filter = 'none';
      el.style.transform = 'none';
      return;
    }

    let active = true;
    let cleanup = () => {};

    async function initAnimation() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger')
      ]);

      if (!active || !ref.current) return;

      gsap.registerPlugin(ScrollTrigger);

      let scrollerTarget: Element | string | null = container || document.getElementById('snap-main-container') || null;

      if (typeof scrollerTarget === 'string') {
        scrollerTarget = document.querySelector(scrollerTarget);
      }

      const startPct = (1 - threshold) * 100;
      const getSeconds = (val: number) => (val > 10 ? val / 1000 : val);

      gsap.set(el, {
        autoAlpha: initialOpacity,
        filter: blur ? 'blur(10px)' : 'blur(0px)',
        y: yOffset,
        willChange: 'opacity, filter, transform'
      });

      const tl = gsap.timeline({
        paused: true,
        delay: getSeconds(delay),
        onComplete: () => {
          if (onComplete) onComplete();
          if (disappearAfter > 0) {
            gsap.to(el, {
              autoAlpha: initialOpacity,
              filter: blur ? 'blur(10px)' : 'blur(0px)',
              y: yOffset,
              delay: getSeconds(disappearAfter),
              duration: getSeconds(disappearDuration),
              ease: disappearEase,
              onComplete: () => onDisappearanceComplete?.()
            });
          }
        }
      });

      tl.to(el, {
        autoAlpha: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: getSeconds(duration),
        ease: ease
      });

      const st = ScrollTrigger.create({
        trigger: el,
        scroller: scrollerTarget || window,
        start: `top ${startPct}%`,
        once: true,
        onEnter: () => tl.play()
      });

      cleanup = () => {
        st.kill();
        tl.kill();
        gsap.killTweensOf(el);
      };
    }

    initAnimation();

    return () => {
      active = false;
      cleanup();
    };
  }, [
    blur,
    container,
    delay,
    disableOnMobile,
    disappearAfter,
    disappearDuration,
    disappearEase,
    duration,
    ease,
    initialOpacity,
    onComplete,
    onDisappearanceComplete,
    threshold,
    yOffset,
  ]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: initialOpacity,
        transform: yOffset ? `translateY(${yOffset}px)` : undefined,
        visibility: initialOpacity === 0 ? 'hidden' : undefined,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default FadeContent;
