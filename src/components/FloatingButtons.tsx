import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import CheckoutModal from './CheckoutModal';
import Chatbot from './Chatbot';

const FloatingButtons = () => {
  const { totalItems } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg"
          onClick={() => setChatbotOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg relative"
          onClick={() => setCheckoutOpen(true)}
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
              {totalItems}
            </span>
          )}
        </Button>
      </div>

      <CheckoutModal open={checkoutOpen} onOpenChange={setCheckoutOpen} />
      <Chatbot open={chatbotOpen} onOpenChange={setChatbotOpen} />
    </>
  );
};

export default FloatingButtons;
