import { Element, ElementStyle } from '@/types/elements';

interface SquareEditModalProps {
  onClose: () => void;
  element: Element;
  onStyleChange: (property: keyof ElementStyle, value: string | number) => void;
  onPositionChange?: (x: number, y: number) => void;
}

export function SquareEditModal({onClose, element, onStyleChange, onPositionChange }: SquareEditModalProps) {
  const style = element.style || {};
  const shadowColor = style.shadowColor || '#00000040';

  const handlePositionChange = (property: 'x' | 'y', value: number) => {
    if (onPositionChange) {
      onPositionChange(
        property === 'x' ? value : element.x,
        property === 'y' ? value : element.y
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-lg">
      <div className="bg-white p-6 w-96 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Edit Square</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="space-y-4 overflow-y-auto pr-2">
          {/* Position Controls */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Position</h4>
            <div className="grid grid-cols-2 gap-4">
              {/* X Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">X Position</label>
                <input
                  type="number"
                  value={element.x}
                  onChange={(e) => handlePositionChange('x', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-gray-700"
                />
              </div>
              {/* Y Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Y Position</label>
                <input
                  type="number"
                  value={element.y}
                  onChange={(e) => handlePositionChange('y', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Z-Index */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Z-Index
            </label>
            <input
              type="number"
              value={style.zIndex || 0}
              onChange={(e) => onStyleChange('zIndex', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded text-gray-700"
            />
          </div>

          <hr />
          {/* Dimensions */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Dimensions</h4>
            <div className="grid grid-cols-2 gap-4">
              {/* Width */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                <input
                  type="number"
                  value={style.width || 100}
                  onChange={(e) => onStyleChange('width', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-gray-700"
                />
              </div>
              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                <input
                  type="number"
                  value={style.height || 100}
                  onChange={(e) => onStyleChange('height', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-gray-700"
                />
              </div>
            </div>
          </div>

          <hr />
          {/* Colors */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Colors</h4>
            <div className="grid grid-cols-2 gap-4">
              {/* Background Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
                <input
                  type="color"
                  value={style.backgroundColor || '#ffffff'}
                  onChange={(e) => onStyleChange('backgroundColor', e.target.value)}
                  className="w-full h-10 rounded border p-0"
                />
              </div>
              {/* Border Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Border</label>
                <input
                  type="color"
                  value={style.borderColor || '#000000'}
                  onChange={(e) => onStyleChange('borderColor', e.target.value)}
                  className="w-full h-10 rounded border p-0"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Border Width
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={style.borderWidth || 0}
              onChange={(e) => onStyleChange('borderWidth', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Border Radius
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={style.borderRadius || 0}
              onChange={(e) => onStyleChange('borderRadius', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <hr />
          <h4 className="font-medium text-gray-700 mb-2">Shadow</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shadow Color
            </label>
            <input
              type="color"
              value={shadowColor.replace(/[^#\w]/g, '')}
              onChange={(e) => onStyleChange('shadowColor', e.target.value + '40')}
              className="w-10 h-10 rounded border p-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shadow Blur
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={style.shadowBlur || 0}
              onChange={(e) => onStyleChange('shadowBlur', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shadow Spread
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={style.shadowSpread || 0}
              onChange={(e) => onStyleChange('shadowSpread', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shadow Offset X
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              value={style.shadowOffsetX || 0}
              onChange={(e) => onStyleChange('shadowOffsetX', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shadow Offset Y
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              value={style.shadowOffsetY || 0}
              onChange={(e) => onStyleChange('shadowOffsetY', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
} 