import React, { useState } from 'react';

export default function Budget() {
  const [days, setDays] = useState(7);
  const [style, setStyle] = useState('Standard');
  const [guests, setGuests] = useState(2);

  const getEstimatedCost = () => {
    let basePerDay = style === 'Budget' ? 50 : style === 'Standard' ? 120 : 300;
    return basePerDay * days * guests;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">Trip Budget Calculator</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Get an instant estimate for your Sri Lankan adventure.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Customize Your Trip</h2>
            
            <div className="space-y-8">
              <div>
                <label className="flex justify-between text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">
                  <span>Number of Days</span>
                  <span className="text-blue-600">{days} Days</span>
                </label>
                <input type="range" min="1" max="30" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"/>
              </div>

              <div>
                <label className="flex justify-between text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">
                  <span>Number of Travelers</span>
                  <span className="text-blue-600">{guests} Guests</span>
                </label>
                <input type="range" min="1" max="10" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"/>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">Travel Style</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Budget', 'Standard', 'Luxury'].map(s => (
                    <button key={s} onClick={() => setStyle(s)} className={`py-4 rounded-xl font-bold border-2 transition-all ${style === s ? 'border-blue-600 bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-blue-400' : 'border-gray-200 dark:border-gray-600 text-gray-500 hover:border-blue-300'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl sticky top-8 text-center flex flex-col items-center justify-center min-h-[400px]">
              <h3 className="text-xl font-bold mb-2">Estimated Total</h3>
              <p className="text-gray-200 mb-8">For {guests} person(s) over {days} days</p>
              
              <div className="text-6xl font-black mb-8">${getEstimatedCost()}</div>
              
              <p className="text-sm text-blue-100 mb-8">This includes accommodation, meals, transport, and standard activities. *Flights not included.</p>
              
              <button className="w-full py-4 bg-white text-blue-900 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-colors">Start Planning Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
