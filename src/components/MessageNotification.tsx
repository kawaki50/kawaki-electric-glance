import React, { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useContactMessages } from '@/hooks/useMessages';

const MessageNotification = () => {
  const { data: messages, isLoading } = useContactMessages();
  const [showNotification, setShowNotification] = useState(false);
  const [newMessageCount, setNewMessageCount] = useState(0);

  useEffect(() => {
    if (messages) {
      const newMessages = messages.filter(msg => msg.status === 'new');
      setNewMessageCount(newMessages.length);
      setShowNotification(newMessages.length > 0);
    }
  }, [messages]);

  if (isLoading || !showNotification) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-background border border-neon/20 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-neon animate-pulse" />
            <span className="font-semibold text-foreground">Nouveaux Messages</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotification(false)}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Vous avez {newMessageCount} nouveau{newMessageCount > 1 ? 'x' : ''} message{newMessageCount > 1 ? 's' : ''} de contact.
          </p>
          
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                window.open('/admin', '_blank');
                setShowNotification(false);
              }}
              className="bg-neon text-black hover:bg-neon/90"
            >
              Voir les messages
            </Button>
            
            <Badge variant="outline" className="ml-auto">
              {newMessageCount}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageNotification; 