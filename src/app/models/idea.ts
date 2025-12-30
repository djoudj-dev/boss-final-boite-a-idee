export interface Idea {
  id: string;
  title: string;
  description: string;
  status: IdeaStatus;
  createdAt: Date;
}

export type IdeaStatus = 'IDEA' | 'ARCHIVED';
export type CreateIdeaPayload = Pick<Idea, 'title' | 'description'>;
