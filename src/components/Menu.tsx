import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';
import tropicalParfait from '@/assets/tropical-parfait.jpg';
import greekParfait from '@/assets/greek-parfait.jpg';
import granolaParfait from '@/assets/granola-parfait.jpg';
import mixedParfait from '@/assets/mixed-parfait.jpg';
import mangoSmoothie from '@/assets/mango-smoothie.jpg';
import strawberrySmoothie from '@/assets/strawberry-smoothie.jpg';
import pineappleSmoothie from '@/assets/pineapple-smoothie.jpg';
import greenSmoothie from '@/assets/green-smoothie.jpg';

const Menu = () => {
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const toppings = [
    'Fresh Mango',
    'Pineapple',
    'Banana',
    'Strawberries',
    'Blueberries',
    'Granola',
    'Honey Drizzle',
    'Mixed Berries',
  ];

  const handleToppingToggle = (topping: string) => {
    setSelectedToppings(prev =>
      prev.includes(topping)
        ? prev.filter(t => t !== topping)
        : [...prev, topping]
    );
  };

  const handleAddToCart = (item: any, toppings?: string[]) => {
    addItem({
      id: `${item.name}-${Date.now()}`,
      name: item.name,
      price: item.price,
      image: item.image,
      toppings: toppings
    });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleCustomParfaitAdd = () => {
    const plainParfait = parfaits.find(p => p.customizable);
    if (plainParfait) {
      handleAddToCart(plainParfait, selectedToppings);
      setSelectedToppings([]);
      setDialogOpen(false);
    }
  };

  const parfaits = [
    {
      name: 'Plain Yogurt Parfait',
      description: 'Creamy Greek yogurt base - customize with your choice of toppings.',
      image: greekParfait,
      price: '1,000 CFA',
      customizable: true,
    },
    {
      name: 'Tropical Fruit Parfait',
      description: 'Layers of Greek yogurt with fresh mango, pineapple, banana, and crunchy granola.',
      image: tropicalParfait,
      price: '2,000 CFA',
    },
    {
      name: 'Greek Yogurt Fruit Parfait',
      description: 'Creamy Greek yogurt layered with mixed berries, honey drizzle, and granola.',
      image: greekParfait,
      price: '1,800 CFA',
    },
    {
      name: 'Granola & Berry Parfait',
      description: 'Crunchy granola with fresh strawberries, blueberries, and yogurt.',
      image: granolaParfait,
      price: '1,500 CFA',
    },
    {
      name: 'Mixed Fruits Deluxe Parfait',
      description: 'An abundant mix of assorted fresh fruits with yogurt and granola layers.',
      image: mixedParfait,
      price: '2,000 CFA',
    },
  ];

  const smoothies = [
    {
      name: 'Mango Burst',
      description: 'Vibrant golden smoothie packed with fresh mango and tropical flavors.',
      image: mangoSmoothie,
      price: '1,800 CFA',
    },
    {
      name: 'Strawberry Banana',
      description: 'Classic pink smoothie blending sweet strawberries with creamy banana.',
      image: strawberrySmoothie,
      price: '1,500 CFA',
    },
    {
      name: 'Pineapple Paradise',
      description: 'Bright tropical smoothie featuring fresh pineapple and a hint of mint.',
      image: pineappleSmoothie,
      price: '1,600 CFA',
    },
    {
      name: 'Watermelon Cucumber Blend',
      description: 'Refreshing smoothie with hydrating watermelon, cool cucumber, and fresh mint.',
      image: greenSmoothie,
      price: '1,400 CFA',
    },
  ];

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Our <span className="text-primary">Menu</span>
        </h2>

        {/* Parfaits */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center text-foreground">Parfaits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {parfaits.map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-3">
                    {item.description}
                  </CardDescription>
                  <p className="text-primary font-semibold text-lg mb-3">{item.price}</p>
                  {item.customizable ? (
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full mb-2">
                          Customize Toppings
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Choose Your Toppings</DialogTitle>
                          <DialogDescription>
                            Each topping is 500 CFA. Select as many as you'd like!
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          {toppings.map((topping) => (
                            <div key={topping} className="flex items-center space-x-2">
                              <Checkbox
                                id={topping}
                                checked={selectedToppings.includes(topping)}
                                onCheckedChange={() => handleToppingToggle(topping)}
                              />
                              <Label
                                htmlFor={topping}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {topping} - 500 CFA
                              </Label>
                            </div>
                          ))}
                        </div>
                        <Button onClick={handleCustomParfaitAdd} className="w-full">
                          Add to Cart
                        </Button>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Toppings */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center text-foreground">Individual Toppings</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {toppings.map((topping, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-4">
                  <p className="font-medium text-sm mb-1">{topping}</p>
                  <p className="text-primary font-semibold text-sm">500 CFA</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Smoothies */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center text-foreground">Smoothies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {smoothies.map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-3">
                    {item.description}
                  </CardDescription>
                  <p className="text-primary font-semibold text-lg mb-3">{item.price}</p>
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
