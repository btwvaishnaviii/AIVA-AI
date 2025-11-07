import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const TypingIndicator = () => {
  return (
    <div
      className={cn(
        "flex gap-4 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500"
      )}
    >
      <Avatar className="h-9 w-9 shrink-0 transition-all duration-300 shadow-lg bg-transparent">
        <AvatarFallback className="bg-transparent">
          <img src="logo.png" alt="Aiva" className="h-9 w-9 rounded-full" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-2 max-w-[70%]">
        <div className="rounded-2xl px-5 py-3 transition-all duration-300 bg-black/50 border border-white/20 backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-1.5">
            <div className="flex gap-1">
              <span
                className="w-2 h-2 bg-white/70 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></span>
              <span
                className="w-2 h-2 bg-white/70 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></span>
              <span
                className="w-2 h-2 bg-white/70 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></span>
            </div>
            <span className="text-white/50 text-sm ml-1">Thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
