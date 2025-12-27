import { ArrowRight } from 'lucide-react';
import Button from './Button';
export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-6">
              <span className="text-sm">Modern HR Management Solution</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl mb-6 text-gray-900">
              Manage Your Team <span className="text-blue-600">Effortlessly</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-xl">
              Streamline employee management, track performance, and boost productivity with our all-in-one platform designed for modern workplaces.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className=" text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="size-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors">
                Watch Demo
              </button>
            </div>
            
            <div className="flex items-center gap-8 mt-12 pt-12 border-t border-gray-200">
              <div>
                <div className="text-3xl text-gray-900 mb-1">10K+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-3xl text-gray-900 mb-1">500+</div>
                <div className="text-gray-600">Companies</div>
              </div>
              <div>
                <div className="text-3xl text-gray-900 mb-1">99%</div>
                <div className="text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="../public/images/team.jpg"
                alt="Team collaboration"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl text-gray-900">+45%</div>
                  <div className="text-gray-600">Productivity</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}