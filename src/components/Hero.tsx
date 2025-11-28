import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-parfaits.jpg';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 to-foreground/50" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
          Fresh Fruit Parfaits & Smoothies,
          <br />
          Made with Love
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-fade-in">
          Healthy, delicious, fruit-based blends prepared fresh in Cotonou.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button
            size="lg"
            onClick={() => scrollToSection('menu')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
          >
            View Menu
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('contact')}
            className="bg-card/90 hover:bg-card border-primary text-foreground font-semibold px-8"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
