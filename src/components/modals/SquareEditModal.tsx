import { Element } from '../../types/elements';

interface SquareEditModalProps {
  element: Element;
  onClose: () => void;
  onStyleChange: (property: string, value: string | number) => void;
}

export const SquareEditModal = ({ element, onClose, onStyleChange }: SquareEditModalProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-[300px] max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Edit Square Style</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      
      <div className="space-y-4">
        {/* Background Color */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Background Color</label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={element.style?.backgroundColor}
              onChange={(e) => onStyleChange('backgroundColor', e.target.value)}
              className="w-10 h-10 rounded border p-0"
            />
            <input
              type="text"
              value={element.style?.backgroundColor}
              onChange={(e) => onStyleChange('backgroundColor', e.target.value)}
              className="flex-1 border rounded px-2 py-1 text-gray-900 font-mono font-medium"
            />
          </div>
        </div>

        {/* Border Color */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Border Color</label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={element.style?.borderColor}
              onChange={(e) => onStyleChange('borderColor', e.target.value)}
              className="w-10 h-10 rounded border p-0"
            />
            <input
              type="text"
              value={element.style?.borderColor}
              onChange={(e) => onStyleChange('borderColor', e.target.value)}
              className="flex-1 border rounded px-2 py-1 text-gray-900 font-mono font-medium"
            />
          </div>
        </div>

        {/* Border Width */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Border Width</label>
          <input
            type="number"
            value={element.style?.borderWidth}
            onChange={(e) => onStyleChange('borderWidth', Number(e.target.value))}
            min={0}
            max={20}
            className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
          />
        </div>

        {/* Border Radius */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Border Radius</label>
          <input
            type="number"
            value={element.style?.borderRadius}
            onChange={(e) => onStyleChange('borderRadius', Number(e.target.value))}
            min={0}
            max={100}
            className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
          />
        </div>

        {/* Width */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Width</label>
          <input
            type="number"
            value={element.style?.width}
            onChange={(e) => onStyleChange('width', Number(e.target.value))}
            min={10}
            max={1000}
            className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
          />
        </div>

        {/* Height */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Height</label>
          <input
            type="number"
            value={element.style?.height}
            onChange={(e) => onStyleChange('height', Number(e.target.value))}
            min={10}
            max={1000}
            className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
          />
        </div>

        {/* Z-Index */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Z-Index</label>
          <input
            type="number"
            value={element.style?.zIndex}
            onChange={(e) => onStyleChange('zIndex', Number(e.target.value))}
            className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
          />
        </div>

        {/* Shadow Color */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Shadow Color</label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={element.style?.shadowColor.replace(/[^#\w]/g, '')}
              onChange={(e) => onStyleChange('shadowColor', e.target.value + '40')}
              className="w-10 h-10 rounded border p-0"
            />
            <input
              type="text"
              value={element.style?.shadowColor}
              onChange={(e) => onStyleChange('shadowColor', e.target.value)}
              className="flex-1 border rounded px-2 py-1 text-gray-900 font-mono font-medium"
            />
          </div>
        </div>

        {/* Shadow Offset X */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Shadow Offset X</label>
          <input
            type="number"
            value={element.style?.shadowOffsetX ?? 0}
            onChange={(e) => onStyleChange('shadowOffsetX', Number(e.target.value))}
            className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
          />
        </div>

        {/* Shadow Offset Y */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Shadow Offset Y</label>
          <input
            type="number"
            value={element.style?.shadowOffsetY ?? 0}
            onChange={(e) => onStyleChange('shadowOffsetY', Number(e.target.value))}
            className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
          />
        </div>

        {/* Shadow Blur */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Shadow Blur</label>
          <input
            type="number"
            value={element.style?.shadowBlur}
            onChange={(e) => onStyleChange('shadowBlur', Number(e.target.value))}
            min={0}
            max={100}
            className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
          />
        </div>

        {/* Shadow Spread */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Shadow Spread</label>
          <input
            type="number"
            value={element.style?.shadowSpread}
            onChange={(e) => onStyleChange('shadowSpread', Number(e.target.value))}
            min={0}
            max={100}
            className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
          />
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>
  );
}; 