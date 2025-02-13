'use client'
import { useState, KeyboardEvent, useEffect } from "react";
import { Canvas } from '../components/canvas/Canvas';
import { SquareEditModal } from '../components/modals/SquareEditModal';
import { TextEditModal } from '../components/modals/TextEditModal';
import { Element} from '../types/elements';

export default function Home() {
  const [elements, setElements] = useState<Element[]>([]);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [editingElement, setEditingElement] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
      if (e.code === 'Space' && !e.repeat) {
        setIsSpacePressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent<HTMLElement>) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown as unknown as EventListener);
    window.addEventListener('keyup', handleKeyUp as unknown as EventListener);

    return () => {
      window.removeEventListener('keydown', handleKeyDown as unknown as EventListener);
      window.removeEventListener('keyup', handleKeyUp as unknown as EventListener);
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
          shadowOffsetX: 0,
          shadowOffsetY: 0,
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
          fontFamily: 'sans',
          fontStyle: 'normal',
          lineHeight: 'normal'
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

  const handleStyleChange = (elementId: string, property: string, value: string | number) => {
    setElements(elements.map(el =>
      el.id === elementId
        ? { ...el, style: { ...el.style!, [property]: value } }
        : el
    ));
  };

  const handleTextStyleChange = (elementId: string, property: string, value: string | number) => {
    setElements(elements.map(el =>
      el.id === elementId
        ? { ...el, textStyle: { ...el.textStyle!, [property]: value } }
        : el
    ));
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

      <div className="w-full h-full relative touch-none">
        <Canvas 
          elements={elements}
          setElements={setElements}
          onEditElement={setEditingElement}
          onAddSquare={addSquare}
          onAddText={addText}
          onAddIPhone={addIPhone}
          isSpacePressed={isSpacePressed}
        />
      </div>

      {editingElement && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          {elements.find(el => el.id === editingElement)?.type === 'text' ? (
            <TextEditModal
              element={elements.find(el => el.id === editingElement)!}
              onClose={() => setEditingElement(null)}
              onStyleChange={(property, value) => handleTextStyleChange(editingElement, property, value)}
            />
          ) : (
            <SquareEditModal
              element={elements.find(el => el.id === editingElement)!}
              onClose={() => setEditingElement(null)}
              onStyleChange={(property, value) => handleStyleChange(editingElement, property, value)}
            />
          )}
        </div>
      )}
    </div>
  );
}
