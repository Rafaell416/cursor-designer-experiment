import { useState, useCallback } from 'react';
import { CanvasState } from '../types/elements';

export const useCanvas = () => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    x: 0,
    y: 0,
    isPanning: false,
    startX: 0,
    startY: 0,
  });
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if (isSpacePressed && e.button === 0) {
      e.preventDefault();
      setCanvasState(prev => ({
        ...prev,
        isPanning: true,
        startX: e.clientX,
        startY: e.clientY,
      }));
    }
  }, [isSpacePressed]);

  const handleCanvasMouseMove = useCallback((e: React.MouseEvent) => {
    if (canvasState.isPanning) {
      const deltaX = e.clientX - canvasState.startX;
      const deltaY = e.clientY - canvasState.startY;

      setCanvasState(prev => ({
        ...prev,
        x: prev.x + deltaX,
        y: prev.y + deltaY,
        startX: e.clientX,
        startY: e.clientY,
      }));
    }
  }, [canvasState]);

  const handleCanvasMouseUp = useCallback(() => {
    setCanvasState(prev => ({
      ...prev,
      isPanning: false,
    }));
  }, []);

  return {
    canvasState,
    setCanvasState,
    isSpacePressed,
    setIsSpacePressed,
    handleCanvasMouseDown,
    handleCanvasMouseMove,
    handleCanvasMouseUp,
  };
}; 