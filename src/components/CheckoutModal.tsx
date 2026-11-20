import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CheckoutModal = ({ open, onOpenChange }: CheckoutModalProps) => {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();
  const [deliveryType, setDeliveryType] = useState('regular');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const calculateTotal = () => {
    let total = 0;
    items.forEach(item => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''));
      total += price * item.quantity;
      
      if (item.toppings && item.toppings.length > 0) {
        total += 500 * item.toppings.length * item.quantity;
      }
    });
    return total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order Placed!",
      description: `Your order will be delivered via ${deliveryType === 'shared' ? 'shared' : 'regular'} delivery.`,
    });

    clearCart();
    onOpenChange(false);
    setFormData({ name: '', phone: '', address: '', notes: '' });
  };

  const total = calculateTotal();
  const deliveryFee = deliveryType === 'shared' ? 500 : 1000;
  const grandTotal = total + deliveryFee;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-cream">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-extrabold text-plum">Your cart</DialogTitle>
        </DialogHeader>

        {items.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-5xl" aria-hidden="true">🥣</p>
            <p className="mt-4 font-display text-2xl font-bold text-plum">Your cart is empty</p>
            <p className="mt-2 text-plum/60">Add a parfait or smoothie to get started.</p>
            <button onClick={() => { onOpenChange(false); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-6 h-12 rounded-full bg-berry px-6 font-bold text-white hover:bg-plum">See the menu</button>
          </div>
        )}
        <div className={items.length === 0 ? "hidden" : "space-y-6"}>
          {/* Cart Items */}
          <div>
            <h3 className="font-semibold mb-4">Your Order</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 border rounded-lg">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.price}</p>
                    {item.toppings && item.toppings.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Toppings: {item.toppings.join(', ')} (+{500 * item.toppings.length} CFA)
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 ml-auto"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Options */}
          <div>
            <h3 className="font-semibold mb-3">Delivery Option</h3>
            <RadioGroup value={deliveryType} onValueChange={setDeliveryType}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="regular" id="regular" />
                <Label htmlFor="regular" className="flex-1 cursor-pointer">
                  <div className="font-medium">Regular Delivery</div>
                  <div className="text-sm text-muted-foreground">Direct delivery - 1,000 CFA</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="shared" id="shared" />
                <Label htmlFor="shared" className="flex-1 cursor-pointer">
                  <div className="font-medium">Shared Delivery</div>
                  <div className="text-sm text-muted-foreground">Cost-effective option - 500 CFA</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Delivery Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Delivery Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter your delivery address"
                required
              />
            </div>
            <div>
              <Label htmlFor="notes">Special Instructions (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any special requests?"
              />
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{total.toLocaleString()} CFA</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{deliveryFee.toLocaleString()} CFA</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{grandTotal.toLocaleString()} CFA</span>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Place Order
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
