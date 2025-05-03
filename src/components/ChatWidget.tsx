
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
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
    
    // Simulate "typing" delay before response
    setTimeout(() => {
      const botResponses = [
        "Thanks for your message! I'll get back to you soon.",
        "I appreciate you reaching out! I'll respond as soon as possible.",
        "Thanks for connecting! I'll review your message and respond shortly.",
        "Got your message! I'm currently working on projects but will reply soon."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const kawakiMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'kawaki',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, kawakiMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button 
        onClick={toggleChat} 
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-neon text-black shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 animate-glow"
        aria-label="Chat with KAWAKI"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent 
          className="w-[90vw] sm:w-[380px] sm:max-w-md border-neon/30 bg-background/95 backdrop-blur"
          side="right"
        >
          <SheetHeader className="border-b border-neon/20 pb-4">
            <SheetTitle className="text-neon flex items-center gap-2">
              <MessageCircle size={18} /> Chat with KAWAKI
            </SheetTitle>
          </SheetHeader>
          
          {/* Messages Area */}
          <ScrollArea className="h-[calc(100vh-180px)] py-4 pr-4">
            <div className="flex flex-col gap-3">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <p>Send a message to start the conversation!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`max-w-[85%] ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}
                  >
                    <div 
                      className={`rounded-lg px-4 py-2 shadow-md ${
                        msg.sender === 'user' 
                          ? 'bg-neon text-black ml-auto' 
                          : 'bg-secondary border border-neon/20'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <p className={`text-xs mt-1 text-gray-400 ${
                      msg.sender === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Message Input */}
          <form 
            onSubmit={handleSendMessage} 
            className="absolute bottom-0 left-0 right-0 border-t border-neon/20 p-4 bg-background/95"
          >
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow bg-background border-neon/30 focus:border-neon focus:ring-1 focus:ring-neon"
              />
              <Button 
                type="submit" 
                size="icon"
                className="bg-neon text-black hover:bg-neon/90"
              >
                <Send size={18} />
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ChatWidget;
