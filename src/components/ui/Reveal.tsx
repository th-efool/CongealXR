import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  isStaggerGroup?: boolean;
  isStaggerItem?: boolean;
  as?: React.ElementType;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  isStaggerGroup = false,
  isStaggerItem = false,
  as: Component = 'div',
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const baseClass = isStaggerGroup ? 'stagger-group' : (isStaggerItem ? 'stagger-item' : 'reveal');

  return (
    <Component
      ref={ref}
      className={clsx(baseClass, isVisible && 'is-visible', className)}
      style={!isStaggerGroup && delay ? { transitionDelay: `${delay}s`, ...style } : style}
      {...props}
    >
      {children}
    </Component>
  );
}
