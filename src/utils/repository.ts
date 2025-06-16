import { makeId } from "./makeId";

export interface Repository<T extends { id: string }> {
  get(id: string): Promise<T | undefined>;
  list(): Promise<T[]>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: string, patch: Partial<Omit<T, 'id'>>): Promise<T>;
  delete(id: string): Promise<void>;
  
}

export class DemoRepository<T extends { id: string }> implements Repository<T> {
  private readonly store = new Map<string, T>();

  constructor(seed: T[] = []) {
    seed.forEach((e) => this.store.set(e.id, e));
  }

  async get(id: string) { return this.store.get(id); }
  
  async list() { return [...this.store.values()]; }
  
  async create(data: Omit<T, 'id'>) {
    const entity = { ...data, id: makeId() } as T;
    this.store.set(entity.id, entity);
    return entity;
  }

  async update(id: string, patch: Partial<Omit<T, 'id'>>) {
    const curr = this.store.get(id);
    if (!curr) throw new Error('Not found');
    const next = { ...curr, ...patch };
    this.store.set(id, next);
    return next;
  }
  
  async delete(id: string) { this.store.delete(id); }
}