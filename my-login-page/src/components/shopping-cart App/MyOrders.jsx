import React from "react";
import { useSelector } from "react-redux";
import ShoppingHeader from "./ShoppingHeader";
import { FaBox, FaCheckCircle, FaClock, FaMoneyBillWave, FaPaypal } from "react-icons/fa";

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.orders || []);

  const getPaymentIcon = (paymentMode) => {
    switch (paymentMode?.toLowerCase()) {
      case 'paypal':
        return <FaPaypal className="text-blue-500" />;
      case 'cod':
        return <FaMoneyBillWave className="text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
            <FaCheckCircle /> Paid
          </span>
        );
      case 'Pending':
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
            <FaClock /> Pending
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {status || 'Processing'}
          </span>
        );
    }
  };

  const formatOrderId = (id) => {
    if (!id) return 'N/A';
    const idStr = id.toString();
    return idStr.length > 6 ? `...${idStr.slice(-6)}` : idStr;
  };

  return (
    <div className="bg-[#f0f4fc] min-h-screen">
      {/* Fixed Header */}
      <div className="fixed w-full z-50">
        <ShoppingHeader />
      </div>

      {/* Main Content */}
      <div className="ml-0 md:ml-[20%] mt-[50%] md:mt-[5%] p-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaBox className="text-gray-700" /> My Orders
        </h1>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id || Date.now()}
                className="order-card p-6 bg-white rounded-lg shadow-md border border-gray-100"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{formatOrderId(order.id)}</h3>
                    <p className="text-sm text-gray-500">{order.date || 'Date not available'}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 md:mt-0">
                    <div className="flex items-center gap-2">
                      {getPaymentIcon(order.paymentMode)}
                      <span className="capitalize">{order.paymentMode || 'N/A'}</span>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Delivery Address</h4>
                    <p className="text-sm">
                      {order.user?.address || 'Address not specified'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Payment</h4>
                    <p className="text-sm capitalize">{order.paymentMode || 'N/A'}</p>
                    {order.transactionId && (
                      <p className="text-xs text-gray-500 mt-1">
                        Transaction: {order.transactionId}
                      </p>
                    )}
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Order Total</h4>
                    <p className="font-semibold">${order.total || '0.00'}</p>
                  </div>
                </div>

                {/* Order Products */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Products</h4>
                  <div className="space-y-3">
                    {(order.items || []).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image || item.thumbnail || '/placeholder-product.png'}
                            alt={item.name || item.title || 'Product'}
                            className="w-12 h-12 object-contain border rounded"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/placeholder-product.png';
                            }}
                          />
                          <div>
                            <p className="font-medium">{item.name || item.title || 'Unnamed Product'}</p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity || 1} × ${item.price?.toFixed(2) || '0.00'}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">
                          ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="border-t pt-4 mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="text-sm text-gray-500 mb-2 md:mb-0">
                    {(order.items || []).length} item{(order.items || []).length !== 1 ? 's' : ''}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="text-sm">
                      <span className="text-gray-500">Subtotal:</span> ${order.subtotal || '0.00'}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Shipping:</span> ${order.shipping || '0.00'}
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Tax:</span> ${order.tax || '0.00'}
                    </div>
                    {(order.discount || 0) > 0 && (
                      <div className="text-sm text-green-600">
                        <span className="text-gray-500">Discount:</span> -${order.discount || '0.00'}
                      </div>
                    )}
                    <div className="text-sm font-semibold">
                      <span className="text-gray-500">Total:</span> ${order.total || '0.00'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="max-w-md mx-auto">
              <FaBox className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No orders yet</h3>
              <p className="text-gray-500 mb-4">
                You haven't placed any orders. Start shopping to see your orders here.
              </p>
              <button
                onClick={() => (window.location.href = '/dashboard/e-shopping-cart')}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Start Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;