import express, { Request, Response } from 'express';
import { createChatCompletion } from './llm/createChatCompletion';
import { supportTicketService, messageDb, Email } from './services';


interface MessageRequest {
  userId: string;
  message: string;
}

interface EmailRequest {
  emails: Email[]
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/chat', async (req: Request, res: Response) => {
  try {
    const { userId, message } = req.body as MessageRequest;

    if (!userId || !message) {
      res.status(400).json({ error: 'userId and message are required' });
    }

    await messageDb.create({ userId, content: message, role: 'user' });
    const llmResponse = await createChatCompletion(message);
    await messageDb.create({ userId, content: llmResponse, role: 'assistant' });

    res.json({ reply: llmResponse });
  } catch(error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/emails', async (req: Request, res: Response) => {
  try {
    const { emails } = req.body as EmailRequest;

    if (!emails) {
      res.status(400).json({ error: 'emails are required' });
    }

    for (const email of emails) {
      
      const ticketData = {
        emails: [email],
        type: 'support' as const,
      };

      await supportTicketService.createTicket(ticketData);
    }
    
    console.log(await supportTicketService.getAllTickets())

    res.json({ success: true });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 