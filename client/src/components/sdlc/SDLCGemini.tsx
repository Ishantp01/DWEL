
import { useState } from "react";
import { Send, BrainCircuit, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SDLCPhase } from "@/pages/SDLC";

interface SDLCGeminiProps {
  currentPhase: SDLCPhase;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "gemini";
  timestamp: Date;
}

const phasePrompts: Record<SDLCPhase, string[]> = {
  requirements: [
    "What should be included in a user story template?",
    "How to identify non-functional requirements?",
    "Generate acceptance criteria for authentication feature"
  ],
  design: [
    "Suggest color schemes for a financial dashboard",
    "What's the best chart type for time series data?",
    "How to design for accessibility?"
  ],
  implementation: [
    "How to structure React components for scalability?",
    "Best practices for API error handling",
    "Explain the repository design pattern"
  ],
  verification: [
    "Generate test cases for login functionality",
    "How to perform efficient regression testing?",
    "Strategies for automated UI testing"
  ],
  deploy: [
    "Checklist for production deployment",
    "How to implement blue-green deployment",
    "Best practices for monitoring in production"
  ]
};

const SDLCGemini = ({ currentPhase }: SDLCGeminiProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: `I'm your AI assistant for the ${currentPhase} phase. How can I help you today?`,
      sender: "gemini",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      const geminiMessage: Message = {
        id: `gemini-${Date.now()}`,
        content: `Here's some information about "${input}" related to the ${currentPhase} phase of SDLC. This would be replaced with an actual AI response in a production environment.`,
        sender: "gemini",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, geminiMessage]);
    }, 1000);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <BrainCircuit className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold">Gemini Assistant</h2>
        </div>
        <div className="text-sm text-muted-foreground">
          SDLC Phase: <span className="font-medium">{currentPhase}</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === "user"
                  ? "bg-synergy-purple text-white"
                  : "bg-secondary text-foreground"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mb-4">
        <p className="text-sm font-medium mb-2 text-muted-foreground flex items-center">
          <Sparkles className="h-3.5 w-3.5 mr-1.5" />
          Suggested questions:
        </p>
        <div className="flex flex-wrap gap-2">
          {phasePrompts[currentPhase].map((prompt, index) => (
            <button
              key={index}
              className="text-xs bg-secondary/50 text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full transition-colors"
              onClick={() => handleSuggestedPrompt(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask about this SDLC phase..."
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        />
        <Button type="button" onClick={handleSendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SDLCGemini;
