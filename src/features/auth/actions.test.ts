import { login, register, logout } from './actions';
import { createClient } from '@/lib/clients/supabase/server';
import { AuthError } from '@supabase/supabase-js';

// Mock the supabase client
jest.mock('@/lib/clients/supabase/server', () => ({
  createClient: jest.fn(),
}));

describe('Auth Actions', () => {
  let mockSupabase: any;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup mock supabase client
    mockSupabase = {
      auth: {
        signInWithPassword: jest.fn(),
        signUp: jest.fn(),
        signOut: jest.fn(),
      },
    };
    
    (require('@/lib/clients/supabase/server').createClient as jest.Mock).mockReturnValue(mockSupabase);
  });

  describe('login', () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should login successfully with valid credentials', async () => {
      const mockResponse = { user: { id: '123', email: credentials.email } };
      mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({
        data: mockResponse,
        error: null,
      });

      const result = await login(credentials);

      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith(credentials);
      expect(result).toEqual({
        success: true,
        data: mockResponse,
      });
    });

    it('should handle login error', async () => {
      const errorMessage = 'Invalid login credentials';
      mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({
        data: null,
        error: new AuthError(errorMessage, 400),
      });

      const result = await login(credentials);

      expect(result).toEqual({
        success: false,
        error: errorMessage,
      });
    });
  });

  describe('register', () => {
    const userData = {
      email: 'new@example.com',
      password: 'password123',
      fullName: 'New User',
    };

    it('should register a new user successfully', async () => {
      const mockResponse = { user: { id: '456', email: userData.email } };
      mockSupabase.auth.signUp.mockResolvedValueOnce({
        data: mockResponse,
        error: null,
      });

      const result = await register(userData);

      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.fullName,
          },
        },
      });
      expect(result).toEqual({
        success: true,
        data: mockResponse,
      });
    });

    it('should handle registration error', async () => {
      const errorMessage = 'Email already in use';
      mockSupabase.auth.signUp.mockResolvedValueOnce({
        data: null,
        error: new AuthError(errorMessage, 400),
      });

      const result = await register(userData);

      expect(result).toEqual({
        success: false,
        error: errorMessage,
      });
    });
  });

  describe('logout', () => {
    it('should log out successfully', async () => {
      mockSupabase.auth.signOut.mockResolvedValueOnce({
        error: null,
      });

      const result = await logout();

      expect(mockSupabase.auth.signOut).toHaveBeenCalled();
      expect(result).toEqual({ success: true });
    });

    it('should handle logout error', async () => {
      const errorMessage = 'Logout failed';
      mockSupabase.auth.signOut.mockResolvedValueOnce({
        error: new Error(errorMessage),
      });

      const result = await logout();

      expect(result).toEqual({
        success: false,
        error: 'An error occurred during logout',
      });
    });
  });
});
