import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Sparkles } from "lucide-react";

interface AIChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const AIChatInput = ({
  onSendMessage,
  isLoading,
  disabled,
}: AIChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 blur-2xl rounded-3xl group-focus-within:opacity-60 transition duration-500"></div>
          <div className="relative flex items-center gap-3 bg-black/60 border border-white/30 rounded-3xl p-4 backdrop-blur-2xl shadow-2xl">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Aiva anything..."
              className="min-h-[56px] max-h-36 resize-none border-0 bg-transparent text-base text-white/90 placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
              rows={1}
              disabled={isLoading || disabled}
            />

            <Button
              onClick={handleSend}
              size="icon"
              className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
              disabled={!message.trim() || isLoading || disabled}
            >
              {isLoading ? (
                <Loader2
                  className="h-5 w-5 animate-spin text-white"
                  strokeWidth={2.5}
                />
              ) : (
                <Send className="h-5 w-5 text-white" strokeWidth={2.5} />
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 pb-1">
          <Sparkles className="h-3.5 w-3.5 text-white/40" />
          <p className="text-sm text-white/40">
            Powered by advanced AI • Can make mistakes
          </p>
        </div>
      </div>
    </div>
  );
};
