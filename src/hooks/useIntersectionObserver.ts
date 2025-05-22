import { useEffect, useRef } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  setActiveSection: (sectionId: string) => void,
  sectionId: string,
  options?: IntersectionObserverOptions
) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActiveSection(sectionId);
        if (options?.freezeOnceVisible) {
          observer.unobserve(entry.target);
        }
      }
    }, options);

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [setActiveSection, sectionId, options]);

  return elementRef;
}

export default useIntersectionObserver; 