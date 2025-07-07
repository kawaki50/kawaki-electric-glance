
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { MessageService } from '@/lib/messageService';
import { ChatMessage } from '@/lib/supabase';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'kawaki';
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Initialiser la session de chat
  useEffect(() => {
    if (!sessionId) {
      setSessionId(MessageService.generateSessionId());
    }
  }, [sessionId]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    try {
      // Sauvegarder le message utilisateur dans la base de données
      await MessageService.sendChatMessage({
        text: newMessage,
        sender: 'user',
        session_id: sessionId,
        timestamp: new Date().toISOString()
      });
      
      // Simulate "typing" delay before response
      setTimeout(async () => {
        setIsTyping(false);
        const botResponses = [
          "Thanks for your message! I'll get back to you soon. 🚀",
          "I appreciate you reaching out! I'll respond as soon as possible. ✨",
          "Thanks for connecting! I'm currently working on projects but will reply shortly. 💻",
          "Got your message! I'm coding away but will get back to you soon. 🔥"
        ];
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        const kawakiMessage: Message = {
          id: Date.now() + 1,
          text: randomResponse,
          sender: 'kawaki',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, kawakiMessage]);
        
        // Sauvegarder la réponse du bot dans la base de données
        await MessageService.sendChatMessage({
          text: randomResponse,
          sender: 'kawaki',
          session_id: sessionId,
          timestamp: new Date().toISOString()
        });
      }, 2000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Chat Button with Enhanced Styling */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          {/* Pulse Ring Animation */}
          <div className={`absolute inset-0 rounded-full bg-neon/20 animate-ping ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
          <div className={`absolute inset-0 rounded-full bg-neon/10 animate-pulse ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
          
          <button 
            onClick={toggleChat} 
            className="relative w-16 h-16 rounded-full bg-gradient-to-r from-neon to-neon/80 text-black shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-12 group overflow-hidden"
            aria-label="Chat with KAWAKI"
          >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            
            {/* Icon with Transition */}
            <div className="relative z-10 transition-transform duration-300">
              {isOpen ? (
                <X size={28} className="animate-in spin-in-90 duration-300" />
              ) : (
                <MessageCircle size={28} className="animate-in zoom-in-50 duration-300" />
              )}
            </div>
            
            {/* Sparkle Effect */}
            <Sparkles className="absolute top-1 right-1 w-4 h-4 text-yellow-300 animate-pulse opacity-60" />
          </button>
        </div>
      </div>

      {/* Enhanced Chat Window */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent 
          className="w-[95vw] sm:w-[420px] sm:max-w-md border-0 bg-gradient-to-b from-background via-background/95 to-background/90 backdrop-blur-xl shadow-2xl"
          side="right"
        >
          {/* Header with Gradient */}
          <SheetHeader className="border-b border-neon/20 pb-4 bg-gradient-to-r from-neon/10 to-transparent rounded-t-lg -m-6 mb-4 p-6">
            <SheetTitle className="text-neon flex items-center gap-3 text-xl font-bold">
              <div className="relative">
                <MessageCircle size={24} className="animate-pulse" />
                <div className="absolute inset-0 bg-neon/20 rounded-full animate-ping"></div>
              </div>
              Chat with KAWAKI
              <div className="flex gap-1 ml-auto">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-neon rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </SheetTitle>
          </SheetHeader>
          
          {/* Messages Area with Enhanced Styling */}
          <ScrollArea className="h-[calc(100vh-200px)] py-4 pr-4">
            <div className="flex flex-col gap-4">
              {messages.length === 0 ? (
                <div className="text-center py-12 animate-fade-in">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-r from-neon/20 to-neon/10 rounded-full flex items-center justify-center animate-pulse">
                      <MessageCircle size={32} className="text-neon" />
                    </div>
                    <div className="absolute inset-0 bg-neon/5 rounded-full animate-ping"></div>
                  </div>
                  <p className="text-muted-foreground text-lg mb-2">Hey there! 👋</p>
                  <p className="text-sm text-gray-400">Send me a message to start our conversation!</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div 
                    key={msg.id} 
                    className={`max-w-[85%] animate-in slide-in-from-bottom-2 duration-500 ${
                      msg.sender === 'user' ? 'self-end' : 'self-start'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div 
                      className={`rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                        msg.sender === 'user' 
                          ? 'bg-gradient-to-r from-neon to-neon/90 text-black ml-auto shadow-neon/25' 
                          : 'bg-gradient-to-r from-secondary to-secondary/80 border border-neon/30 shadow-neon/10'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    <p className={`text-xs mt-2 text-gray-400 ${
                      msg.sender === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                ))
              )}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="max-w-[85%] self-start animate-in slide-in-from-bottom-2 duration-300">
                  <div className="bg-gradient-to-r from-secondary to-secondary/80 border border-neon/30 rounded-2xl px-4 py-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-neon rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-neon rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-neon rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className="text-xs text-gray-400">KAWAKI is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Enhanced Message Input */}
          <form 
            onSubmit={handleSendMessage} 
            className="absolute bottom-0 left-0 right-0 border-t border-neon/20 p-4 bg-gradient-to-r from-background/95 to-background/90 backdrop-blur-xl"
          >
            <div className="flex gap-3 items-end">
              <div className="flex-grow relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="bg-secondary/50 border-neon/30 focus:border-neon focus:ring-2 focus:ring-neon/20 rounded-2xl px-4 py-3 pr-12 backdrop-blur-sm transition-all duration-300 hover:bg-secondary/70"
                />
                {/* Input Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <Button 
                type="submit" 
                size="icon"
                className="bg-gradient-to-r from-neon to-neon/90 text-black hover:from-neon/90 hover:to-neon shadow-lg hover:shadow-neon/25 transition-all duration-300 hover:scale-110 rounded-2xl w-12 h-12"
                disabled={!newMessage.trim()}
              >
                <Send size={20} className="transition-transform duration-200 hover:translate-x-0.5" />
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ChatWidget;
