import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ServicesPreview from '../components/ServicesPreview';
import MembershipPreview from '../components/MembershipPreview';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <ServicesPreview />
      <MembershipPreview />
    </Layout>
  );
};

export default Index;
