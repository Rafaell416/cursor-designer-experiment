import { useCanvas } from '../../hooks/useCanvas';
import { useDrag } from '../../hooks/useDrag';
import { useZoom } from '../../hooks/useZoom';
import { useResize } from '../../hooks/useResize';
import { Square } from '../elements/Square';
import { Text } from '../elements/Text';
import { IPhone } from '../elements/IPhone';
import { Element } from '../../types/elements';
import { ZoomControls } from './ZoomControls';

interface CanvasProps {
  elements: Element[];
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
  onEditElement: (id: string) => void;
  onAddSquare: () => void;
  onAddText: () => void;
  onAddIPhone: () => void;
}

export const Canvas = ({ 
  elements, 
  setElements, 
  onEditElement,
  onAddSquare,
  onAddText,
  onAddIPhone 
}: CanvasProps) => {
  const { zoom, handleWheel, zoomIn, zoomOut } = useZoom();
  const { 
    canvasState, 
    handleCanvasMouseDown, 
    handleCanvasMouseMove, 
    handleCanvasMouseUp,
    isSpacePressed 
  } = useCanvas();
  const { dragState, handleMouseDown, handleMouseMove, handleMouseUp } = useDrag(zoom, setElements);
  const { resizeState, handleResizeStart, handleResizeMove, handleResizeEnd } = useResize(zoom, setElements);

  const handleTextDoubleClick = (id: string) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      const newContent = prompt('Edit text:', element.content) || element.content;
      setElements(elements.map(el =>
        el.id === id ? { ...el, content: newContent } : el
      ));
    }
  };

  const removeElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
  };

  const handleMouseMoveWrapper = (e: React.MouseEvent) => {
    if (resizeState.isResizing) {
      handleResizeMove(e as unknown as MouseEvent);
    } else if (canvasState.isPanning) {
      handleCanvasMouseMove(e);
    } else if (dragState.isDragging) {
      handleMouseMove(e as unknown as MouseEvent);
    }
  };

  const handleMouseUpWrapper = () => {
    if (resizeState.isResizing) {
      handleResizeEnd();
    }
    handleCanvasMouseUp();
    handleMouseUp();
  };

  return (
    <>
      <div className="fixed top-4 left-4 flex gap-2 z-10">
        <button
          onClick={onAddIPhone}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Add Screen
        </button>
        <button
          onClick={onAddSquare}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Square
        </button>
        <button
          onClick={onAddText}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Text
        </button>
        <ZoomControls 
          zoom={zoom}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
        />
      </div>

      <div 
        className="w-full h-full relative touch-none"
        style={{
          cursor: canvasState.isPanning ? 'grabbing' : isSpacePressed ? 'grab' : 'default',
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #ccc 1px, transparent 1px)
          `,
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          backgroundPosition: `${canvasState.x}px ${canvasState.y}px`,
        }}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleMouseMoveWrapper}
        onMouseUp={handleMouseUpWrapper}
        onMouseLeave={handleMouseUpWrapper}
        onWheel={handleWheel}
      >
        <div
          className="w-full h-full relative"
          style={{
            transform: `translate(${canvasState.x}px, ${canvasState.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            transition: 'transform 0.1s ease-in-out',
          }}
        >
          {elements.map((element) => (
            <div 
              key={element.id}
              className="absolute cursor-move"
              style={{
                transform: `translate(${element.x}px, ${element.y}px)`,
                touchAction: 'none',
                zIndex: element.style?.zIndex || 0
              }}
              onMouseDown={(e) => {
                if (!canvasState.isPanning && !isSpacePressed) {
                  handleMouseDown(e as unknown as MouseEvent, element);
                }
              }}
            >
              {element.type === 'square' ? (
                <Square
                  element={element}
                  onMouseDown={(e) => handleMouseDown(e as unknown as MouseEvent, element)}
                  onResizeStart={(e, el, dir) => handleResizeStart(e as unknown as MouseEvent, el, dir)}
                  onRemove={removeElement}
                  onEdit={onEditElement}
                />
              ) : element.type === 'text' ? (
                <Text
                  element={element}
                  onMouseDown={(e) => handleMouseDown(e as unknown as MouseEvent, element)}
                  onDoubleClick={handleTextDoubleClick}
                  onRemove={removeElement}
                  onEdit={onEditElement}
                />
              ) : element.type === 'iphone14pro' ? (
                <IPhone
                  element={element}
                  onMouseDown={(e) => handleMouseDown(e as unknown as MouseEvent, element)}
                  onRemove={removeElement}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}; 