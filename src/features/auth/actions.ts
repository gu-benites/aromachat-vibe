'use server';

import { createClient } from '@/lib/clients/supabase/server';
import { z } from 'zod';
import { loginSchema, registerSchema } from './schemas/auth.schemas';
import { AuthError } from '@supabase/supabase-js';

/**
 * Server action to handle user login
 * @param credentials - User credentials (email and password)
 * @returns Promise with the login result
 */
export async function login(credentials: z.infer<typeof loginSchema>) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    
    if (error) {
      throw error;
    }
    
    return { success: true, data };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        error: error.message || 'An error occurred during login',
      };
    }
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Server action to handle user registration
 * @param userData - User registration data
 * @returns Promise with the registration result
 */
export async function register(userData: z.infer<typeof registerSchema>) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.fullName,
          // Add any additional user metadata here
        },
      },
    });

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        error: error.message || 'An error occurred during registration',
      };
    }
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Server action to handle user logout
 * @returns Promise with the logout result
 */
export async function logout() {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'An error occurred during logout',
    };
  }
}
