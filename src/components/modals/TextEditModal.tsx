import { Element } from '../../types/elements';

interface TextEditModalProps {
  element: Element;
  onClose: () => void;
  onStyleChange: (property: string, value: string | number) => void;
  onPositionChange?: (x: number, y: number) => void;
}

export const TextEditModal = ({ element, onClose, onStyleChange, onPositionChange }: TextEditModalProps) => {
  const textStyle = element.textStyle || {};
  const defaultColor = '#374151';

  const handlePositionChange = (property: 'x' | 'y', value: number) => {
    if (onPositionChange) {
      onPositionChange(
        property === 'x' ? value : element.x,
        property === 'y' ? value : element.y
      );
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-[300px] max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-700">Edit Text Style</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      
      <div className="space-y-4">
        {/* Text Color */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Text Color</label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={textStyle.color || defaultColor}
              onChange={(e) => onStyleChange('color', e.target.value)}
              className="w-10 h-10 rounded border p-0"
            />
            <input
              type="text"
              value={textStyle.color || defaultColor}
              onChange={(e) => onStyleChange('color', e.target.value)}
              className="flex-1 border rounded px-2 py-1 text-gray-900 font-mono font-medium"
            />
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Font Size</label>
          <input
            type="number"
            value={textStyle.fontSize || 16}
            onChange={(e) => onStyleChange('fontSize', Number(e.target.value))}
            min={8}
            max={200}
            className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
          />
        </div>

        {/* Font Weight */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Font Weight</label>
          <select
            value={textStyle.fontWeight || 'normal'}
            onChange={(e) => onStyleChange('fontWeight', e.target.value)}
            className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
          >
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="semibold">Semibold</option>
            <option value="bold">Bold</option>
          </select>
        </div>

        {/* Font Family */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Font Family</label>
          <select
            value={textStyle.fontFamily || 'sans'}
            onChange={(e) => onStyleChange('fontFamily', e.target.value)}
            className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
          >
            <option value="sans">Sans-serif</option>
            <option value="serif">Serif</option>
            <option value="mono">Monospace</option>
          </select>
        </div>

        {/* Font Style */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Font Style</label>
          <select
            value={textStyle.fontStyle || 'normal'}
            onChange={(e) => onStyleChange('fontStyle', e.target.value)}
            className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
          </select>
        </div>

        {/* Line Height */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Line Height</label>
          <select
            value={textStyle.lineHeight || 'normal'}
            onChange={(e) => onStyleChange('lineHeight', e.target.value)}
            className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
          >
            <option value="normal">Normal</option>
            <option value="tight">Tight</option>
            <option value="relaxed">Relaxed</option>
            <option value="loose">Loose</option>
          </select>
        </div>
      </div>

      {/* Position Controls */}
      <div className="mt-4 space-y-4">
        <h4 className="font-medium text-gray-700">Position</h4>
        <div className="grid grid-cols-2 gap-4">
          {/* X Position */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">X Position</label>
            <input
              type="number"
              value={element.x}
              onChange={(e) => handlePositionChange('x', Number(e.target.value))}
              className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
            />
          </div>
          {/* Y Position */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Y Position</label>
            <input
              type="number"
              value={element.y}
              onChange={(e) => handlePositionChange('y', Number(e.target.value))}
              className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Z-Index */}
      <div className="mt-4">
        <label className="block text-sm text-gray-600 mb-1">Z-Index</label>
        <input
          type="number"
          value={element.style?.zIndex || 0}
          onChange={(e) => onStyleChange('zIndex', Number(e.target.value))}
          className="w-full border rounded px-2 py-1 text-gray-900 font-medium"
        />
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