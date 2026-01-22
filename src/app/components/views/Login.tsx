import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { client } from '../../../../shared/client';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const supabase = client.getSupabaseClient();
        if (!supabase) {
            setError('Authentication service is unavailable.');
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            navigate('/');
        }
        setLoading(false);
    };

    return (
        <div className="container mx-auto px-4 py-16 flex justify-center">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="font-heading text-3xl font-bold">Welcome back</h1>
                    <p className="mt-2 text-muted-foreground">
                        Sign in to your account
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <Link to="/signup" className="font-medium hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
