import React from 'react';
import { Link } from 'react-router-dom';

const transports = [
  {
    type: 'Private Car & Driver',
    icon: '🚗',
    price: 'From $40/day',
    desc: 'Travel at your own pace with a comfortable AC car and an experienced English-speaking guide.',
    features: ['Air Conditioned', 'Flexible Route', 'Free WiFi']
  },
  {
    type: 'Scenic Train Tickets',
    icon: '🚂',
    price: 'From $15/trip',
    desc: 'Reserve seats on the world-famous blue train routes through the magnificent hill country.',
    features: ['Reserved Seating', 'Window Views', 'Authentic']
  },
  {
    type: 'Luxury Van',
    icon: '🚐',
    price: 'From $60/day',
    desc: 'Perfect for families or groups, offering spacious seating and luggage room across the island.',
    features: ['Up to 8 Passengers', 'Spacious', 'Family Friendly']
  }
];

export default function Transport() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Getting Around
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Reliable, comfortable, and scenic transport options for your entire journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transports.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{item.type}</h3>
              <p className="text-xl font-black text-blue-600 dark:text-blue-400 mb-4">{item.price}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-8 flex-grow">{item.desc}</p>
              
              <ul className="w-full space-y-3 mb-8 text-left">
                {item.features.map(f => (
                  <li key={f} className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                    <span className="font-medium">{f}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                to="/booking"
                state={{ tab: 'quote' }}
                className="w-full py-4 bg-gray-900 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-colors text-center block"
              >
                Request Quote
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
