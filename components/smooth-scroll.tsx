"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import "lenis/dist/lenis.css";

type SmoothScrollContextValue = {
  lenis: Lenis | null;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    let instance: Lenis | null = null;

    const sync = () => {
      instance?.destroy();
      instance = null;
      setLenis(null);

      if (!media.matches) return;

      instance = new Lenis({
        autoRaf: true,
        lerp: 0.055,
        wheelMultiplier: 0.85,
      });
      setLenis(instance);
    };

    sync();
    media.addEventListener("change", sync);

    return () => {
      media.removeEventListener("change", sync);
      instance?.destroy();
      setLenis(null);
    };
  }, []);

  const value = useMemo(() => ({ lenis }), [lenis]);

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
