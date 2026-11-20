import { useEffect, useState } from "react";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import CheckoutModal from "./CheckoutModal";
import Chatbot from "./Chatbot";

const FloatingButtons = () => {
  const { totalItems } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  useEffect(() => {
    const on = () => setCheckoutOpen(true);
    window.addEventListener("sweetsips:open-cart", on);
    return () => window.removeEventListener("sweetsips:open-cart", on);
  }, []);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        <button onClick={() => setChatbotOpen(true)} aria-label="Ask SweetSips a question" className="grid h-14 w-14 place-items-center rounded-full bg-white text-plum shadow-xl ring-1 ring-border hover:bg-mango">
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </button>
        {totalItems > 0 && (
          <button onClick={() => setCheckoutOpen(true)} className="inline-flex h-14 items-center gap-2 rounded-full bg-berry px-5 font-bold text-white shadow-xl shadow-berry/30 hover:bg-plum">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" /> View cart ({totalItems})
          </button>
        )}
      </div>
      <CheckoutModal open={checkoutOpen} onOpenChange={setCheckoutOpen} />
      <Chatbot open={chatbotOpen} onOpenChange={setChatbotOpen} />
    </>
  );
};
export default FloatingButtons;
