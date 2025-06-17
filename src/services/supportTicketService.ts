import { makeId } from "../utils/makeId";
import { DemoRepository, Repository } from "../utils/repository";

export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  draft?: boolean;
}

export interface SupportTicket {
  id: string;
  emails: Email[];
  type: 'support' | 'billing';
  metaData?: {
    [key: string]: any;
  }
}

class SupportTicketService {
  private tickets: Repository<SupportTicket>;
  
  constructor() {
    this.tickets = new DemoRepository();
  }

  async createTicket(ticketData: Omit<SupportTicket, 'id'>): Promise<SupportTicket> {
    return this.tickets.create(ticketData);
  }

  async createManyTickets(ticketsData: Omit<SupportTicket, 'id'>[]): Promise<SupportTicket[]> {
    const createdTickets: SupportTicket[] = [];
    
    for (const ticketData of ticketsData) {
      const ticket = await this.tickets.create(ticketData);
      createdTickets.push(ticket);
    }
    
    return createdTickets;
  }

  async getTicket(id: string): Promise<SupportTicket | undefined> {
    return this.tickets.get(id);
  }

  async getAllTickets(): Promise<SupportTicket[]> {
    return this.tickets.list();
  }
  
  async getTicketsByType(type: 'support' | 'billing'): Promise<SupportTicket[]> {
    const tickets = await this.tickets.list();
    return tickets.filter(ticket => ticket.type === type);
  }

  async addDraftReply(ticketId: string, draftEmail: Omit<Email, 'id' | 'draft'>): Promise<SupportTicket> {
    const ticket = await this.getTicket(ticketId);
    if (!ticket) {
      throw new Error(`Ticket ${ticketId} not found`);
    }

    const emailWithId: Email = {
      ...draftEmail,
      id: makeId(),
      draft: true
    };

    const updatedEmails = [...ticket.emails, emailWithId];
    return this.tickets.update(ticketId, { emails: updatedEmails });
  }

  async approveDraft(ticketId: string, emailId: string): Promise<SupportTicket> {
    const ticket = await this.getTicket(ticketId);
    if (!ticket) {
      throw new Error(`Ticket ${ticketId} not found`);
    }

    const updatedEmails = ticket.emails.map(email =>
      email.id === emailId && email.draft
        ? { ...email, draft: false }
        : email
    );

    return this.tickets.update(ticketId, { emails: updatedEmails });
  }

  async getTicketsWithDrafts(): Promise<SupportTicket[]> {
    const tickets = await this.tickets.list();
    return tickets.filter(ticket =>
      ticket.emails.some(email => email.draft === true)
    );
  }
}

export const supportTicketService = new SupportTicketService();