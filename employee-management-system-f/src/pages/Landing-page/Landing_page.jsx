import  Header  from "./components/Header"
import  Hero  from  "./components/Hero.jsx";
import  Features  from  "./components/Features.jsx";
import  Benefits  from  "./components/Benefits.jsx"; 
import  Testimonials  from "./components/Testimonials.jsx";
import  CTA  from "./components/CTA.jsx";
import  Footer  from "./components/Footer.jsx";


export default function Landing_page() {
    return (
        <div>
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