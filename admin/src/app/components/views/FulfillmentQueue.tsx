import { Send, Eye, X, CircleAlert, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { client } from '@shared/client';
import { Order } from '@shared/types';

export function FulfillmentQueue() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState<number | string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await client.getOrders();
      setOrders(data);
    } catch (e) {
      console.error("Failed to fetch orders", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSendToPrintify = async (orderId: number | string) => {
    setProcessingId(orderId);
    try {
      const result = await client.sendOrderToPrintify(orderId);
      if (result.success) {
        // Refresh orders to see status update
        await fetchOrders();
        // If viewing this order, close modal or update view
        if (viewingOrder && viewingOrder.id === orderId) {
          setViewingOrder(null);
        }
      } else {
        alert('Failed to send to Printify: ' + result.error);
      }
    } catch (e) {
      console.error(e);
      alert('Error sending order');
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Shipped':
        return 'bg-green-100 text-green-700';
      case 'In Production':
        return 'bg-blue-100 text-blue-700';
      case 'Not Sent':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map(o => Number(o.id)));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedOrders(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Fulfillment Queue</h1>
          <p className="text-sm text-muted-foreground">
            {orders.filter(o => o.status === 'Not Sent').length} orders ready to send
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchOrders}
            className="bg-white hover:bg-gray-50 text-foreground px-4 py-2 rounded-lg text-sm font-medium border border-border flex items-center gap-2 transition-colors"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Send className="w-4 h-4" />
            Send All to Printify
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex items-center justify-between">
          <span className="text-sm font-medium">{selectedOrders.length} orders selected</span>
          <div className="flex gap-2">
            <button className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Send Selected to Printify
            </button>
            <button className="bg-white hover:bg-gray-50 text-foreground px-4 py-2 rounded-lg text-sm font-medium border border-border transition-colors">
              Mark as Shipped
            </button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 w-12">
                  <input
                    type="checkbox"
                    checked={orders.length > 0 && selectedOrders.length === orders.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-input"
                  />
                </th>
                <th className="text-left p-4 text-sm font-medium">Order</th>
                <th className="text-left p-4 text-sm font-medium">Customer</th>
                <th className="text-left p-4 text-sm font-medium">Items</th>
                <th className="text-left p-4 text-sm font-medium">Status</th>
                <th className="text-left p-4 text-sm font-medium">Provider</th>
                <th className="text-left p-4 text-sm font-medium">Shipping</th>
                <th className="text-left p-4 text-sm font-medium">Address</th>
                <th className="text-left p-4 text-sm font-medium">Date</th>
                <th className="text-left p-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-muted-foreground">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(Number(order.id))}
                        onChange={() => toggleSelect(Number(order.id))}
                        className="w-4 h-4 rounded border-input"
                      />
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-sm">{order.orderNumber}</span>
                    </td>
                    <td className="p-4 text-sm">{order.customer}</td>
                    <td className="p-4 text-sm text-muted-foreground">{order.items}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm">{order.provider}</td>
                    <td className="p-4 text-sm text-muted-foreground">{order.shipping}</td>
                    <td className="p-4">
                      {order.addressVerified ? (
                        <span className="text-green-600 text-sm">✓ Verified</span>
                      ) : (
                        <span className="text-red-600 text-sm flex items-center gap-1">
                          <CircleAlert className="w-3 h-3" />
                          Check
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{order.date}</td>
                    <td className="p-4">
                      <button
                        onClick={() => setViewingOrder(order)}
                        className="p-2 hover:bg-muted rounded transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Drawer */}
      {viewingOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end">
          <div className="w-full max-w-md bg-card h-full overflow-y-auto shadow-xl">
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card">
              <h2 className="font-semibold">Order {viewingOrder.orderNumber}</h2>
              <button onClick={() => setViewingOrder(null)} className="p-2 hover:bg-muted rounded transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Customer</h3>
                <p className="text-sm">{viewingOrder.customer}</p>
                <p className="text-sm text-muted-foreground mt-1">{viewingOrder.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Items</h3>
                <div className="space-y-2">
                  {/* simplified view for now since we don't have full item details in the mock order type fully populated in the list view yet, but let's try to show what we have */}
                  {viewingOrder.orderItems && viewingOrder.orderItems.length > 0 ? (
                    viewingOrder.orderItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <div className="w-12 h-12 bg-background rounded"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.product_name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium">{item.price}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">Item details unavailable</div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Shipping Address</h3>
                <p className="text-sm">{viewingOrder.shippingAddress.line1}</p>
                <p className="text-sm">{viewingOrder.shippingAddress.city}, {viewingOrder.shippingAddress.state} {viewingOrder.shippingAddress.postal_code}</p>
                <p className="text-sm">{viewingOrder.shippingAddress.country}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Fulfillment</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Provider:</span>
                    <span>{viewingOrder.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(viewingOrder.status)}`}>
                      {viewingOrder.status}
                    </span>
                  </div>
                  {viewingOrder.printify_order_id && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Printify ID:</span>
                      <span className="text-accent">{viewingOrder.printify_order_id}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={() => handleSendToPrintify(viewingOrder.id)}
                  disabled={viewingOrder.status !== 'Not Sent' || processingId === viewingOrder.id}
                  className="w-full bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {processingId === viewingOrder.id ? 'Sending...' : 'Send to Printify'}
                </button>
                <button className="w-full bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Mark as Shipped
                </button>
                <button className="w-full border border-red-600 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}