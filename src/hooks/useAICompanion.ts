import { useCallback, useState } from 'react';
import { Element, AIComponent, ParsedAIResponse } from '@/types/elements';
import OpenAI from 'openai';
import { GET_DESIGN_SUGGESTIONS_PROMPT } from '@/utils/prompts/GET_DESIGN_SUGGESTIONS';

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error('NEXT_PUBLIC_OPENAI_API_KEY is not set in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, you should use a proxy or edge function
});

interface UseAICompanionProps {
  currentElements: Element[];
}

export function parseAIResponse(responseText: string): ParsedAIResponse {
  try {
    // Extract JSON from the markdown code block if present
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : responseText;
    
    // Parse the JS ON string
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

  const getDesignSuggestions = useCallback(async (_prompt: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const messages = [
        {
          role: "system",
          content: GET_DESIGN_SUGGESTIONS_PROMPT
        },
      ];

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: messages.map(msg => ({ role: msg.role as "system" | "user" | "assistant", content: msg.content })),
        temperature: 0.7,
        max_tokens: 2000
      });

      const result = parseAIResponse(completion.choices[0].message.content || '');
      
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
  };
} 