export type Resume = {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    website?: string;
    location: string;
    linkedIn?: string;
    github?: string;
  };
  education: {
    institution: string;
    degree: string;
    startDate: string;
    endDate?: string;
  }[];

  workExperience: {
    company: string;
    location: "Remote" | "On-site" | "Hybrid";
    position: string;
    startDate: string;
    endDate?: string;
    achievements?: string[];
  }[];
  projects: {
    title: string;
    link?: string;
    skills?: string[];
    features?: string[];
  }[];

  skills: {
    category: string;
    items: string[];
  }[];
  certifications: {
    title: string;
    issuer: string;
    date: string;
    link?: string;
  }[];
  achievements: {
    position: number;
    event: string;
    heldAt: string;
  }[];
};
