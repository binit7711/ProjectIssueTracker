import { Issue } from '../issue/issue.model';

export type Project = {
  id: string;
  name: string;
  description: string;
  ownerName: string;
  issues: Issue[];
};
