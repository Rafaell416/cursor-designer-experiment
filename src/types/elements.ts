export interface ElementStyle {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  height?: number;
  zIndex?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowSpread?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
}

export interface TextStyle {
  color?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  fontFamily?: 'sans' | 'serif' | 'mono';
  fontStyle?: 'normal' | 'italic';
  lineHeight?: 'normal' | 'tight' | 'relaxed' | 'loose';
}

export interface Element {
  id: string;
  type: 'text' | 'square' | 'iphone14pro';
  content?: string;
  x: number;
  y: number;
  style?: ElementStyle;
  textStyle?: TextStyle;
  name?: string;
  screenId?: string;
  isScreenElement?: boolean;
  tailwindClass?: string;
}

export interface DragState {
  isDragging: boolean;
  elementId: string | null;
  startX: number;
  startY: number;
  elementStartX: number;
  elementStartY: number;
}

export interface CanvasState {
  x: number;
  y: number;
  isPanning: boolean;
  startX: number;
  startY: number;
}

export interface ResizeState {
  isResizing: boolean;
  elementId: string | null;
  direction: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | null;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
}

export interface AIComponentProperties {
  value?: string;
  [key: string]: any;
}

export interface AIComponent {
  type: string;
  id: string;
  tailwindClass: string;
  properties: AIComponentProperties;
  children: AIComponent[];
}

export interface ParsedAIResponse {
  components: AIComponent[];
  error?: string;
} 