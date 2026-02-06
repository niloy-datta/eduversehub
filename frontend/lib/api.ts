const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = unknown> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: Array<{ msg: string; path: string }>;
}

interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  languagePreference: string;
  typingLevel: number;
  wpmBest: number;
  accuracyAvg: number;
  totalTypingTime: number;
  streakDays: number;
  totalPoints: number;
  badges: string[];
  isPremium: boolean;
  premiumUntil?: string;
  createdAt: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface TypingResult {
  id: string;
  wpm: number;
  accuracy: number;
  duration: number;
  characters: number;
  mode: string;
  createdAt: string;
}

class ApiClient {
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();
      
      if (!response.ok) {
        return {
          status: 'error',
          message: data.message || 'An error occurred',
          errors: data.errors,
        };
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        status: 'error',
        message: 'Network error. Please check your connection.',
      };
    }
  }

  // Auth endpoints
  async register(email: string, name: string, password: string): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, name, password }),
    });
  }

  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getProfile(): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/auth/me');
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Typing results endpoints
  async saveTypingResult(result: Omit<TypingResult, 'id' | 'createdAt'>): Promise<ApiResponse<TypingResult>> {
    return this.request<TypingResult>('/typing/results', {
      method: 'POST',
      body: JSON.stringify(result),
    });
  }

  async getTypingHistory(limit = 20): Promise<ApiResponse<{ results: TypingResult[] }>> {
    return this.request<{ results: TypingResult[] }>(`/typing/results?limit=${limit}`);
  }

  async getStatistics(): Promise<ApiResponse<{
    totalTests: number;
    avgWpm: number;
    avgAccuracy: number;
    bestWpm: number;
    totalTime: number;
    weeklyProgress: number[];
  }>> {
    return this.request('/typing/statistics');
  }

  // Leaderboard
  async getLeaderboard(mode = 'all', period = 'week', limit = 50): Promise<ApiResponse<{
    rankings: Array<{
      rank: number;
      user: Pick<User, 'id' | 'name' | 'avatarUrl'>;
      wpm: number;
      accuracy: number;
    }>;
  }>> {
    return this.request(`/leaderboard?mode=${mode}&period=${period}&limit=${limit}`);
  }
}

export const api = new ApiClient();
export type { User, AuthResponse, TypingResult, ApiResponse };
