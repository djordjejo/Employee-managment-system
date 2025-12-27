import { CircleCheck } from 'lucide-react';

const benefits = [
  'Reduce administrative overhead by up to 60%',
  'Improve employee engagement and satisfaction',
  'Make data-driven HR decisions with analytics',
  'Ensure compliance with labor regulations',
  'Scale effortlessly as your team grows',
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b"
                alt="Business analytics dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div>
            <div className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-6">
              <span className="text-sm">Benefits</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl mb-6 text-gray-900">
              Transform Your HR Operations
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              Our platform helps organizations of all sizes streamline their employee management processes and focus on what matters most - their people.
            </p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-blue-50 text-blue-600 p-1 rounded-full mt-1">
                    <CircleCheck className="size-5" />
                  </div>
                  <span className="text-gray-700 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
            
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors">
              Learn More About Benefits
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}