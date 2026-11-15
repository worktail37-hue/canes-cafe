import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, MapPin, Globe, Loader2, Bot, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Array<{ title: string; url: string; type: 'web' | 'maps' }>;
  groundedWith?: string;
  timestamp: string;
}

export const GeminiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hello! I'm your Cane's Coffee Sommelier & Concierge. Ask me about our micro-batch roasts, flavor pairings for our morning viennoiseries, brew recommendations, or directions to our cafe!",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for multi-turn
      const historyPayload = [...messages, userMsg].map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        content: m.content,
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyPayload }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `${Date.now()}-bot`,
        role: 'assistant',
        content: data.reply || "I'm savoring the aroma... Let me check that for you.",
        citations: data.citations || [],
        groundedWith: data.groundedWith,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-err`,
          role: 'assistant',
          content: 'Sorry, I had a brief connection delay. Please ask again.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <>
      {/* Floating Launcher Trigger */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#3B322C] text-[#F3EEE7] shadow-2xl hover:bg-[#2A231E] border border-[#8C7B6E]/40 active:scale-95 transition-all duration-200"
          aria-label="Open Cane's AI Sommelier Chat"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-[#C9A24B]" />
            <Sparkles className="w-2.5 h-2.5 text-[#C9A24B] absolute -top-1 -right-1" />
          </div>
          <span className="font-serif font-bold text-xs uppercase tracking-wider hidden sm:inline">
            AI Barista Sommelier
          </span>
        </button>
      </div>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div
          className="fixed bottom-20 left-4 sm:left-6 z-50 w-[92vw] sm:w-[420px] max-h-[82vh] h-[580px] bg-[#F4F0EA] rounded-3xl border border-[#D6CCBE] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 text-[#2F2823]"
          role="dialog"
          aria-label="Cane's Coffee AI Chat"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#3B322C] text-[#F3EEE7] flex items-center justify-between border-b border-[#2A231E]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#2A231E] text-[#C9A24B] flex items-center justify-center border border-[#8C7B6E]/40">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm tracking-wide text-[#F3EEE7] flex items-center gap-1.5">
                  <span>Cane's Barista Sommelier</span>
                  <Sparkles className="w-3 h-3 text-[#C9A24B]" />
                </h3>
                <p className="text-[11px] text-[#D6CCBE]/80 flex items-center gap-1">
                  <span>Powered by Gemini</span>
                  <span aria-hidden="true">·</span>
                  <span>Search & Maps Grounded</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#D6CCBE] hover:text-[#F3EEE7] rounded-full hover:bg-[#2A231E] transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-[#E9E3DA] px-3 py-2 border-b border-[#D6CCBE] overflow-x-auto no-scrollbar flex items-center gap-2">
            <button
              onClick={() => handleQuickPrompt('What coffee pairs best with the Basque Cheesecake?')}
              className="text-[11px] whitespace-nowrap px-3 py-1 rounded-full bg-white/80 hover:bg-white text-[#3B322C] border border-[#D6CCBE] transition-colors"
            >
              Cheesecake pairing?
            </button>
            <button
              onClick={() => handleQuickPrompt('Give me walking directions and location of Cane\'s Coffee.')}
              className="text-[11px] whitespace-nowrap px-3 py-1 rounded-full bg-white/80 hover:bg-white text-[#3B322C] border border-[#D6CCBE] transition-colors"
            >
              Map & directions
            </button>
            <button
              onClick={() => handleQuickPrompt('What is your coffee roasting philosophy and bean profiles?')}
              className="text-[11px] whitespace-nowrap px-3 py-1 rounded-full bg-white/80 hover:bg-white text-[#3B322C] border border-[#D6CCBE] transition-colors"
            >
              Roasting Craft &amp; Notes
            </button>
            <button
              onClick={() => handleQuickPrompt('Explain the flavor notes of Ethiopian Yirgacheffe.')}
              className="text-[11px] whitespace-nowrap px-3 py-1 rounded-full bg-white/80 hover:bg-white text-[#3B322C] border border-[#D6CCBE] transition-colors"
            >
              Yirgacheffe notes
            </button>
          </div>

          {/* Scrollable Messages Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#3B322C] text-[#C9A24B] flex items-center justify-center shrink-0 text-xs font-bold">
                    ☕
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-[#3B322C] text-[#F3EEE7] rounded-tr-xs'
                      : 'bg-white text-[#2F2823] border border-[#D6CCBE] rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {/* Grounding Source Citations (Search / Maps) */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[#D6CCBE]/60 text-[11px] space-y-1">
                      <div className="flex items-center gap-1 text-[#8C7B6E] font-medium">
                        {msg.groundedWith === 'Google Maps' ? (
                          <MapPin className="w-3 h-3 text-[#C9A24B]" />
                        ) : (
                          <Globe className="w-3 h-3 text-[#C9A24B]" />
                        )}
                        <span>Grounded Sources:</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {msg.citations.map((cite, i) => (
                          <a
                            key={i}
                            href={cite.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#3B322C] hover:text-[#C9A24B] underline truncate max-w-full block"
                          >
                            🔗 {cite.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      msg.role === 'user' ? 'text-[#D6CCBE]/70' : 'text-[#8C7B6E]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#8C7B6E] text-white flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#8C7B6E] p-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#3B322C]" />
                <span>Barista Sommelier is researching tasting notes...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#E9E3DA] border-t border-[#D6CCBE] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about roasts, pairings, directions..."
              className="flex-1 px-4 py-2.5 rounded-full bg-white border border-[#D6CCBE] text-xs sm:text-sm text-[#2F2823] placeholder-[#8C7B6E] focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-full bg-[#3B322C] text-[#F3EEE7] hover:bg-[#2A231E] disabled:opacity-40 transition-colors shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
