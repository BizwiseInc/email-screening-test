import { DemoRepository, Repository } from "../utils/repository";

export interface Email {
  id: string;
  to: string;
  from: string;
  subject: string;
  body: string;
  classification: 'support' | 'billing' | 'spam';
}

export type CreateEmailRequest = Omit<Email, 'id'>;

class EmailService {
  private email: Repository<Email>
  
  constructor() {
    this.email = new DemoRepository();
  }

  async createEmail(emailData: CreateEmailRequest): Promise<Email> {
    return this.email.create(emailData);
  }

  async getAllEmails(): Promise<Email[]> {
    return this.email.list();
  }

  async getEmailById(id: string): Promise<Email | undefined> {
    return this.email.get(id);
  }

  async getEmailsByClassification(classification: string): Promise<Email[]> {
    const emails = await this.email.list();
    return emails.filter(email => email.classification === classification);
  }

  async getEmailsByTo(toAddress: string): Promise<Email[]> {
    const emails = await this.email.list();
    return emails.filter(email => email.to === toAddress);
  }

  async getEmailsByFrom(fromAddress: string): Promise<Email[]> {
    const emails = await this.email.list();
    return emails.filter(email => email.from === fromAddress);
  }
}

export const emailService = new EmailService();