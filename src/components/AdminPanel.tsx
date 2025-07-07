import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/lib/supabase';
import { ContactMessage, ChatMessage } from '@/lib/supabase';
import { MessageCircle, Mail, Eye, CheckCircle, Clock, Bug } from 'lucide-react';
import { debugSupabaseConnection, checkEnvironmentVariables } from '@/lib/debugConnection';

const AdminPanel = () => {
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      
      // Récupérer les messages de contact
      const { data: contactData, error: contactError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactError) throw contactError;

      // Récupérer les messages de chat (groupés par session)
      const { data: chatData, error: chatError } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (chatError) throw chatError;

      setContactMessages(contactData || []);
      setChatMessages(chatData || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (messageId: string, status: 'read' | 'replied') => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', messageId);

      if (error) throw error;

      // Mettre à jour l'état local
      setContactMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, status } : msg
        )
      );
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="destructive" className="flex items-center gap-1"><Clock size={12} /> Nouveau</Badge>;
      case 'read':
        return <Badge variant="secondary" className="flex items-center gap-1"><Eye size={12} /> Lu</Badge>;
      case 'replied':
        return <Badge variant="default" className="flex items-center gap-1"><CheckCircle size={12} /> Répondu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const groupChatMessagesBySession = () => {
    const grouped: { [key: string]: ChatMessage[] } = {};
    chatMessages.forEach(msg => {
      if (!grouped[msg.session_id!]) {
        grouped[msg.session_id!] = [];
      }
      grouped[msg.session_id!].push(msg);
    });
    return grouped;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon"></div>
      </div>
    );
  }

  const handleDebugTest = async () => {
    console.log('🔧 Démarrage du test de débogage...');
    checkEnvironmentVariables();
    const result = await debugSupabaseConnection();
    console.log('📊 Résultat du test:', result);
    
    if (result.success) {
      alert('✅ Test réussi! Vérifiez la console pour plus de détails.');
    } else {
      alert(`❌ Test échoué: ${result.error}\n\nVérifiez la console pour plus de détails.`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-neon">Administration des Messages</h1>
        <Button
          onClick={handleDebugTest}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Bug size={16} />
          Test Connexion
        </Button>
      </div>
      
      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Mail size={16} />
            Messages de Contact ({contactMessages.length})
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle size={16} />
            Conversations ({Object.keys(groupChatMessagesBySession()).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="mt-6">
          <div className="grid gap-4">
            {contactMessages.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  Aucun message de contact reçu
                </CardContent>
              </Card>
            ) : (
              contactMessages.map((message) => (
                <Card key={message.id} className="border-neon/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{message.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(message.status!)}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateMessageStatus(message.id!, 'read')}
                          disabled={message.status === 'read'}
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateMessageStatus(message.id!, 'replied')}
                          disabled={message.status === 'replied'}
                        >
                          <CheckCircle size={14} />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {message.email} • {formatDate(message.created_at!)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{message.message}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <div className="grid gap-4">
            {Object.keys(groupChatMessagesBySession()).length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  Aucune conversation enregistrée
                </CardContent>
              </Card>
            ) : (
              Object.entries(groupChatMessagesBySession()).map(([sessionId, messages]) => (
                <Card key={sessionId} className="border-neon/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageCircle size={16} />
                      Session: {sessionId.slice(0, 8)}...
                    </CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {messages.length} messages • {formatDate(messages[0].created_at!)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      <div className="space-y-2">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`p-3 rounded-lg ${
                              msg.sender === 'user'
                                ? 'bg-neon/10 border border-neon/20 ml-4'
                                : 'bg-secondary/50 border border-secondary/20 mr-4'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium">
                                {msg.sender === 'user' ? '👤 Visiteur' : '🤖 KAWAKI'}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(msg.created_at!)}
                              </span>
                            </div>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel; 