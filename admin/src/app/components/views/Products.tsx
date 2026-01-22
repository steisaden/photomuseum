import { Plus, Search, Filter, MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { client } from '@shared/client';
import type { Product } from '@shared/types';

interface ProductsProps {
  onNavigate: (view: string, productId?: number) => void;
}

export function Products({ onNavigate }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<(number | string)[]>([]);

  useEffect(() => {
    client.getProducts().then(setProducts);
  }, []);

  const getStatusColor = (status: string = 'Draft') => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-700';
      case 'Archived':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getSyncColor = (sync: string = 'Pending') => {
    switch (sync) {
      case 'Synced':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Error':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const toggleSelect = (id: number | string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Products</h1>
          <p className="text-sm text-muted-foreground">{products.length} total products</p>
        </div>
        <button
          onClick={() => onNavigate('product-editor')}
          className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Product
        </button>
      </div>

      {/* Filters & Search - Unchanged logic ... */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:border-accent"
            />
          </div>
          <div className="flex gap-3">
            <select className="px-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>All Status</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
            <select className="px-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>All Categories</option>
              <option>T-Shirts</option>
              <option>Hoodies</option>
              <option>Accessories</option>
            </select>
            <button className="px-4 py-2 bg-background border border-input rounded-lg text-sm hover:bg-muted transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        {selectedProducts.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{selectedProducts.length} selected</span>
            <button className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded transition-colors">
              Bulk Edit
            </button>
            <button className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded transition-colors">
              Change Status
            </button>
            <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 w-12">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === products.length && products.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-input"
                  />
                </th>
                <th className="text-left p-4 text-sm font-medium">Product</th>
                <th className="text-left p-4 text-sm font-medium">Category</th>
                <th className="text-left p-4 text-sm font-medium">Status</th>
                <th className="text-left p-4 text-sm font-medium">Visibility</th>
                <th className="text-left p-4 text-sm font-medium">Price Range</th>
                <th className="text-left p-4 text-sm font-medium">Margin</th>
                <th className="text-left p-4 text-sm font-medium">Printify</th>
                <th className="text-left p-4 text-sm font-medium">Updated</th>
                <th className="text-left p-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                      className="w-4 h-4 rounded border-input"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover bg-muted"
                      />
                      <span className="font-medium text-sm">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{product.category}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status || 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{product.visibility || 'Hidden'}</td>
                  <td className="p-4 text-sm">{product.priceRange || product.price}</td>
                  <td className="p-4 text-sm font-medium">{product.margin || '-'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSyncColor(product.printifySync)}`}>
                      {product.printifySync || 'Pending'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{product.lastUpdated || 'Recently'}</td>
                  <td className="p-4">
                    <button className="p-2 hover:bg-muted rounded transition-colors">
                      <MoreVertical className="w-4 h-4" />
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
