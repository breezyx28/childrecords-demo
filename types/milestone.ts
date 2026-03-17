export type MilestoneCategoryProps = {
  id: number;
  name: string;
  milestones: number;
  child_progress: string;
  [index:string]:any
};

export type MilestoneCategoryMilestoneProps = {
  id: number;
  title?: string;
  name?: string;
  description?: string;
  about?: string;
  age_range?: string;
  completed: boolean;
  completion_date?: string | null;
  activities_count?: number;
  tips_count?: number;
  articles_count?: number;
  activities?: number;
  [index: string]: any;
};
