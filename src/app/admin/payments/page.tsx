"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: string;
  paymentProof?: string;
  notes?: string;
  createdAt: string;
  order: {
    user: {
      name: string;
      email: string;
    };
    orderItems: Array<{
      product: {
        name: string;
      };
      quantity: number;
      price: number;
    }>;
  };
}

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchPayments();
  }, [filter]);

  async function fetchPayments() {
    try {
      const url = filter === "all" 
        ? "/api/payments" 
        : `/api/payments?status=${filter}`;
      const res = await fetch(url);
      const data = await res.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updatePaymentStatus(paymentId: string, status: string) {
    try {
      await fetch(`/api/payments/${paymentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchPayments();
      alert(`Payment ${status.toLowerCase()} successfully!`);
    } catch (error) {
      console.error("Error updating payment:", error);
      alert("Failed to update payment");
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payments</h2>
        <p className="text-gray-600 mt-1">Monitor and verify customer payments</p>
      </div>

      <div className="mb-4 flex gap-2">
        <Button
          onClick={() => setFilter("all")}
          variant={filter === "all" ? "default" : "outline"}
        >
          All
        </Button>
        <Button
          onClick={() => setFilter("PENDING")}
          variant={filter === "PENDING" ? "default" : "outline"}
        >
          Pending
        </Button>
        <Button
          onClick={() => setFilter("VERIFIED")}
          variant={filter === "VERIFIED" ? "default" : "outline"}
        >
          Verified
        </Button>
        <Button
          onClick={() => setFilter("REJECTED")}
          variant={filter === "REJECTED" ? "default" : "outline"}
        >
          Rejected
        </Button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No payments found
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {payment.order.user.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.order.user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {payment.order.orderItems.map((item, i) => (
                        <div key={i}>
                          {item.product.name} x{item.quantity}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Rp {Number(payment.amount).toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(payment.createdAt).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {payment.status === "PENDING" && (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => updatePaymentStatus(payment.id, "VERIFIED")}
                          className="text-green-600 hover:text-green-900"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => updatePaymentStatus(payment.id, "REJECTED")}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
