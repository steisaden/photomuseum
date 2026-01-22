import { CircleCheck, CircleAlert, RefreshCw, ExternalLink, Settings } from 'lucide-react';

export function PrintifyIntegration() {
  const connectionStatus = 'Connected';
  const lastSync = '5 minutes ago';

  const mappings = [
    { id: 1, product: 'Classic Logo Tee', printifyId: 'pr_12345', variants: 18, status: 'Synced' },
    { id: 2, product: 'Premium Hoodie', printifyId: 'pr_12346', variants: 24, status: 'Synced' },
    { id: 3, product: 'Summer Tank Top', printifyId: 'pr_12347', variants: 12, status: 'Pending' },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold mb-1">Printify Integration</h1>
        <p className="text-sm text-muted-foreground">Manage your Printify connection and sync settings</p>
      </div>

      {/* Connection Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="font-semibold mb-2">Connection Status</h2>
            <div className="flex items-center gap-2">
              {connectionStatus === 'Connected' ? (
                <>
                  <CircleCheck className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Connected to Printify</span>
                </>
              ) : (
                <>
                  <CircleAlert className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-600">Disconnected</span>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">Last sync: {lastSync}</p>
          </div>
          <button className="bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Settings className="w-4 h-4" />
            Configure
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Shop ID</p>
            <p className="font-mono text-sm">shop_abc123xyz</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">API Status</p>
            <p className="text-sm font-medium text-green-600">Active</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Webhook Status</p>
            <p className="text-sm font-medium text-green-600">Receiving</p>
          </div>
        </div>
      </div>

      {/* Sync Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-semibold mb-6">Sync Settings</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium mb-1">Auto-sync product costs</h3>
              <p className="text-sm text-muted-foreground">Automatically update product costs from Printify</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex-1">
              <h3 className="text-sm font-medium mb-1">Sync frequency</h3>
              <p className="text-sm text-muted-foreground">How often to check for cost updates</p>
            </div>
            <select className="px-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Every 6 hours</option>
              <option>Every 12 hours</option>
              <option>Daily</option>
              <option>Weekly</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex-1">
              <h3 className="text-sm font-medium mb-1">Auto-sync mockups</h3>
              <p className="text-sm text-muted-foreground">Automatically download product mockups from Printify</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex-1">
              <h3 className="text-sm font-medium mb-1">Auto-import new products</h3>
              <p className="text-sm text-muted-foreground">Import new products from Printify as drafts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
            </label>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border flex gap-3">
          <button className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Sync Now
          </button>
          <button className="bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Save Settings
          </button>
        </div>
      </div>

      {/* Product Mappings */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Product Mappings</h2>
            <p className="text-sm text-muted-foreground mt-1">Products synced with Printify</p>
          </div>
          <button className="border border-border hover:bg-muted text-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <ExternalLink className="w-4 h-4" />
            View in Printify
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm font-medium">Product Name</th>
                <th className="text-left p-4 text-sm font-medium">Printify ID</th>
                <th className="text-left p-4 text-sm font-medium">Variants</th>
                <th className="text-left p-4 text-sm font-medium">Status</th>
                <th className="text-left p-4 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mappings.map((mapping) => (
                <tr key={mapping.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-sm font-medium">{mapping.product}</td>
                  <td className="p-4 text-sm font-mono text-muted-foreground">{mapping.printifyId}</td>
                  <td className="p-4 text-sm text-muted-foreground">{mapping.variants}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      mapping.status === 'Synced' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {mapping.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-sm text-accent hover:text-accent/80 font-medium">
                      Resync
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}