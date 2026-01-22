import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { client } from '../client';

export interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
    mockLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = client.getSupabaseClient();

        if (!supabase) {
            console.warn('Supabase client not initialized in AuthProvider');
            setLoading(false);
            return;
        }

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        const supabase = client.getSupabaseClient();
        if (supabase) {
            await supabase.auth.signOut();
        }
        // Force clear for mock
        setSession(null);
        setUser(null);
    };

    const mockLogin = () => {
        const mockUser = {
            id: 'mock-admin',
            email: 'admin@test.com',
            aud: 'authenticated',
            role: 'authenticated',
            app_metadata: {},
            user_metadata: {},
            created_at: new Date().toISOString()
        } as User;

        const mockSession = {
            user: mockUser,
            access_token: 'mock-token',
            refresh_token: 'mock-refresh',
            expires_in: 3600,
            token_type: 'bearer'
        } as Session;

        setSession(mockSession);
        setUser(mockUser);
    };

    return (
        <AuthContext.Provider value={{ session, user, loading, signOut, mockLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
