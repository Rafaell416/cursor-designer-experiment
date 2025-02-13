interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const ZoomControls = ({ zoom, onZoomIn, onZoomOut }: ZoomControlsProps) => {
  return (
    <div className="flex items-center gap-2 bg-gray-800 rounded px-3">
      <button
        onClick={onZoomIn}
        className="text-white py-2 hover:text-gray-300"
      >
        +
      </button>
      <span className="text-white">
        {Math.round(zoom * 100)}%
      </span>
      <button
        onClick={onZoomOut}
        className="text-white py-2 hover:text-gray-300"
      >
        -
      </button>
    </div>
  );
}; 