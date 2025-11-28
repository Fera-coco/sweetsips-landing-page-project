import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Menu = () => {
  const parfaits = [
    {
      name: 'Pawpaw & Coconut Parfait',
      description: 'Creamy yogurt layered with fresh pawpaw, shredded coconut, and crunchy granola.',
      initials: 'PCP',
    },
    {
      name: 'Tropical Pineapple Parfait',
      description: 'Sweet pineapple chunks with yogurt, honey drizzle, and granola topping.',
      initials: 'TPP',
    },
    {
      name: 'Mixed Nigerian Fruits Parfait',
      description: 'An abundant mix of local fruits including mango, banana, watermelon with yogurt.',
      initials: 'MNF',
    },
    {
      name: 'Banana & Granola Parfait',
      description: 'Sliced ripe banana layered with Greek yogurt and crunchy granola.',
      initials: 'BGP',
    },
  ];

  const smoothies = [
    {
      name: 'Watermelon Refresh',
      description: 'Cool and hydrating blend of fresh watermelon with a hint of lime.',
      initials: 'WR',
    },
    {
      name: 'Mango & Orange Blend',
      description: 'Tropical fusion of ripe Nigerian mango and sweet orange juice.',
      initials: 'MOB',
    },
    {
      name: 'Banana & Tiger Nut Smoothie',
      description: 'Creamy banana smoothie enriched with nutritious tiger nut milk.',
      initials: 'BTS',
    },
    {
      name: 'Soursop Delight',
      description: 'Exotic soursop fruit blended smooth with natural sweetness.',
      initials: 'SD',
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
                <div className="aspect-square overflow-hidden bg-primary/10 flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary">
                    {item.initials}
                  </span>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {item.description}
                  </CardDescription>
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
                <div className="aspect-square overflow-hidden bg-primary/10 flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary">
                    {item.initials}
                  </span>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {item.description}
                  </CardDescription>
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
