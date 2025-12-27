import { Users, Calendar, TrendingUp, Shield, Clock, Zap } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Employee Directory',
    description: 'Centralized database with complete employee profiles, contact information, and organizational structure.',
  },
  {
    icon: Calendar,
    title: 'Leave Management',
    description: 'Simplified leave requests, approvals, and tracking. Keep everyone in sync with automated calendars.',
  },
  {
    icon: TrendingUp,
    title: 'Performance Tracking',
    description: 'Monitor employee performance with customizable KPIs, reviews, and goal-setting frameworks.',
  },
  {
    icon: Shield,
    title: 'Secure & Compliant',
    description: 'Bank-level security with role-based access control and GDPR compliance built in.',
  },
  {
    icon: Clock,
    title: 'Time & Attendance',
    description: 'Accurate time tracking, shift scheduling, and automated timesheet generation.',
  },
  {
    icon: Zap,
    title: 'Automated Workflows',
    description: 'Streamline HR processes with intelligent automation for onboarding, offboarding, and more.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-4">
            <span className="text-sm">Features</span>
          </div>
          <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900">
            Everything You Need to Manage Your Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to simplify HR management and empower your workforce.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="bg-blue-50 text-blue-600 p-3 rounded-lg inline-block mb-4">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-xl mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}