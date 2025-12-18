import { useEffect } from "react";

const SuccessPayment = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      fetch(`http://localhost:5000/payment-success?session_id=${sessionId}`, {
        method: "PATCH",
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold text-green-600">
        Payment Successful ✅
      </h1>
    </div>
  );
};

export default SuccessPayment;
