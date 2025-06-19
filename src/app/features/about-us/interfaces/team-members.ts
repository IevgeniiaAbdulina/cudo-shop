export interface TeamMemberInfo {
  name: string;
  role: string;
  contactGitHub: string;
  contactLinkedIn: string;
  contactEmail: string;
  resume: string;
  portfolio: string;
  image: string;
  bio: string;
  technicalSkills: TechStack[];
  contributions: ContributionsInfo;
  collaboration: CollaborationInfo;
}

export interface TechStack {
  tech: string;
  stack: string;
}

export interface ContributionsInfo {
  header: string;
  body: TableOfInfo[];
  footer: string;
}

export interface CollaborationInfo {
  header: string;
  body: TableOfInfo[];
  footer: string;
}

export type TeamMembers = TeamMemberInfo[];

export interface TableOfInfo {
  th: string;
  td: string[];
}
