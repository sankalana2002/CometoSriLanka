import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const galleryPhotos = [
  { src: '/images/sigiriya-elephant.png', caption: 'Sigiriya Rock Fortress', sub: 'Cultural Triangle' },
  { src: '/images/stilt-fisherman.png', caption: 'Traditional Stilt Fishermen', sub: 'Southern Coast' },
  { src: '/images/pinnawala-elephants.png', caption: 'Pinnawala Elephant Orphanage', sub: 'Kegalle' },
  { src: '/images/temple-of-tooth.png', caption: 'Temple of the Tooth', sub: 'Kandy' },
  { src: '/images/stilt-fisherman-blue.png', caption: 'Stilt Fishing at Sunrise', sub: 'Weligama' },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % galleryPhotos.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section — full-screen photo slider with overlay text */}
      <div className="relative h-screen min-h-[600px] flex items-end justify-center overflow-hidden">

        {/* Sliding background photos */}
        {galleryPhotos.map((photo, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === activeSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover scale-105" />
          </div>
        ))}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 z-10" />

        {/* Hero content */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto pb-24 w-full">
          <p className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">{galleryPhotos[activeSlide].sub}</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-tight leading-tight">
            Discover the <br className="hidden sm:block"/>Paradise Island
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 drop-shadow-lg font-medium max-w-3xl mx-auto">
            {galleryPhotos[activeSlide].caption} — and so much more awaits you in Sri Lanka.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10">
            <Link to="/destinations" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-full shadow-lg shadow-blue-500/50 transition-all transform hover:scale-105 hover:-translate-y-1">
              Explore Destinations
            </Link>
            <Link to="/hotels" className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/50 text-lg font-bold rounded-full shadow-lg transition-all transform hover:scale-105 hover:-translate-y-1">
              Find Hotels
            </Link>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-3">
            {galleryPhotos.map((_, idx) => (
              <button key={idx} onClick={() => setActiveSlide(idx)}
                className={`rounded-full transition-all duration-300 ${idx === activeSlide ? 'w-8 h-3 bg-blue-500' : 'w-3 h-3 bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </div>

        {/* Side Arrows */}
        <button onClick={() => setActiveSlide(p => (p - 1 + galleryPhotos.length) % galleryPhotos.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button onClick={() => setActiveSlide(p => (p + 1) % galleryPhotos.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      {/* Thumbnail Preview Strip */}
      <div className="bg-gray-950 py-4 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-5 gap-3">
          {galleryPhotos.map((photo, idx) => (
            <button key={idx} onClick={() => setActiveSlide(idx)}
              className={`rounded-xl overflow-hidden h-20 transition-all duration-300 border-2 ${idx === activeSlide ? 'border-blue-500 scale-105' : 'border-transparent opacity-50 hover:opacity-80'}`}>
              <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>



      {/* Featured Destinations */}

      <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Popular Destinations</h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hand-picked locations you absolutely must experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group border border-gray-100 dark:border-gray-700">
            <div className="h-72 overflow-hidden relative">
              <img 
                src="/images/galle_fort.png"
                alt="Galle Fort"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute top-5 right-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-blue-600 dark:text-blue-400 shadow-sm">
                South Coast
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Galle Fort</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">A UNESCO World Heritage Site featuring stunning Dutch colonial architecture and vibrant streets.</p>
              <Link to="/destinations" className="inline-flex items-center text-blue-600 dark:text-blue-400 font-bold hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                Learn more 
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group relative border border-gray-100 dark:border-gray-700 md:-top-6">
            <div className="h-72 overflow-hidden relative">
              <img 
                src="/images/yala_park.png"
                alt="Yala Safari"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute top-5 right-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-emerald-600 dark:text-emerald-400 shadow-sm">
                Wildlife
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Yala Park</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">Experience the thrill of seeing magnificent leopards and wild elephants in their natural habitat.</p>
              <Link to="/destinations" className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-bold hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors">
                Learn more 
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group border border-gray-100 dark:border-gray-700">
            <div className="h-72 overflow-hidden relative">
              <img 
                src="/images/ella.png"
                alt="Ella Train"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute top-5 right-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-indigo-600 dark:text-indigo-400 shadow-sm">
                Hill Country
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Ella</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">Take a legendary train ride through lush green tea plantations and misty mountains.</p>
              <Link to="/destinations" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                Learn more 
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 dark:from-gray-800 dark:to-gray-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Travel With Us?</h2>
            <p className="text-blue-100 dark:text-gray-300 text-lg md:text-xl">We provide the best experiences for an unforgettable journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-300 border border-white/10">
              <div className="w-20 h-20 bg-blue-500/30 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure Bookings</h3>
              <p className="text-blue-100 dark:text-gray-300 leading-relaxed text-lg">Your payments and personal information are heavily encrypted and safely stored.</p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-300 border border-white/10">
              <div className="w-20 h-20 bg-emerald-500/30 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Expert Local Guides</h3>
              <p className="text-blue-100 dark:text-gray-300 leading-relaxed text-lg">Our network of professional local guides ensures you get the most authentic experience.</p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-300 border border-white/10">
              <div className="w-20 h-20 bg-purple-500/30 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">24/7 Support</h3>
              <p className="text-blue-100 dark:text-gray-300 leading-relaxed text-lg">We are always available around the clock to help you with your travel needs anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

