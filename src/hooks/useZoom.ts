import { useState, useCallback } from 'react';
import { WheelEvent } from 'react';

export const useZoom = () => {
  const [zoom, setZoom] = useState(1);

  const handleWheel = useCallback((e: WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = -e.deltaY;
      const zoomFactor = 0.005;
      setZoom(z => Math.min(Math.max(z + (delta * zoomFactor), 0.5), 2));
    }
  }, []);

  const zoomIn = useCallback(() => {
    setZoom(z => Math.min(z + 0.1, 2));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom(z => Math.max(z - 0.1, 0.5));
  }, []);

  return {
    zoom,
    handleWheel,
    zoomIn,
    zoomOut
  };
}; 