import { supabase, ContactMessage, ChatMessage } from './supabase'

export class MessageService {
  // Envoyer un message de contact
  static async sendContactMessage(message: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{
          ...message,
          status: 'new',
          created_at: new Date().toISOString()
        }])
        .select()

      if (error) {
        console.error('Error sending contact message:', error)
        throw new Error('Failed to send message')
      }

      return data?.[0]
    } catch (error) {
      console.error('Error in sendContactMessage:', error)
      throw error
    }
  }

  // Envoyer un message de chat
  static async sendChatMessage(message: Omit<ChatMessage, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{
          ...message,
          created_at: new Date().toISOString()
        }])
        .select()

      if (error) {
        console.error('Error sending chat message:', error)
        throw new Error('Failed to send chat message')
      }

      return data?.[0]
    } catch (error) {
      console.error('Error in sendChatMessage:', error)
      throw error
    }
  }

  // Récupérer les messages de chat d'une session
  static async getChatMessages(sessionId: string) {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching chat messages:', error)
        throw new Error('Failed to fetch chat messages')
      }

      return data || []
    } catch (error) {
      console.error('Error in getChatMessages:', error)
      throw error
    }
  }

  // Générer un ID de session unique
  static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
} 