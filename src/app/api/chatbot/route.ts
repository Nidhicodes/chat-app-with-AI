import { NextRequest, NextResponse } from 'next/server';
import { getChatbotResponse } from '@/chatbotService'; 

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    console.log('Received message:', message); 

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const response = await getChatbotResponse(message);
    console.log('Chatbot response:', response); 
    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to get response from chatbot:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
