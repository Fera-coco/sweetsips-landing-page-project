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
              SweetSips is an upcoming fruit-based parfait and smoothie business dedicated to bringing
              freshness and wellness to Cotonou.
            </p>
            <p>
              We focus on natural ingredients, fresh fruits, and sweet but healthy blends that not only
              taste amazing but nourish your body.
            </p>
            <p className="text-primary font-semibold">
              Our mission is to make wellness enjoyable, one cup at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
