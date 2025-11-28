const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            About <span className="text-primary">SweetSips</span>
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Sweet Sips is a health-centric beverage and light-meal brand dedicated to producing 
              nutritious, hygienic, and affordable parfaits and smoothies.
            </p>
            <p>
              Our mission is to promote simple, healthy eating by supplying customers with freshly 
              prepared wellness blends made from high-quality fruits, yoghurt, and natural ingredients.
            </p>
            <p className="text-primary font-semibold">
              Sweet Sips aims to become a reliable go-to option for quick, wholesome refreshment in an urban environment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
