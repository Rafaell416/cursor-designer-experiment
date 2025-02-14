import { useCallback, useState } from 'react';
import { Element, AIComponent, ParsedAIResponse } from '@/types/elements';

interface UseAICompanionProps {
  currentElements: Element[];
}

export function parseAIResponse(responseText: string): ParsedAIResponse {
  try {
    // Extract JSON from the markdown code block if present
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : responseText;
    
    // Parse the JSON string
    const components = JSON.parse(jsonString) as AIComponent[];
    
    return { components };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return {
      components: [],
      error: 'Failed to parse AI response'
    };
  }
}

export function useAICompanion({ currentElements }: UseAICompanionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedResponse, setParsedResponse] = useState<ParsedAIResponse>({ components: [] });

  const getDesignSuggestions = useCallback(async (prompt: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const messages = [
        {
          role: "system",
          content: `     
            You are AI design companion for a mobile app design tool that mimics Figma. 
            The user has shared the following context:
            - App Name: "MyFitnessTracker"
            - Screen Name: "Login Screen"
            - It’s designed for an iPhone 14 Pro canvas (393px wide × 852px high).
            - A text element "Sign in" is already placed near the top.

            ### Goal
            Based on the above context (app name, screen name, initial text), **suggest the rest of the UI components** needed to complete a typical "Login Screen" layout. 
            just like cursor suggests code, you should suggest the UI components.
            Include elements like input fields for email/password, a sign-in button, social login buttons, an image for the logo, and any optional elements (e.g., "Forgot Password?" text) that would normally appear on such a screen. 

            ### Requirements

            1. **Primitive Elements Only**  
              - Use only rectangles, circles, lines, or text (no actual <button> or <input>).
              - For a “button”, use a rectangle (with background, border, etc.) plus a text child centered inside.
              - For an “input”, use a rectangle (with border, padding, etc.) plus text for a placeholder.

            2. **Nested JSON Structure**  
              - Each element has "children" to nest any child elements. 
              - For example, an input rectangle can have a text child with placeholder text.

            3. **Single tailwindClass Field**  
              - Put **all** Tailwind styles (position, size, color, etc.) in a single tailwindClass string.
              - The screen is **393px wide**; all elements should be **centered** horizontally. For absolute positioning, you can do something like:
                - "absolute top-[80px] left-[50%] -translate-x-1/2 ..."
              - Rectangles for input fields should include padding (e.g., px-4 py-2) if that helps achieve a good design.
              - Use typical login styles (borders, rounded corners, neutral text colors, etc.).

            4. **Element Object Structure**  
              Each element is an object:
              - "type": "rectangle", "text", "circle", or "line".
              - "id": unique string identifier (e.g. "login-button-rect", "email-placeholder").
              - "tailwindClass": one string with **all** Tailwind classes (position, size, style).
              - "properties": any extra data (e.g. {"value": "Sign in"} for text).
              - "children": an array of nested child elements (each child has the same structure).

            5. **Screen Layout**  
              - Start with a heading text “Sign in” near the top, centered horizontally.
              - Below that, an email input rectangle (centered) with placeholder text as a child.
              - A password input rectangle (centered) with placeholder text as a child.
              - A sign-in button rectangle (centered) with a child text node “Sign In.”
              - Optionally include a “Forgot password?” text or other small text near the bottom or below the inputs.
              - Ensure everything is visually centered along the x-axis on a 393px width.

            6. **Output Only JSON**  
              - Return a **JSON array** of these elements, and **nothing else**—no commentary.
              - Ensure the JSON is valid and all elements are nested correctly.

            ### Example Output (Truncated)

            [ { "type": "rectangle", "id": "email-field", "tailwindClass": "absolute top-[120px] left-[50%] -translate-x-1/2 w-[300px] h-[50px] bg-white border border-gray-300 rounded px-4 py-2", "properties": {}, "children": [ { "type": "text", "id": "email-placeholder", "tailwindClass": "text-gray-400 text-sm", "properties": { "value": "Email" }, "children": [] } ] }, ... ]


            ### Instructions to the AI

            1. **Read** the context: app name, screen name, initial text “Sign in,” iPhone 14 Pro dimensions, etc.
            2. **Suggest** the rest of the components required for a typical login screen layout—**centered** horizontally, with rectangles and text only.
            3. **Return** the final design as a single **JSON array** of objects, each with "type", "id", "tailwindClass", "properties", and "children".
            4. **No additional commentary**—only JSON.
          `
        },
      ];

      const response = await fetch('/api/ai-companion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate design');
      }

      const data = await response.json();
      const result = parseAIResponse(data.message.content);
      setParsedResponse(result);
      
      if (result.error) {
        setError(result.error);
      }

      return result.components;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
      console.error('Error:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [currentElements]);

  return {
    getDesignSuggestions,
    isLoading,
    error,
    parsedComponents: parsedResponse.components
  };
} 