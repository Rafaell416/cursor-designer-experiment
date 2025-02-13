'use client'
import { useState, MouseEvent, KeyboardEvent, useEffect } from "react";

interface ElementStyle {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  width: number;
  height: number;
  zIndex: number;
  shadowColor: string;
  shadowBlur: number;
  shadowSpread: number;
}

interface TextStyle {
  color: string;
  fontSize: number;
  fontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
  fontFamily: 'sans' | 'serif' | 'mono';
}

interface Element {
  id: string;
  type: 'text' | 'square' | 'iphone14pro';
  content?: string;
  x: number;
  y: number;
  style?: ElementStyle;
  textStyle?: TextStyle;
}

interface DragState {
  isDragging: boolean;
  elementId: string | null;
  startX: number;
  startY: number;
  elementStartX: number;
  elementStartY: number;
}

interface CanvasState {
  x: number;
  y: number;
  isPanning: boolean;
  startX: number;
  startY: number;
}

interface ResizeState {
  isResizing: boolean;
  elementId: string | null;
  direction: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | null;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
}

export default function Home() {
  const [elements, setElements] = useState<Element[]>([]);
  const [zoom, setZoom] = useState(1);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    elementId: null,
    startX: 0,
    startY: 0,
    elementStartX: 0,
    elementStartY: 0,
  });
  const [canvasState, setCanvasState] = useState<CanvasState>({
    x: 0,
    y: 0,
    isPanning: false,
    startX: 0,
    startY: 0,
  });
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [editingElement, setEditingElement] = useState<string | null>(null);
  const [resizeState, setResizeState] = useState<ResizeState>({
    isResizing: false,
    elementId: null,
    direction: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        setIsSpacePressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown as any);
    window.addEventListener('keyup', handleKeyUp as any);

    return () => {
      window.removeEventListener('keydown', handleKeyDown as any);
      window.removeEventListener('keyup', handleKeyUp as any);
    };
  }, []);

  const addSquare = () => {
    setElements([
      ...elements,
      {
        id: `square-${Date.now()}`,
        type: 'square',
        x: 100,
        y: 100,
        style: {
          backgroundColor: '#BFDBFE',
          borderColor: '#3B82F6',
          borderWidth: 1,
          borderRadius: 4,
          width: 128,
          height: 128,
          zIndex: 0,
          shadowColor: '#00000040',
          shadowBlur: 0,
          shadowSpread: 0,
        }
      }
    ]);
  };

  const addText = () => {
    setElements([
      ...elements,
      {
        id: `text-${Date.now()}`,
        type: 'text',
        content: 'Double click to edit',
        x: 100,
        y: 100,
        textStyle: {
          color: '#1F2937',
          fontSize: 16,
          fontWeight: 'normal',
          fontFamily: 'sans'
        }
      }
    ]);
  };

  const addIPhone = () => {
    setElements([
      ...elements,
      {
        id: `iphone-${Date.now()}`,
        type: 'iphone14pro',
        x: 100,
        y: 100,
        style: {
          zIndex: 0
        }
      }
    ]);
  };

  const handleMouseDown = (e: MouseEvent, element: Element) => {
    setDragState({
      isDragging: true,
      elementId: element.id,
      startX: e.clientX,
      startY: e.clientY,
      elementStartX: element.x,
      elementStartY: element.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragState.isDragging) return;

    const deltaX = (e.clientX - dragState.startX) / zoom;
    const deltaY = (e.clientY - dragState.startY) / zoom;

    setElements(elements.map(el =>
      el.id === dragState.elementId
        ? {
            ...el,
            x: dragState.elementStartX + deltaX,
            y: dragState.elementStartY + deltaY,
          }
        : el
    ));
  };

  const handleMouseUp = () => {
    setDragState({
      isDragging: false,
      elementId: null,
      startX: 0,
      startY: 0,
      elementStartX: 0,
      elementStartY: 0,
    });
  };

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

  const handleCanvasMouseDown = (e: MouseEvent) => {
    if (isSpacePressed && e.button === 0) {
      e.preventDefault();
      setCanvasState({
        ...canvasState,
        isPanning: true,
        startX: e.clientX,
        startY: e.clientY,
      });
    }
  };

  const handleCanvasMouseMove = (e: MouseEvent) => {
    if (resizeState.isResizing) {
      handleResizeMove(e);
    } else if (canvasState.isPanning) {
      const deltaX = e.clientX - canvasState.startX;
      const deltaY = e.clientY - canvasState.startY;

      setCanvasState({
        ...canvasState,
        x: canvasState.x + deltaX,
        y: canvasState.y + deltaY,
        startX: e.clientX,
        startY: e.clientY,
      });
    } else if (dragState.isDragging) {
      handleMouseMove(e);
    }
  };

  const handleCanvasMouseUp = () => {
    if (resizeState.isResizing) {
      handleResizeEnd();
    }
    setCanvasState({
      ...canvasState,
      isPanning: false,
    });
    handleMouseUp();
  };

  const handleWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = -e.deltaY;
      const zoomFactor = 0.005;
      setZoom(z => Math.min(Math.max(z + (delta * zoomFactor), 0.5), 2));
    } else if (isSpacePressed) {
      e.preventDefault();
      setCanvasState(prev => ({
        ...prev,
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY,
      }));
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
    }
  };

  const handleStyleChange = (elementId: string, property: keyof ElementStyle, value: string | number) => {
    setElements(elements.map(el =>
      el.id === elementId
        ? { ...el, style: { ...el.style!, [property]: value } }
        : el
    ));
  };

  const handleTextStyleChange = (elementId: string, property: keyof TextStyle, value: string | number) => {
    setElements(elements.map(el =>
      el.id === elementId
        ? { ...el, textStyle: { ...el.textStyle!, [property]: value } }
        : el
    ));
  };

  const handleResizeStart = (e: MouseEvent, element: Element, direction: ResizeState['direction']) => {
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
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!resizeState.isResizing) return;

    const deltaX = (e.clientX - resizeState.startX) / zoom;
    const deltaY = (e.clientY - resizeState.startY) / zoom;
    const element = elements.find(el => el.id === resizeState.elementId);
    if (!element?.style) return;

    let newWidth = element.style.width;
    let newHeight = element.style.height;
    let newX = element.x;
    let newY = element.y;

    switch (resizeState.direction) {
      case 'e':
        newWidth = Math.max(50, resizeState.startWidth + deltaX);
        break;
      case 'w':
        newWidth = Math.max(50, resizeState.startWidth - deltaX);
        newX = element.x + (resizeState.startWidth - newWidth);
        break;
      case 's':
        newHeight = Math.max(50, resizeState.startHeight + deltaY);
        break;
      case 'n':
        newHeight = Math.max(50, resizeState.startHeight - deltaY);
        newY = element.y + (resizeState.startHeight - newHeight);
        break;
      case 'se':
        newWidth = Math.max(50, resizeState.startWidth + deltaX);
        newHeight = Math.max(50, resizeState.startHeight + deltaY);
        break;
      case 'sw':
        newWidth = Math.max(50, resizeState.startWidth - deltaX);
        newHeight = Math.max(50, resizeState.startHeight + deltaY);
        newX = element.x + (resizeState.startWidth - newWidth);
        break;
      case 'ne':
        newWidth = Math.max(50, resizeState.startWidth + deltaX);
        newHeight = Math.max(50, resizeState.startHeight - deltaY);
        newY = element.y + (resizeState.startHeight - newHeight);
        break;
      case 'nw':
        newWidth = Math.max(50, resizeState.startWidth - deltaX);
        newHeight = Math.max(50, resizeState.startHeight - deltaY);
        newX = element.x + (resizeState.startWidth - newWidth);
        newY = element.y + (resizeState.startHeight - newHeight);
        break;
    }

    setElements(elements.map(el =>
      el.id === resizeState.elementId
        ? {
            ...el,
            x: newX,
            y: newY,
            style: { ...el.style!, width: newWidth, height: newHeight }
          }
        : el
    ));
  };

  const handleResizeEnd = () => {
    setResizeState({
      isResizing: false,
      elementId: null,
      direction: null,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0,
    });
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-gray-100">
      <div className="fixed bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded z-10">
        <p className="text-sm mb-1">Pan Canvas:</p>
        <ul className="text-xs space-y-1 text-gray-300">
          <li>• Hold Space + Click & Drag</li>
          <li>• Hold Space + Two-finger scroll</li>
        </ul>
      </div>

      {isSpacePressed && (
        <div className="fixed top-4 right-4 bg-black/70 text-white px-4 py-2 rounded z-10">
          Pan Tool Active (Space)
        </div>
      )}

      <div className="fixed top-4 left-4 flex gap-2 z-10">
        <button
          onClick={addIPhone}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Add Screen
        </button>
        <button
          onClick={addSquare}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Square
        </button>
        <button
          onClick={addText}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Text
        </button>
        <div className="flex items-center gap-2 bg-gray-800 rounded px-3">
          <button
            onClick={() => setZoom(z => Math.min(z + 0.1, 2))}
            className="text-white py-2 hover:text-gray-300"
          >
            +
          </button>
          <span className="text-white">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))}
            className="text-white py-2 hover:text-gray-300"
          >
            -
          </button>
        </div>
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
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
        onWheel={handleWheel as any}
        onTouchStart={handleTouchStart as any}
        onTouchMove={handleTouchMove as any}
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
                  handleMouseDown(e, element);
                }
              }}
            >
              {element.type === 'square' ? (
                <div className="relative group">
                  <div
                    style={{
                      width: `${element.style?.width}px`,
                      height: `${element.style?.height}px`,
                      backgroundColor: element.style?.backgroundColor,
                      borderColor: element.style?.borderColor,
                      borderWidth: `${element.style?.borderWidth}px`,
                      borderRadius: `${element.style?.borderRadius}px`,
                      borderStyle: 'solid',
                      boxShadow: `0 0 ${element.style?.shadowBlur}px ${element.style?.shadowSpread}px ${element.style?.shadowColor}`,
                    }}
                    className="relative"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                      <div
                        className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-blue-500 cursor-nw-resize"
                        onMouseDown={(e) => handleResizeStart(e, element, 'nw')}
                      />
                      <div
                        className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-blue-500 cursor-ne-resize"
                        onMouseDown={(e) => handleResizeStart(e, element, 'ne')}
                      />
                      <div
                        className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-blue-500 cursor-sw-resize"
                        onMouseDown={(e) => handleResizeStart(e, element, 'sw')}
                      />
                      <div
                        className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-blue-500 cursor-se-resize"
                        onMouseDown={(e) => handleResizeStart(e, element, 'se')}
                      />
                      
                      <div
                        className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-blue-500 cursor-n-resize"
                        onMouseDown={(e) => handleResizeStart(e, element, 'n')}
                      />
                      <div
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-blue-500 cursor-s-resize"
                        onMouseDown={(e) => handleResizeStart(e, element, 's')}
                      />
                      <div
                        className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white border border-blue-500 cursor-w-resize"
                        onMouseDown={(e) => handleResizeStart(e, element, 'w')}
                      />
                      <div
                        className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white border border-blue-500 cursor-e-resize"
                        onMouseDown={(e) => handleResizeStart(e, element, 'e')}
                      />
                    </div>
                    
                    <button
                      onClick={() => removeElement(element.id)}
                      className="absolute -top-7 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100"
                    >
                      ×
                    </button>
                    <button
                      onClick={() => setEditingElement(element.id)}
                      className="absolute -top-8 right-5 p-1 rounded opacity-0 group-hover:opacity-100"
                    >
                      ✏️
                    </button>
                  </div>
                </div>
              ) : element.type === 'iphone14pro' ? (
                <div className="relative group">
                  <div className="w-[393px] h-[852px] rounded-[55px] border-[12px] border-gray-900 relative bg-white overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-b-[24px] z-10" />
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute -left-[12px] top-[200px] w-[12px] h-[50px] bg-gray-900" />
                      <div className="absolute -left-[12px] top-[270px] w-[12px] h-[50px] bg-gray-900" />
                      <div className="absolute -right-[12px] top-[180px] w-[12px] h-[100px] bg-gray-900" />
                    </div>
                  </div>
                  <button
                    onClick={() => removeElement(element.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="relative group">
                  <div
                    onDoubleClick={() => handleTextDoubleClick(element.id)}
                    className={`min-w-[20px] p-1 cursor-text hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 rounded
                      ${element.textStyle?.fontFamily === 'sans' ? 'font-sans' : 
                        element.textStyle?.fontFamily === 'serif' ? 'font-serif' : 'font-mono'}
                      ${element.textStyle?.fontWeight === 'medium' ? 'font-medium' :
                        element.textStyle?.fontWeight === 'semibold' ? 'font-semibold' :
                        element.textStyle?.fontWeight === 'bold' ? 'font-bold' : 'font-normal'}
                    `}
                    style={{
                      color: element.textStyle?.color,
                      fontSize: `${element.textStyle?.fontSize}px`,
                    }}
                  >
                    {element.content}
                  </div>
                  <button
                    onClick={() => removeElement(element.id)}
                    className="absolute -top-7 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>
                  <button
                    onClick={() => setEditingElement(element.id)}
                    className="absolute -top-8 right-5 p-1 rounded opacity-0 group-hover:opacity-100"
                  >
                    ✏️
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {editingElement && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          {elements.find(el => el.id === editingElement)?.type === 'text' ? (
            <div className="bg-white p-4 rounded-lg shadow-lg w-[300px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Edit Text Style</h3>
                <button 
                  onClick={() => setEditingElement(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Text Color</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={elements.find(el => el.id === editingElement)?.textStyle?.color || '#1F2937'}
                      onChange={(e) => handleTextStyleChange(editingElement, 'color', e.target.value)}
                      className="w-10 h-10 rounded border p-0"
                    />
                    <input
                      type="text"
                      value={elements.find(el => el.id === editingElement)?.textStyle?.color || '#1F2937'}
                      onChange={(e) => handleTextStyleChange(editingElement, 'color', e.target.value)}
                      className="flex-1 border rounded px-2 py-1 text-gray-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Font Size (px)</label>
                  <input
                    type="number"
                    value={elements.find(el => el.id === editingElement)?.textStyle?.fontSize || 16}
                    onChange={(e) => handleTextStyleChange(editingElement, 'fontSize', Number(e.target.value))}
                    className="w-full border rounded px-2 py-1 text-gray-900 bg-white"
                    min="8"
                    max="72"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Font Weight</label>
                  <select
                    value={elements.find(el => el.id === editingElement)?.textStyle?.fontWeight || 'normal'}
                    onChange={(e) => handleTextStyleChange(editingElement, 'fontWeight', e.target.value)}
                    className="w-full border rounded px-2 py-1 text-gray-900 bg-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="medium">Medium</option>
                    <option value="semibold">Semibold</option>
                    <option value="bold">Bold</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Font Family</label>
                  <select
                    value={elements.find(el => el.id === editingElement)?.textStyle?.fontFamily || 'sans'}
                    onChange={(e) => handleTextStyleChange(editingElement, 'fontFamily', e.target.value)}
                    className="w-full border rounded px-2 py-1 text-gray-900 bg-white"
                  >
                    <option value="sans">Sans-serif</option>
                    <option value="serif">Serif</option>
                    <option value="mono">Monospace</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setEditingElement(null)}
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          ) : elements.find(el => el.id === editingElement)?.type === 'square' ? (
            <div className="bg-white p-4 rounded-lg shadow-lg w-[300px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Edit Square Style</h3>
                <button 
                  onClick={() => setEditingElement(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Background Color</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={elements.find(el => el.id === editingElement)?.style?.backgroundColor}
                      onChange={(e) => handleStyleChange(editingElement, 'backgroundColor', e.target.value)}
                      className="w-10 h-10 rounded border p-0"
                    />
                    <input
                      type="text"
                      value={elements.find(el => el.id === editingElement)?.style?.backgroundColor}
                      onChange={(e) => handleStyleChange(editingElement, 'backgroundColor', e.target.value)}
                      className="flex-1 border rounded px-2 py-1 text-gray-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Border Color</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={elements.find(el => el.id === editingElement)?.style?.borderColor}
                      onChange={(e) => handleStyleChange(editingElement, 'borderColor', e.target.value)}
                      className="w-10 h-10 rounded border p-0"
                    />
                    <input
                      type="text"
                      value={elements.find(el => el.id === editingElement)?.style?.borderColor}
                      onChange={(e) => handleStyleChange(editingElement, 'borderColor', e.target.value)}
                      className="flex-1 border rounded px-2 py-1 text-gray-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Border Width (px)</label>
                  <input
                    type="number"
                    value={elements.find(el => el.id === editingElement)?.style?.borderWidth || 1}
                    onChange={(e) => handleStyleChange(editingElement, 'borderWidth', Number(e.target.value))}
                    className="w-full border rounded px-2 py-1 text-gray-900 bg-white"
                    min="0"
                    max="10"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Border Radius (px)</label>
                  <input
                    type="number"
                    value={elements.find(el => el.id === editingElement)?.style?.borderRadius || 4}
                    onChange={(e) => handleStyleChange(editingElement, 'borderRadius', Number(e.target.value))}
                    className="w-full border rounded px-2 py-1 text-gray-900 bg-white"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Width (px)</label>
                  <input
                    type="number"
                    value={elements.find(el => el.id === editingElement)?.style?.width || 128}
                    onChange={(e) => handleStyleChange(editingElement, 'width', Number(e.target.value))}
                    className="w-full border rounded px-2 py-1 text-gray-900 bg-white"
                    min="50"
                    max="500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Height (px)</label>
                  <input
                    type="number"
                    value={elements.find(el => el.id === editingElement)?.style?.height || 128}
                    onChange={(e) => handleStyleChange(editingElement, 'height', Number(e.target.value))}
                    className="w-full border rounded px-2 py-1 text-gray-900 bg-white"
                    min="50"
                    max="500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Shadow Color</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={elements.find(el => el.id === editingElement)?.style?.shadowColor || '#00000040'}
                      onChange={(e) => handleStyleChange(editingElement, 'shadowColor', e.target.value)}
                      className="w-10 h-10 rounded border p-0"
                    />
                    <input
                      type="text"
                      value={elements.find(el => el.id === editingElement)?.style?.shadowColor}
                      onChange={(e) => handleStyleChange(editingElement, 'shadowColor', e.target.value)}
                      className="flex-1 border rounded px-2 py-1 text-gray-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Shadow Blur (px)</label>
                  <input
                    type="number"
                    value={elements.find(el => el.id === editingElement)?.style?.shadowBlur || 0}
                    onChange={(e) => handleStyleChange(editingElement, 'shadowBlur', Number(e.target.value))}
                    className="w-full border rounded px-2 py-1 text-gray-900 bg-white"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Shadow Spread (px)</label>
                  <input
                    type="number"
                    value={elements.find(el => el.id === editingElement)?.style?.shadowSpread || 0}
                    onChange={(e) => handleStyleChange(editingElement, 'shadowSpread', Number(e.target.value))}
                    className="w-full border rounded px-2 py-1 text-gray-900 bg-white"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <button
                onClick={() => setEditingElement(null)}
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
