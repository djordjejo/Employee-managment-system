const testimonials = [
  {
    quote: "EmployeeHub has transformed how we manage our workforce. The automation features alone have saved us countless hours each week.",
    author: "Sarah Johnson",
    role: "HR Director",
    company: "TechCorp Inc.",
  },
  {
    quote: "The intuitive interface made it easy for our entire team to adopt. Performance tracking has never been this simple.",
    author: "Michael Chen",
    role: "Operations Manager",
    company: "Growth Solutions",
  },
  {
    quote: "Best investment we've made in HR technology. The ROI was evident within the first quarter.",
    author: "Emily Rodriguez",
    role: "CEO",
    company: "StartupHub",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-4">
            <span className="text-sm">Testimonials</span>
          </div>
          <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900">
            Loved by HR Teams Everywhere
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our customers have to say about their experience with EmployeeHub.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="text-blue-600 mb-4">
                <svg className="size-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-700 mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="size-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}