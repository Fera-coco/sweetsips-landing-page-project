import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ceoImage from '@/assets/team/ceo.jpg';
import productionManagerImage from '@/assets/team/production-manager.jpg';
import financeManagerImage from '@/assets/team/finance-manager.jpg';
import marketingManagerImage from '@/assets/team/marketing-manager.jpg';
import cooImage from '@/assets/team/coo.jpg';
import customerServiceImage from '@/assets/team/customer-service.jpg';
import productionStaffImage from '@/assets/team/production-staff.jpg';
import deliveryImage from '@/assets/team/delivery.jpg';

const Team = () => {
  const teamMembers = [
    {
      name: 'Oratokhai Emmanuel',
      role: 'CEO',
      image: ceoImage,
    },
    {
      name: 'Odedele Chidera',
      role: 'Production Manager',
      image: productionManagerImage,
    },
    {
      name: 'Adesanoye Elizabeth',
      role: 'Finance Manager',
      image: financeManagerImage,
    },
    {
      name: 'Afolabi Olamilekan',
      role: 'Marketing Manager',
      image: marketingManagerImage,
    },
    {
      name: 'Segun-Babs Peace Oluwaferanmi',
      role: 'COO',
      image: cooImage,
    },
    {
      name: 'Erute Eucharia',
      role: 'Customer Service/Sales',
      image: customerServiceImage,
    },
    {
      name: 'Daniella Aigbokhan',
      role: 'Production Personnel',
      image: productionStaffImage,
    },
    {
      name: 'Chukwuemeka Precious',
      role: 'Delivery Personnel',
      image: deliveryImage,
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
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-primary/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
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
