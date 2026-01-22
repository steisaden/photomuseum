import { useState, useEffect } from 'react';
import { client } from '@shared/client';
import { Button } from '../ui/button';
import { RefreshCw, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function PrintifySettings() {
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSync, setLastSync] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Load last sync time from localStorage for now
        const cached = localStorage.getItem('printify_last_sync');
        if (cached) setLastSync(cached);
    }, []);

    const handleSync = async () => {
        setIsSyncing(true);
        setStatus('idle');
        setMessage('');

        const apiKey = localStorage.getItem('printify_api_key') || undefined;

        try {
            const result = await client.syncPrintifyProducts(apiKey);

            if (result.success) {
                setStatus('success');
                setMessage(`Successfully synced ${result.count} products.`);
                const now = new Date().toLocaleString();
                setLastSync(now);
                localStorage.setItem('printify_last_sync', now);
            } else {
                setStatus('error');
                setMessage(result.error || 'Sync failed. Please try again.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('An unexpected error occurred.');
            console.error(error);
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Printify Integration</h1>
                <p className="text-muted-foreground">
                    Manage your connection with Printify and synchronize your product catalog.
                </p>
            </div>

            <div className="grid gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="space-y-1">
                            <h2 className="font-semibold text-lg">Catalog Synchronization</h2>
                            <p className="text-sm text-muted-foreground">
                                Pull the latest products and inventory data from Printify.
                            </p>
                        </div>
                        <Button
                            onClick={handleSync}
                            disabled={isSyncing}
                            className="min-w-[140px]"
                        >
                            {isSyncing ? (
                                <>
                                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                    Syncing...
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Sync Now
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                            <span className="text-sm font-medium">Last Successful Sync</span>
                            <span className="text-sm text-muted-foreground">
                                {lastSync || 'Never'}
                            </span>
                        </div>

                        {status === 'success' && (
                            <Alert className="bg-green-50 border-green-200 text-green-800">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertTitle>Sync Complete</AlertTitle>
                                <AlertDescription>{message}</AlertDescription>
                            </Alert>
                        )}

                        {status === 'error' && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Sync Failed</AlertTitle>
                                <AlertDescription>{message}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="font-semibold text-lg mb-4">Configuration</h2>
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Printify API Key</label>
                            <input
                                type="password"
                                placeholder="Enter your Printify API Token (Dev Only)"
                                className="px-3 py-2 bg-background border border-input rounded-md text-sm"
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val) localStorage.setItem('printify_api_key', val);
                                    else localStorage.removeItem('printify_api_key');
                                }}
                                defaultValue={localStorage.getItem('printify_api_key') || ''}
                            />
                            <p className="text-xs text-muted-foreground">
                                Leave blank to use the secure server-side environment variable.
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Printify Shop ID</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    readOnly
                                    value={import.meta.env.VITE_PRINTIFY_SHOP_ID || 'Not Configured'}
                                    className="flex-1 px-3 py-2 bg-muted/50 border border-input rounded-md text-sm text-muted-foreground"
                                />
                                <Button variant="outline" size="icon" asChild>
                                    <a href="https://printify.com/app/store/settings" target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                To change this, update your <code className="bg-muted px-1 py-0.5 rounded">.env.local</code> file.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
