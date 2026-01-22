import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/views/Dashboard';
import { Products } from './components/views/Products';
import { ProductEditor } from './components/views/ProductEditor';
import { DesignManager } from './components/views/DesignManager';
import { FulfillmentQueue } from './components/views/FulfillmentQueue';
import { PrintifySettings } from './components/views/PrintifySettings';
import { Login } from './components/views/Login';
import { AuthProvider, useAuth } from './context/AuthContext';

function AdminContent() {
  const [currentView, setCurrentView] = useState('dashboard');
  const { session, loading } = useAuth();

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  // if (!session) {
  //   return <Login />;
  // }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products onNavigate={handleNavigate} />;
      case 'product-editor':
        return <ProductEditor onNavigate={handleNavigate} />;
      case 'design-manager':
        return <DesignManager />;
      case 'fulfillment':
        return <FulfillmentQueue />;
      case 'printify':
        return <PrintifySettings />;
      default:
        return (
          <div className="p-8">
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <h2 className="text-xl font-semibold mb-2">{currentView.split('-').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}</h2>
              <p className="text-muted-foreground">This view is under construction</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentView={currentView} onNavigate={handleNavigate} />
      <main className="flex-1 ml-64">
        {renderView()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  );
}
