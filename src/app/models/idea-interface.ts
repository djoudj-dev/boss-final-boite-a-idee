export interface Idea {
  id: string;
  title: string;
  description: string;
  status: IdeaStatus;
  createdAt: Date;
}

export type IdeaStatus = 'IDEA' | 'ARCHIVED';
export type CreateIdeaDto = Omit<Idea, 'id' | 'status' | 'createdAt'>;
