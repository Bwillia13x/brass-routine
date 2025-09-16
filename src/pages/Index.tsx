import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ServicesPreview from '../components/ServicesPreview';
import MembershipPreview from '../components/MembershipPreview';

const Index = () => {
  const seoData = {
    title: "Andreas & Co. - Premium Men's Grooming Lounge | Calgary",
    description: "New-York calibre grooming in Calgary. Precision cuts, SkinBar facials, and membership privileges at Andreas & Co. - Calgary's premier men's grooming lounge.",
    keywords: "men's grooming Calgary, barber shop Calgary, men's haircut, SkinBar facial, premium grooming lounge, Andreas & Co, Calgary barber",
    type: 'website' as const
  };

  return (
    <Layout seo={seoData}>
      <Hero />
      <ServicesPreview />
      <MembershipPreview />
    </Layout>
  );
};

export default Index;
