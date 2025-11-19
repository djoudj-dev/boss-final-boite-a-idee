import { Idea } from '../models/idea-interface';

export function isIdeaArchived(idea: Idea): boolean {
  return idea.status === 'ARCHIVED';
}
