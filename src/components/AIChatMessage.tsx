import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

export const AIChatMessage = ({ message, isTyping }: AIChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-4 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar
        className={cn(
          "h-9 w-9 shrink-0 transition-all duration-300 shadow-lg",
          isUser ? "bg-gradient-to-br from-white to-gray-100" : "bg-transparent"
        )}
      >
        <AvatarFallback className="bg-transparent">
          {isUser ? (
            <User className="h-4 w-4 text-gray-700" strokeWidth={2.5} />
          ) : (
            <img src="logo.png" alt="Aiva" className="h-9 w-9 rounded-full" />
          )}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn("flex flex-col gap-2 max-w-[70%]", isUser && "items-end")}
      >
        <div
          className={cn(
            "rounded-2xl px-5 py-3 transition-all duration-300",
            isUser
              ? "bg-white/95 text-gray-900 shadow-lg backdrop-blur-sm"
              : "bg-black/50 border border-white/20 text-white/95 backdrop-blur-xl shadow-xl"
          )}
        >
          <p
            className={cn(
              "text-[15px] leading-relaxed whitespace-pre-wrap break-words",
              isTyping && !isUser && "typewriter-cursor"
            )}
          >
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
};
