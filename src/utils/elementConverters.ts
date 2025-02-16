import { AIComponent, Element } from '@/types/elements';

interface ScreenPosition {
  x: number;
  y: number;
}

const IPHONE_SCREEN_PADDING = {
  top: 60,
  left: 25,
  right: 25,
  bottom: 60
};

// function convertTailwindToStyles(tailwindClass: string) {
//   const styles: {
//     backgroundColor?: string;
//     borderColor?: string;
//     width?: number;
//     height?: number;
//     textColor?: string;
//     fontSize?: number;
//     fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
//   } = {};

//   // Background colors
//   if (tailwindClass.includes('bg-blue-500')) styles.backgroundColor = '#3B82F6';
//   if (tailwindClass.includes('bg-white')) styles.backgroundColor = '#FFFFFF';

//   // Text colors
//   if (tailwindClass.includes('text-gray-800')) styles.textColor = '#1F2937';
//   if (tailwindClass.includes('text-gray-400')) styles.textColor = '#9CA3AF';
//   if (tailwindClass.includes('text-white')) styles.textColor = '#FFFFFF';
//   if (tailwindClass.includes('text-blue-500')) styles.textColor = '#3B82F6';

//   // Font sizes
//   if (tailwindClass.includes('text-sm')) styles.fontSize = 14;
//   if (tailwindClass.includes('text-lg')) styles.fontSize = 18;
//   if (tailwindClass.includes('text-2xl')) styles.fontSize = 24;

//   // Font weights
//   if (tailwindClass.includes('font-bold')) styles.fontWeight = 'bold';
//   if (tailwindClass.includes('font-semibold')) styles.fontWeight = 'semibold';
//   if (tailwindClass.includes('font-medium')) styles.fontWeight = 'medium';

//   // Border colors
//   if (tailwindClass.includes('border-gray-300')) styles.borderColor = '#D1D5DB';

//   return styles;
// }

function parsePosition(tailwindClass: string): { x: number; y: number } {
  const top = tailwindClass.match(/top-\[([^\]]+)px\]/)?.[1];
  const left = tailwindClass.match(/left-\[([^\]]+)%\]/)?.[1];
  const translateX = tailwindClass.match(/-translate-x-\[([^\]]+)\]/)?.[1];

  return {
    x: left ? (parseFloat(left) / 100) * 393 - (translateX ? parseFloat(translateX) : 0) : 0,
    y: top ? parseFloat(top) : 0
  };
}

// function parseDimensions(tailwindClass: string): { width?: number; height?: number } {
//   const width = tailwindClass.match(/w-\[([^\]]+)px\]/)?.[1];
//   const height = tailwindClass.match(/h-\[([^\]]+)px\]/)?.[1];

//   return {
//     width: width ? parseFloat(width) : undefined,
//     height: height ? parseFloat(height) : undefined
//   };
// }

function createElementFromComponent(
  component: AIComponent,
  screen: Element,
  parentPosition = { x: 0, y: 0 }
): Element[] {
  const elements: Element[] = [];
  const position = component.position;
  // Create the main element

  console.log({position, iphoneScreenPadding: IPHONE_SCREEN_PADDING, parentPosition});
  const baseElement: Element = {
    id: `${component.id}-${crypto.randomUUID()}`,
    type: component.type === 'rectangle' ? 'square' : 'text',
    x: position.x,
    y: position.y,
    screenId: screen.id,
    isScreenElement: true,
    tailwindClass: component.tailwindClass
  };

  if (baseElement.type === 'text') {
    baseElement.content = component.properties.value || '';
  }

  elements.push(baseElement);

  if (component.children && component.children.length > 0) {
    for (const child of component.children) {
      const childElements = createElementFromComponent(child, screen, {
        x: baseElement.x,
        y: baseElement.y
      });
      elements.push(...childElements);
    }
  }

  return elements;
}

export function convertAIComponentsToElements(
  components: AIComponent[],
  screen: Element
): Element[] {
  const allElements: Element[] = [];

  for (const component of components) {
    const elements = createElementFromComponent(component, screen, { x: 0, y: 0 });
    allElements.push(...elements);
  }

  return allElements;
} 