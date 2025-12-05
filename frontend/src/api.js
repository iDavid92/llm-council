/**
 * API client for the LLM Council backend.
 */

const API_BASE = 'https://llm-council-production.up.railway.app';

export const api = {
  /**
   * List all conversations.
   */
  async listConversations() {
    const response = await fetch(`${API_BASE}/api/conversations`);
    if (!response.ok) {
      throw new Error('Failed to list conversations');
    }
    return response.json();
  },

  /**
   * Create a new conversation.
   */
  async createConversation() {
    const response = await fetch(`${API_BASE}/api/conversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      throw new Error('Failed to create conversation');
    }
    return response.json();
  },

  /**
   * Get a specific conversation.
   */
  async getConversation(conversationId) {
    const response = await fetch(
      `${API_BASE}/api/conversations/${conversationId}`
    );
    if (!response.ok) {
      throw new Error('Failed to get conversation');
    }
    return response.json();
  },

  /**
   * Send a message in a conversation.
   */
  async sendMessage(conversationId, content) {
    const response = await fetch(
      `${API_BASE}/api/conversations/${conversationId}/message`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    return response.json();
  },

  /**
   * Send a message and receive streaming updates.
   * @param {string} conversationId - The conversation ID
   * @param {string} content - The message content
   * @param {function} onEvent - Callback function for each event: (eventType, data) => void
   * @returns {Promise<void>}
   */
  async sendMessageStream(conversationId, content, onEvent) {
    const response = await fetch(
      `${API_BASE}/api/conversations/${conversationId}/message/stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Lägg till ny chunk i buffern (stream: true för att hantera ev. uppdelade UTF-8-tecken)
      const chunkText = decoder.decode(value, { stream: true });
      buffer += chunkText;

      // Dela upp på radbrytningar
      const lines = buffer.split('\n');

      // Sista raden kan vara ofullständig → spara tillbaka i buffer
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;

        const data = line.slice(6).trim();
        if (!data) continue;

        try {
          const event = JSON.parse(data);
          // event.type kommer från backend: 'stage1_start', 'stage1_complete', etc.
          onEvent(event.type, event);
        } catch (e) {
          console.error('Failed to parse SSE event:', e, 'raw data:', data);
        }
      }
    }

    // Flush eventuell kvarvarande text i decoder + buffer
    const finalText = decoder.decode();
    if (finalText) {
      buffer += finalText;
    }

    if (buffer.trim().startsWith('data: ')) {
      const data = buffer.trim().slice(6).trim();
      if (data) {
        try {
          const event = JSON.parse(data);
          onEvent(event.type, event);
        } catch (e) {
          console.error('Failed to parse final SSE event:', e, 'raw data:', data);
        }
      }
    }
  },
};
