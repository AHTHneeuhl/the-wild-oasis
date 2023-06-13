import { useEffect, useRef } from "react";

type AnyEvent = MouseEvent | TouchEvent;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  handler: (event: AnyEvent) => void
) => {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const listener = (event: AnyEvent) => {
      const elem = containerRef?.current;
      if (!elem || elem.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);

    return () => {
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };
  }, [containerRef, handler]);

  return containerRef;
};

export default useOnClickOutside;
