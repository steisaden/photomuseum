import { DollarSign, Package, ShoppingCart, TrendingUp, Plus, Package2, Palette } from 'lucide-react';
import { StatCard } from '../StatCard';

export function Dashboard() {
  const alerts = [
    { id: 1, type: 'warning', message: 'Printify sync delayed for 3 products', time: '5 min ago' },
    { id: 2, type: 'error', message: 'Provider out-of-stock: Bella+Canvas 3001 - White - XL', time: '1 hour ago' },
    { id: 3, type: 'info', message: '12 orders pending fulfillment', time: '2 hours ago' },
  ];

  const recentActivity = [
    { id: 1, action: 'Product published', item: 'Summer Tank Top', user: 'Admin', time: '10 min ago' },
    { id: 2, action: 'Order received', item: 'Order #1024', user: 'Customer', time: '25 min ago' },
    { id: 3, action: 'Design created', item: 'Logo Tee Design v2', user: 'Admin', time: '1 hour ago' },
    { id: 4, action: 'Price rule updated', item: 'Premium Markup', user: 'Admin', time: '2 hours ago' },
    { id: 5, action: 'Product synced', item: 'Hoodie Collection', user: 'System', time: '3 hours ago' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Revenue (Today)"
          value="$2,847"
          change="+12.5% from yesterday"
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Orders Pending"
          value="23"
          change="12 ready to fulfill"
          changeType="neutral"
          icon={ShoppingCart}
        />
        <StatCard
          title="Products Live"
          value="156"
          change="8 drafts"
          changeType="neutral"
          icon={Package}
        />
        <StatCard
          title="Avg Margin"
          value="42%"
          change="+2.1% this month"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Panel */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg">
          <div className="p-6 border-b border-border">
            <h2 className="font-semibold">Alerts & Notifications</h2>
          </div>
          <div className="divide-y divide-border">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-6 flex items-start gap-4">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${alert.type === 'error'
                      ? 'bg-red-500'
                      : alert.type === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                />
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-accent hover:bg-accent/90 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              Create Product
            </button>
            <button className="w-full bg-muted hover:bg-muted/80 text-foreground px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
              <Palette className="w-4 h-4" />
              Design Manager
            </button>
            <button className="w-full bg-muted hover:bg-muted/80 text-foreground px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
              <Package2 className="w-4 h-4" />
              Fulfillment Queue
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h2 className="font-semibold">Recent Activity</h2>
        </div>
        <div className="divide-y divide-border">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {activity.item} • {activity.user}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}