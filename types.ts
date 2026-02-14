
export interface LeetCodeStats {
  username: string;
  githubUrl: string;
  twitterUrl: string;
  profile: {
    userAvatar: string;
    realName: string;
    ranking: number;
    postViewCount: number;
    solutionCount: number;
  };
  submitStats: {
    acSubmissionNum: Array<{
      difficulty: string;
      count: number;
      submissions: number;
    }>;
  };
}

export interface LeetCodeDaily {
  date: string;
  link: string;
  question: {
    questionId: string;
    title: string;
    titleSlug: string;
    difficulty: string;
  };
}

export interface GitHubRepo {
  name: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  image: string;
  category: 'Distributed Systems' | 'Computer Vision' | 'Web' | 'Other';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface LanguageStat {
  name: string;
  percent: number;
  color: string;
}