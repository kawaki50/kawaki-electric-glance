import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MessageService } from '@/lib/messageService';
import { ContactMessage, ChatMessage } from '@/lib/supabase';

import { supabase } from '@/lib/supabase';

export const useContactMessages = () => {
  return useQuery({
    queryKey: ['contact-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ContactMessage[];
    },
    staleTime: 30000, // 30 secondes
  });
};

export const useChatMessages = (sessionId: string) => {
  return useQuery({
    queryKey: ['chat-messages', sessionId],
    queryFn: () => MessageService.getChatMessages(sessionId),
    enabled: !!sessionId,
    staleTime: 10000, // 10 secondes
  });
};

export const useSendContactMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: MessageService.sendContactMessage,
    onSuccess: () => {
      // Invalider et refetch les messages de contact
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
    },
  });
};

export const useSendChatMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: MessageService.sendChatMessage,
    onSuccess: (data) => {
      // Invalider et refetch les messages de chat pour cette session
      if (data?.session_id) {
        queryClient.invalidateQueries({ 
          queryKey: ['chat-messages', data.session_id] 
        });
      }
    },
  });
};

export const useUpdateMessageStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ messageId, status }: { messageId: string; status: 'read' | 'replied' }) => {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', messageId);
      
      if (error) throw error;
      return { messageId, status };
    },
    onSuccess: () => {
      // Invalider et refetch les messages de contact
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
    },
  });
}; 