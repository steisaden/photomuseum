import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
}

export function StatCard({ title, value, change, changeType = 'neutral', icon: Icon }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-semibold mb-2">{value}</p>
          {change && (
            <p
              className={`text-sm ${
                changeType === 'positive'
                  ? 'text-green-600'
                  : changeType === 'negative'
                  ? 'text-red-600'
                  : 'text-muted-foreground'
              }`}
            >
              {change}
            </p>
          )}
        </div>
        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
