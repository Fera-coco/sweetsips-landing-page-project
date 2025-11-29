import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import tropicalParfait from '@/assets/tropical-parfait.jpg';
import greekParfait from '@/assets/greek-parfait.jpg';
import granolaParfait from '@/assets/granola-parfait.jpg';
import mixedParfait from '@/assets/mixed-parfait.jpg';
import mangoSmoothie from '@/assets/mango-smoothie.jpg';
import strawberrySmoothie from '@/assets/strawberry-smoothie.jpg';
import pineappleSmoothie from '@/assets/pineapple-smoothie.jpg';
import greenSmoothie from '@/assets/green-smoothie.jpg';

const Menu = () => {
  const parfaits = [
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
      price: '2,000 CFA',
    },
    {
      name: 'Granola & Berry Parfait',
      description: 'Crunchy granola with fresh strawberries, blueberries, and yogurt.',
      image: granolaParfait,
      price: '2,000 CFA',
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
      price: '2,000 CFA',
    },
    {
      name: 'Strawberry Banana',
      description: 'Classic pink smoothie blending sweet strawberries with creamy banana.',
      image: strawberrySmoothie,
      price: '2,000 CFA',
    },
    {
      name: 'Pineapple Paradise',
      description: 'Bright tropical smoothie featuring fresh pineapple and a hint of mint.',
      image: pineappleSmoothie,
      price: '2,000 CFA',
    },
    {
      name: 'Watermelon Cucumber Blend',
      description: 'Refreshing smoothie with hydrating watermelon, cool cucumber, and fresh mint.',
      image: greenSmoothie,
      price: '2,000 CFA',
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
                  <p className="text-primary font-semibold text-lg">{item.price}</p>
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
                  <p className="text-primary font-semibold text-lg">{item.price}</p>
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
