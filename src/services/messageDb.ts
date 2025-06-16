import { DemoRepository } from "../utils/repository";

export interface Message {
  id: string;
  content: string;
  role: 'assistant' | 'user';
  userId: string
}

export const messageDb = new DemoRepository<Message>();