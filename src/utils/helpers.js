// Utility functions
export const scrollToId = (id) => {
  const el = typeof document !== 'undefined' ? document.getElementById(id) : null;
  if (el) {
    el.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });
  }
};

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

export const useParallax = (value, distance) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};