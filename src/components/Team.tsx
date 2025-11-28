import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Team = () => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const teamMembers = [
    {
      name: 'Oratokhai Emmanuel',
      role: 'CEO',
    },
    {
      name: 'Odedele Chidera',
      role: 'Production Manager',
    },
    {
      name: 'Adesanoye Elizabeth',
      role: 'Finance Manager',
    },
    {
      name: 'Afolabi Olamilekan',
      role: 'Marketing Manager',
    },
    {
      name: 'Segun-Babs Peace Oluwaferanmi',
      role: 'COO',
    },
    {
      name: 'Erute Eucharia',
      role: 'Customer Service/Sales',
    },
    {
      name: 'Daniella Aigbokhan',
      role: 'Production Personnel',
    },
    {
      name: 'Chukwuemeka Precious',
      role: 'Delivery Personnel',
    },
  ];

  return (
    <section id="team" className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Meet Our <span className="text-primary">Team</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          The passionate people behind SweetSips, committed to bringing you the freshest and most delicious treats.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="text-center overflow-hidden hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-primary/20 bg-primary/10 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">
                    {getInitials(member.name)}
                  </span>
                </div>
                <CardTitle className="text-lg">{member.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary font-medium">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
