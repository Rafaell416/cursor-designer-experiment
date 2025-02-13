import { Element } from '../../types/elements';

interface IPhoneProps {
  element: Element;
  onMouseDown: (e: React.MouseEvent, element: Element) => void;
  onRemove: (id: string) => void;
}

export const IPhone = ({ element, onMouseDown, onRemove }: IPhoneProps) => {
  return (
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
        onClick={() => onRemove(element.id)}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
}; 