import { useState, useCallback } from 'react';
import { DragState, Element } from '../types/elements';

export const useDrag = (zoom: number, setElements: React.Dispatch<React.SetStateAction<Element[]>>) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    elementId: null,
    startX: 0,
    startY: 0,
    elementStartX: 0,
    elementStartY: 0,
  });

  const handleMouseDown = useCallback((e: MouseEvent, element: Element) => {
    setDragState({
      isDragging: true,
      elementId: element.id,
      startX: e.clientX,
      startY: e.clientY,
      elementStartX: element.x,
      elementStartY: element.y,
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging) return;

    const deltaX = (e.clientX - dragState.startX) / zoom;
    const deltaY = (e.clientY - dragState.startY) / zoom;

    setElements(elements => elements.map(el =>
      el.id === dragState.elementId
        ? {
            ...el,
            x: dragState.elementStartX + deltaX,
            y: dragState.elementStartY + deltaY,
          }
        : el
    ));
  }, [dragState, zoom, setElements]);

  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      elementId: null,
      startX: 0,
      startY: 0,
      elementStartX: 0,
      elementStartY: 0,
    });
  }, []);

  return {
    dragState,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}; 