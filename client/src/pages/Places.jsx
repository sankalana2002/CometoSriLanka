import React from 'react';
import { Link } from 'react-router-dom';

const packages = [
  {
    id: 1,
    title: 'Cultural Triangle Explorer',
    duration: '5 Days / 4 Nights',
    price: '$450',
    tags: ['Culture', 'History'],
    image: '/images/galle_fort.png',
    description: 'Explore the historic Galle Fort and beautiful southern heritage sites in this coastal adventure.'
  },
  {
    id: 2,
    title: 'Wild & Scenic South',
    duration: '7 Days / 6 Nights',
    price: '$750',
    tags: ['Wildlife', 'Beaches'],
    image: '/images/yala_park.png',
    description: 'Safari at Yala National Park followed by relaxing beach days at Mirissa and Unawatuna.'
  },
  {
    id: 3,
    title: 'Hill Country Train Journey',
    duration: '4 Days / 3 Nights',
    price: '$320',
    tags: ['Nature', 'Train'],
    image: '/images/ella.png',
    description: 'Take the famous Kandy to Ella train ride, hiking through tea estates and waterfalls.'
  }
];

export default function Places() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Curated Tour Packages
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the best of Sri Lanka with our expertly crafted itineraries.
          </p>
        </div>

        <div className="space-y-12">
          {packages.map((pkg, idx) => (
            <div key={pkg.id} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700`}>
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden group">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {pkg.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-sm font-bold text-blue-600 dark:text-blue-400 rounded-full shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{pkg.title}</h3>
                  <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{pkg.price}</span>
                </div>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-wider flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  {pkg.duration}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {pkg.description}
                </p>
                <div className="mt-auto">
                  <Link to={`/booking?package=${pkg.id}`} className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1">
                    Book This Package
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
