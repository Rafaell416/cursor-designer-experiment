import { Element } from '../../types/elements';
import { ResizeState } from '../../types/elements';

interface SquareProps {
  element: Element;
  onMouseDown: (e: React.MouseEvent, element: Element) => void;
  onResizeStart: (e: React.MouseEvent, element: Element, direction: ResizeState['direction']) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
}

export const Square = ({ element, onMouseDown, onResizeStart, onRemove, onEdit }: SquareProps) => {
  return (
    <div 
      className="relative group"
      onMouseDown={(e) => onMouseDown(e, element)}
    >
      <div
        className={`relative ${element?.tailwindClass ? element.tailwindClass : ''}`}
        style={{
          width: `${element.style?.width}px`,
          height: `${element.style?.height}px`,
          backgroundColor: element.style?.backgroundColor,
          borderColor: element.style?.borderColor,
          borderWidth: `${element.style?.borderWidth}px`,
          borderRadius: `${element.style?.borderRadius}px`,
          borderStyle: 'solid',
          boxShadow: `${element.style?.shadowOffsetX}px ${element.style?.shadowOffsetY}px ${element.style?.shadowBlur}px ${element.style?.shadowSpread}px ${element.style?.shadowColor}`,
        }}
      >
        {/* Resize handles */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
          {/* North */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-blue-500 cursor-n-resize -mt-1"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(e, element, 'n');
            }}
          />
          {/* South */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-blue-500 cursor-s-resize -mb-1"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(e, element, 's');
            }}
          />
          {/* East */}
          <div
            className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 bg-white border border-blue-500 cursor-e-resize -mr-1"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(e, element, 'e');
            }}
          />
          {/* West */}
          <div
            className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 bg-white border border-blue-500 cursor-w-resize -ml-1"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(e, element, 'w');
            }}
          />
          {/* Northeast */}
          <div
            className="absolute top-0 right-0 w-2 h-2 bg-white border border-blue-500 cursor-ne-resize -mt-1 -mr-1"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(e, element, 'ne');
            }}
          />
          {/* Northwest */}
          <div
            className="absolute top-0 left-0 w-2 h-2 bg-white border border-blue-500 cursor-nw-resize -mt-1 -ml-1"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(e, element, 'nw');
            }}
          />
          {/* Southeast */}
          <div
            className="absolute bottom-0 right-0 w-2 h-2 bg-white border border-blue-500 cursor-se-resize -mb-1 -mr-1"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(e, element, 'se');
            }}
          />
          {/* Southwest */}
          <div
            className="absolute bottom-0 left-0 w-2 h-2 bg-white border border-blue-500 cursor-sw-resize -mb-1 -ml-1"
            onMouseDown={(e) => {
              e.stopPropagation();
              onResizeStart(e, element, 'sw');
            }}
          />
        </div>
        
        {/* Control buttons */}
        <button
          onClick={() => onRemove(element.id)}
          className="absolute -top-7 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          ×
        </button>
        <button
          onClick={() => onEdit(element.id)}
          className="absolute -top-8 right-5 p-1 rounded opacity-0 group-hover:opacity-100"
        >
          ✏️
        </button>
      </div>
    </div>
  );
}; 