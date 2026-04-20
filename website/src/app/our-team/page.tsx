import Layout from '@/components/layout/Layout';
import { Card } from '@/cui';

export default function OurTeamPage() {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Master Baker',
      bio: '15+ years of experience in pastry arts. Trained in Paris and New York.',
      image: '👩‍🍳',
    },
    {
      name: 'Michael Chen',
      role: 'Head Cake Designer',
      bio: 'Award-winning designer specializing in wedding and custom cakes.',
      image: '👨‍🎨',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Pastry Chef',
      bio: 'Expert in French patisserie and contemporary flavor combinations.',
      image: '👩‍🍳',
    },
    {
      name: 'David Kim',
      role: 'Lead Decorator',
      bio: 'Specializes in fondant art and 3D cake sculptures.',
      image: '👨‍🍳',
    },
    {
      name: 'Jessica Williams',
      role: 'Operations Manager',
      bio: 'Ensures every order is perfect and delivered on time.',
      image: '👩‍💼',
    },
    {
      name: 'Alex Martinez',
      role: 'Customer Experience Lead',
      bio: 'Dedicated to making your cake ordering experience seamless.',
      image: '👨‍💼',
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            The talented individuals behind every delicious creation at CakeAnatomy. Passionate bakers, designers, and cake enthusiasts dedicated to making your celebrations special.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {team.map((member, idx) => (
            <Card key={idx} hoverable elevated>
              <Card.Body className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-6xl">
                  {member.image}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-semibold mb-3">{member.role}</p>
                <p className="text-neutral-600 text-sm">{member.bio}</p>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">What Drives Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <Card.Body className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Passion</h3>
                <p className="text-neutral-600">
                  We're passionate about baking and committed to perfecting every detail of every cake.
                </p>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
                <p className="text-neutral-600">
                  We work together as a team to bring your cake vision to life.
                </p>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body className="text-center">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-neutral-600">
                  We never compromise on quality, from ingredients to execution.
                </p>
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* Join Our Team CTA */}
        <Card className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
          <Card.Body className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Join the CakeAnatomy Family</h2>
            <p className="text-lg mb-6 opacity-90">
              We're always looking for talented bakers and decorators who share our passion for creating amazing cakes.
            </p>
            <button className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-neutral-50 transition-colors">
              View Open Positions
            </button>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
}
