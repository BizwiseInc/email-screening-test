import { DemoRepository } from "../utils/repository";

export type SupportTicket = {
  id: string;
  to: string;
  subject: string;
  body: string;
  type: 'support' | 'billing';
  category: string;
}

export const supportTicketService = new DemoRepository<SupportTicket> ();