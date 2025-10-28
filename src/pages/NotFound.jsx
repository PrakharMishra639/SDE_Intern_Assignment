import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF7F5] text-center px-6">
      <div className="bg-[#FCD9D4]/60 rounded-full p-6 mb-8 shadow-sm">
        <SearchX size={64} className="text-[#F67B6D]" />
      </div>

      <h1 className="text-5xl md:text-6xl font-light text-[#333444] mb-4">
        Page Not <span className="text-[#F67B6D] font-normal">Found</span>
      </h1>

      <p className="text-gray-600 text-lg max-w-md mb-8 leading-relaxed">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-[#F67B6D] hover:bg-[#e96a5d] text-white rounded-lg text-lg font-medium transition"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="px-6 py-3 border-[#F67B6D] text-[#F67B6D] hover:bg-[#FFF0EF] rounded-lg text-lg font-medium transition"
        >
          Go Back
        </Button>
      </div>

      <p className="text-xs text-gray-500 mt-8">
        Need help? Contact{" "}
        <span className="text-[#F67B6D] font-medium">support@nua.com</span>
      </p>
    </div>
  );
}
