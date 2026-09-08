import { useRef, useState } from 'react';

const tags = {
  button: 'button',
  article: 'article',
  div: 'div',
};

function canAnimate() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(hover: hover)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export default function SpotlightCard({
  as = 'div',
  className = '',
  children,
  ...props
}) {
  const ref = useRef(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0, lift: 0 });
  const Tag = tags[as] || 'div';

  const onMove = (event) => {
    if (!canAnimate() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setSpot({ x: px * 100, y: py * 100 });
    setTilt({
      x: (py - 0.5) * -9,
      y: (px - 0.5) * 11,
      lift: -8,
    });
  };

  const onLeave = () => setTilt({ x: 0, y: 0, lift: 0 });

  return (
    <Tag
      ref={ref}
      {...props}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`spotlight-card group ${className}`}
      style={{
        '--spot-x': `${spot.x}%`,
        '--spot-y': `${spot.y}%`,
        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${tilt.lift}px)`,
      }}
    >
      <span className="spotlight-card__border" aria-hidden="true" />
      <span className="spotlight-card__glow" aria-hidden="true" />
      <span className="spotlight-card__body">{children}</span>
    </Tag>
  );
}
