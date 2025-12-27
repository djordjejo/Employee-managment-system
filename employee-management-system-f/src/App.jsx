import  Header  from './components/header.jsx';
import  Hero  from './components/Hero';
import  Features  from './components/Features.jsx';
import  Benefits  from './components/Benefits.jsx';
import  Testimonials  from './components/Testimonials';
import  CTA  from './components/CTA.jsx';
import  Footer  from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Benefits />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}