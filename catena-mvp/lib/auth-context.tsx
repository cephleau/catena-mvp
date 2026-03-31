'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from './supabase-client'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  // Initialize auth state from localStorage and Supabase
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for existing session in localStorage
        const storedUser = localStorage.getItem('catena_user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }

        // Get current session from Supabase
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          // Fetch full user profile from database
          const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profileError) throw profileError
          if (profile) {
            setUser(profile as User)
            localStorage.setItem('catena_user', JSON.stringify(profile))
          }
        } else {
          setUser(null)
          localStorage.removeItem('catena_user')
        }
      } catch (err) {
        console.error('Auth init error:', err)
        setUser(null)
        localStorage.removeItem('catena_user')
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          setUser(profile as User)
          localStorage.setItem('catena_user', JSON.stringify(profile))
        }
      } else {
        setUser(null)
        localStorage.removeItem('catena_user')
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    try {
      setError(null)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('Sign up failed')

      // Create user profile in database
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email,
            full_name: userData.full_name || '',
            phone: userData.phone || '',
            role: userData.role || 'client',
            is_active: true,
            is_verified: false,
          },
        ])
        .select()
        .single()

      if (profileError) throw profileError
      if (profile) {
        setUser(profile as User)
        localStorage.setItem('catena_user', JSON.stringify(profile))
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign up failed'
      setError(message)
      throw err
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError
      if (!data.user) throw new Error('Sign in failed')

      // Fetch full user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (profileError) throw profileError
      if (profile) {
        setUser(profile as User)
        localStorage.setItem('catena_user', JSON.stringify(profile))
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign in failed'
      setError(message)
      throw err
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) throw signOutError
      setUser(null)
      localStorage.removeItem('catena_user')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign out failed'
      setError(message)
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
