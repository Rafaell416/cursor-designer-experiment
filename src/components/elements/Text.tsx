import { Element } from '../../types/elements';

interface TextProps {
  element: Element;
  onMouseDown: (e: React.MouseEvent, element: Element) => void;
  onDoubleClick: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
}

export const Text = ({ element, onMouseDown, onDoubleClick, onRemove, onEdit }: TextProps) => {
  return (
    <div className="relative group">
      <div
        onDoubleClick={() => onDoubleClick(element.id)}
        className={`min-w-[20px] p-1 cursor-text hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 rounded
          ${element.textStyle?.fontFamily === 'sans' ? 'font-sans' : 
            element.textStyle?.fontFamily === 'serif' ? 'font-serif' : 'font-mono'}
          ${element.textStyle?.fontWeight === 'medium' ? 'font-medium' :
            element.textStyle?.fontWeight === 'semibold' ? 'font-semibold' :
            element.textStyle?.fontWeight === 'bold' ? 'font-bold' : 'font-normal'}
          ${element.textStyle?.fontStyle === 'italic' ? 'italic' : ''}
          ${element.textStyle?.lineHeight === 'tight' ? 'leading-tight' :
            element.textStyle?.lineHeight === 'relaxed' ? 'leading-relaxed' :
            element.textStyle?.lineHeight === 'loose' ? 'leading-loose' : 'leading-normal'}
        `}
        style={{
          color: element.textStyle?.color,
          fontSize: `${element.textStyle?.fontSize}px`,
        }}
      >
        {element.content}
      </div>
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
  );
}; 