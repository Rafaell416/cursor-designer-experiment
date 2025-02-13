import { useState, useCallback } from 'react';
import { ResizeState, Element } from '../types/elements';

export const useResize = (zoom: number, setElements: React.Dispatch<React.SetStateAction<Element[]>>) => {
  const [resizeState, setResizeState] = useState<ResizeState>({
    isResizing: false,
    elementId: null,
    direction: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
  });

  const handleResizeStart = useCallback((e: MouseEvent, element: Element, direction: ResizeState['direction']) => {
    e.stopPropagation();
    setResizeState({
      isResizing: true,
      elementId: element.id,
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: element.style?.width || 0,
      startHeight: element.style?.height || 0,
    });
  }, []);

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizeState.isResizing || !resizeState.direction) return;

    const deltaX = (e.clientX - resizeState.startX) / zoom;
    const deltaY = (e.clientY - resizeState.startY) / zoom;

    setElements(elements => elements.map(el => {
      if (el.id !== resizeState.elementId) return el;

      const newStyle = { ...el.style };
      if (!newStyle) return el;

      switch (resizeState.direction) {
        case 'e':
          newStyle.width = Math.max(10, resizeState.startWidth + deltaX);
          break;
        case 'w':
          newStyle.width = Math.max(10, resizeState.startWidth - deltaX);
          if (newStyle.width !== resizeState.startWidth - deltaX) {
            return el;
          }
          el.x += deltaX;
          break;
        case 's':
          newStyle.height = Math.max(10, resizeState.startHeight + deltaY);
          break;
        case 'n':
          newStyle.height = Math.max(10, resizeState.startHeight - deltaY);
          if (newStyle.height !== resizeState.startHeight - deltaY) {
            return el;
          }
          el.y += deltaY;
          break;
        case 'ne':
          newStyle.width = Math.max(10, resizeState.startWidth + deltaX);
          newStyle.height = Math.max(10, resizeState.startHeight - deltaY);
          if (newStyle.height !== resizeState.startHeight - deltaY) {
            return el;
          }
          el.y += deltaY;
          break;
        case 'nw':
          newStyle.width = Math.max(10, resizeState.startWidth - deltaX);
          newStyle.height = Math.max(10, resizeState.startHeight - deltaY);
          if (newStyle.width !== resizeState.startWidth - deltaX || 
              newStyle.height !== resizeState.startHeight - deltaY) {
            return el;
          }
          el.x += deltaX;
          el.y += deltaY;
          break;
        case 'se':
          newStyle.width = Math.max(10, resizeState.startWidth + deltaX);
          newStyle.height = Math.max(10, resizeState.startHeight + deltaY);
          break;
        case 'sw':
          newStyle.width = Math.max(10, resizeState.startWidth - deltaX);
          newStyle.height = Math.max(10, resizeState.startHeight + deltaY);
          if (newStyle.width !== resizeState.startWidth - deltaX) {
            return el;
          }
          el.x += deltaX;
          break;
      }

      return { ...el, style: newStyle };
    }));
  }, [resizeState, zoom, setElements]);

  const handleResizeEnd = useCallback(() => {
    setResizeState({
      isResizing: false,
      elementId: null,
      direction: null,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0,
    });
  }, []);

  return {
    resizeState,
    handleResizeStart,
    handleResizeMove,
    handleResizeEnd,
  };
}; 