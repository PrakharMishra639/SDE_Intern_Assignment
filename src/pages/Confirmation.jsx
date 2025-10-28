import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import formatCurrency from "../utils/formatCurrency";

export default function Confirmation() {
  const { state } = useLocation();
  const name = state?.name ?? "Customer";
  const total = state?.total ?? 0;
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Generate a random order number
    const number = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;
    setOrderNumber(number);

    toast.success("Order Confirmed!", {
      description: "Thank you for your purchase. We’re processing your order.",
      duration: 3000,
    });
  }, []);

  const handleContinue = () => {
    toast.info("Happy shopping again!", {
      description: "Explore more products you might love ",
      duration: 2500,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4">
            <CheckCircle2
              size={48}
              className="text-green-600 dark:text-green-400"
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Order Confirmed!
        </h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <p className="text-sm text-muted-foreground mb-2">Order Number</p>
          <p className="text-lg font-mono font-bold text-foreground break-all">
            {orderNumber}
          </p>
          <p className="text-sm text-muted-foreground mt-4">Order Total</p>
          <p className="text-lg font-semibold text-foreground">
            {formatCurrency(total)}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-6 text-left">
          <h2 className="font-semibold text-foreground mb-4">What's Next?</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary font-bold">1.</span>
              <span>
                You will receive a confirmation email shortly with your order
                details.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">2.</span>
              <span>
                Your order will be processed and shipped within 2–3 business
                days.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">3.</span>
              <span>
                You will receive a tracking number via email once your order
                ships.
              </span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link to="/" className="block" onClick={handleContinue}>
            <button className="w-full py-6 text-lg bg-[#F67B6D] hover:bg-[#e66a5f] text-white rounded-lg font-semibold transition">
              Continue Shopping
            </button>
          </Link>
          <Link to="/" className="block">
            <button className="w-full py-6 text-lg border border-[#F67B6D] text-[#F67B6D] rounded-lg font-semibold hover:bg-[#FFF4F3] transition">
              Back to Home
            </button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          Need help? Contact our support team at{" "}
          <span className="text-primary font-semibold">support@nua.com</span>
        </p>
      </div>
    </div>
  );
}
