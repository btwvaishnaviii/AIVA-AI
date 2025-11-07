import { useState, useRef, useEffect } from "react";
import { AIChatMessage } from "@/components/AIChatMessage";
import { AIChatInput } from "@/components/AIChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { streamChat } from "@/utils/aiChat";
import { useToast } from "@/hooks/use-toast";

type Message = { role: "user" | "assistant"; content: string };

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    let assistantContent = "";
    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMessage],
        onDelta: updateAssistant,
        onDone: () => setIsLoading(false),
        onError: (error) => {
          setIsLoading(false);
          toast({
            title: "Error",
            description: error,
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen w-full flex-col relative overflow-hidden">
      {/* Stunning gradient background */}
      <div className="absolute inset-0 gradient-lovable animate-gradient"></div>
      <div className="absolute inset-0 gradient-mesh-lovable"></div>

      {/* Clean Minimal Header - Only show when conversation starts */}
      {messages.length > 0 && (
        <div className="relative flex items-center justify-start py-4 px-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <img
              src="logo.png"
              alt="Aiva Logo"
              className="h-9 w-9 rounded-xl shadow-lg"
            />
            <h1 className="text-2xl font-normal text-white tracking-tight">
              Aiva
            </h1>
          </div>
        </div>
      )}

      {/* Messages */}
      <ScrollArea
        className="relative flex-1 px-6 py-6"
        centerContent={messages.length === 0}
      >
        <div className="max-w-5xl mx-auto">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-380px)] text-center space-y-12 animate-in fade-in duration-1000 pt-16">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  <img
                    src="logo.png"
                    alt="Aiva Logo"
                    className="h-5 w-5 rounded-lg"
                  />
                  <span className="text-sm text-white/90 font-medium">
                    Introducing Aiva AI Assistant
                  </span>
                </div>
                <h2 className="text-6xl md:text-7xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] px-4">
                  Your complete friend{" "}
                  <span className="inline-flex items-center gap-4 ml-2">
                    <img
                      src="logo.png"
                      alt="Aiva Logo"
                      className="h-14 w-14 rounded-xl shadow-lg"
                    />
                    <span className="bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                      Aiva
                    </span>
                  </span>
                </h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                  Talk to me about anything. I'm here to help you with
                  everything
                </p>
              </div>
            </div>
          )}
          {messages.map((message, idx) => (
            <AIChatMessage
              key={idx}
              message={message}
              isTyping={
                isLoading &&
                idx === messages.length - 1 &&
                message.role === "assistant"
              }
            />
          ))}
          {isLoading &&
            messages.length > 0 &&
            messages[messages.length - 1]?.role === "user" && (
              <TypingIndicator />
            )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input - Lovable Style */}
      <div className="relative pb-12">
        <AIChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;
