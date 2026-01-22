import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Palette,
  Plug,
  FileText,
  Settings,
  ChevronDown,
  DollarSign,
  Layers
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  items?: { label: string; view: string }[];
  view?: string;
}

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['Products', 'Orders', 'Pricing']);

  const navItems: NavItem[] = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, view: 'dashboard' },
    {
      label: 'Products',
      icon: <Package className="w-4 h-4" />,
      items: [
        { label: 'All Products', view: 'products' },
        { label: 'Collections', view: 'collections' },
        { label: 'Media Library', view: 'media' },
        { label: 'Size Charts', view: 'size-charts' },
      ],
    },
    {
      label: 'Pricing',
      icon: <DollarSign className="w-4 h-4" />,
      items: [
        { label: 'Price Rules', view: 'price-rules' },
        { label: 'Discounts & Coupons', view: 'discounts' },
        { label: 'Bundles', view: 'bundles' },
      ],
    },
    {
      label: 'Orders',
      icon: <ShoppingCart className="w-4 h-4" />,
      items: [
        { label: 'All Orders', view: 'orders' },
        { label: 'Fulfillment Queue', view: 'fulfillment' },
        { label: 'Returns / RMAs', view: 'returns' },
      ],
    },
    { label: 'Customers', icon: <Users className="w-4 h-4" />, view: 'customers' },
    { label: 'Design Manager', icon: <Palette className="w-4 h-4" />, view: 'design-manager' },
    {
      label: 'Integrations',
      icon: <Plug className="w-4 h-4" />,
      items: [
        { label: 'Printify', view: 'printify' },
        { label: 'Payments (Stripe)', view: 'stripe' },
        { label: 'Email/SMS', view: 'communications' },
      ],
    },
    {
      label: 'Content',
      icon: <FileText className="w-4 h-4" />,
      items: [
        { label: 'Pages', view: 'pages' },
        { label: 'Navigation', view: 'navigation' },
        { label: 'Announcements', view: 'announcements' },
      ],
    },
    {
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
      items: [
        { label: 'Shipping', view: 'shipping' },
        { label: 'Taxes', view: 'taxes' },
        { label: 'Policies', view: 'policies' },
        { label: 'Roles & Audit Log', view: 'audit' },
      ],
    },
  ];

  const toggleSection = (label: string) => {
    setExpandedSections(prev =>
      prev.includes(label)
        ? prev.filter(s => s !== label)
        : [...prev, label]
    );
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-sm">POD Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navItems.map((item) => (
          <div key={item.label}>
            {item.items ? (
              <div>
                <button
                  onClick={() => toggleSection(item.label)}
                  className="w-full flex items-center justify-between px-6 py-2 text-sm hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expandedSections.includes(item.label) ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                {expandedSections.includes(item.label) && (
                  <div className="py-1">
                    {item.items.map((subItem) => (
                      <button
                        key={subItem.view}
                        onClick={() => onNavigate(subItem.view)}
                        className={`w-full text-left px-6 pl-12 py-2 text-sm transition-colors ${currentView === subItem.view
                            ? 'bg-muted text-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => item.view && onNavigate(item.view)}
                className={`w-full flex items-center gap-3 px-6 py-2 text-sm transition-colors ${currentView === item.view
                    ? 'bg-muted text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            )}
          </div>
        ))}
      </nav>

      {/* User/Account */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-medium">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">Admin User</div>
            <div className="text-xs text-muted-foreground truncate">admin@store.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
