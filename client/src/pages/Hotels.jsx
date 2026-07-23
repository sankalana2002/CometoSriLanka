import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Hotels() {
  const [activeTab, setActiveTab] = useState('hotels');
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const hRes = await fetch('http://localhost:5000/api/hotels');
        const hData = await hRes.json();
        if (hData.success) {
          const mapped = hData.data.map(h => ({
            ...h,
            price: `$${h.price_per_night || h.pricePerNight || 0}`,
            image: h.images?.[0] || h.image || 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=1200'
          }));
          setHotels(mapped);
        }

        const rRes = await fetch('http://localhost:5000/api/restaurants');
        const rData = await rRes.json();
        if (rData.success) setRestaurants(rData.data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 pb-32 overflow-x-hidden">
      {/* Dynamic Background Glow */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* Premium Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={activeTab === 'hotels' 
              ? "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000" 
              : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000"} 
            alt="Hero" 
            className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] z-10" />
        </div>
        
        <div className="relative z-20 text-center max-w-5xl px-6">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black uppercase tracking-[0.3em] bg-blue-600/20 text-blue-400 border border-blue-500/20 rounded-full backdrop-blur-md animate-fadeIn">
            Elite Destinations
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-white leading-[0.9] animate-slideUp">
            {activeTab === 'hotels' ? 'UNWIND IN' : 'CULINARY'}<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-emerald-400">
                {activeTab === 'hotels' ? 'PURE LUXURY' : 'MASTERPIECES'}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm animate-fadeIn delay-300">
            {activeTab === 'hotels' 
              ? 'Handpicked retreats where architecture meets the art of relaxation.' 
              : 'A curated journey through Sri Lanka’s most exquisite dining experiences.'}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-30">
        
        {/* Glassmorphic Tab Switcher */}
        <div className="flex justify-center mb-20 group">
          <div className="inline-flex p-2 bg-gray-900/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl transition-all duration-500 hover:border-white/20">
            <button 
              onClick={() => setActiveTab('hotels')}
              className={`px-10 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all duration-500 flex items-center gap-3 ${
                activeTab === 'hotels' 
                  ? 'bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] scale-105' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
              Signature Stays
            </button>
            <button 
              onClick={() => setActiveTab('restaurants')}
              className={`px-10 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all duration-500 flex items-center gap-3 ${
                activeTab === 'restaurants' 
                  ? 'bg-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] scale-105' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Exotic Dining
            </button>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
            <div>
                <h2 className="text-4xl font-black tracking-tighter text-white mb-2">
                    {activeTab === 'hotels' ? 'Curation: Signature Hoteks' : 'Curation: Modern Gastronomy'}
                </h2>
                <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
            </div>
            <p className="text-gray-500 font-medium max-w-md">
                Strictly vetted for quality, authenticity, and that unique Sri Lankan soul.
            </p>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Render Hotels */}
          {activeTab === 'hotels' && hotels.map((hotel) => (
            <div key={hotel.id} className="group relative bg-gray-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-700 hover:border-blue-500/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col h-full hover:-translate-y-3">
              <div className="relative h-80 w-full overflow-hidden">
                <div className="absolute top-6 left-6 z-10 bg-black/40 backdrop-blur-md text-white/90 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl border border-white/10">
                  Collection 2026
                </div>
                <div className="absolute top-6 right-6 z-10 bg-white/95 text-black text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1 shadow-2xl border border-white">
                  {hotel.rating} <span className="text-gray-400">★</span>
                </div>
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black text-white italic tracking-tighter group-hover:text-blue-400 transition-colors uppercase leading-tight">{hotel.name}</h3>
                  <div className="flex flex-col items-end">
                    <p className="text-2xl font-black text-white tracking-tighter leading-none">{hotel.price}</p>
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">/ Night</span>
                  </div>
                </div>
                
                <p className="text-xs font-bold text-gray-500 mb-6 flex items-center gap-2 uppercase tracking-wide">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  {hotel.location}
                </p>
                
                <div className="flex gap-2 mb-6 flex-wrap">
                  {hotel.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="px-3 py-1.5 bg-white/5 text-gray-400 text-[10px] rounded-lg font-black uppercase tracking-widest border border-white/5 group-hover:border-blue-500/20 group-hover:text-gray-300 transition-colors">
                      {amenity}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-400 text-sm mb-8 flex-grow line-clamp-3 leading-relaxed font-medium italic">
                  "{hotel.description}"
                </p>
                
                <div className="flex gap-4 mt-auto">
                  <Link 
                    to="/booking" 
                    state={{ tab: 'book' }}
                    className="flex-1 text-center bg-white text-black font-black uppercase tracking-widest py-4 px-2 rounded-2xl transition-all duration-300 hover:bg-blue-600 hover:text-white shadow-xl text-xs active:scale-95"
                  >
                    Confirm Stay
                  </Link>
                  <Link 
                    to="/booking" 
                    state={{ tab: 'quote' }}
                    className="flex-1 text-center bg-gray-900 text-white font-black uppercase tracking-widest py-4 px-2 rounded-2xl transition-all duration-300 hover:bg-white hover:text-black border border-white/10 text-xs active:scale-95"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Render Restaurants */}
          {activeTab === 'restaurants' && restaurants.map((rest) => (
            <div key={rest.id} className="group relative bg-[#0a0a0a] backdrop-blur-xl rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-700 hover:border-emerald-500/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col h-full hover:-translate-y-3">
              <div className="relative h-80 w-full overflow-hidden">
                <div className="absolute top-6 left-6 z-10 bg-emerald-600/20 backdrop-blur-md text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl border border-emerald-500/20">
                  Michelin Guide Style
                </div>
                <div className="absolute top-6 right-6 z-10 bg-black/60 backdrop-blur-md text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1 shadow-2xl border border-white/5">
                  {rest.rating} <span className="text-yellow-500">★</span>
                </div>
                <img 
                  src={rest.image} 
                  alt={rest.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black text-white tracking-tighter group-hover:text-emerald-400 transition-colors uppercase leading-[0.85]">{rest.name}</h3>
                  <p className="text-2xl font-black text-emerald-500 tracking-tighter">{rest.price}</p>
                </div>
                
                <p className="text-xs font-bold text-gray-500 mb-6 flex items-center gap-2 uppercase tracking-wide">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  {rest.location}
                </p>
                
                <div className="flex gap-2 mb-6 flex-wrap">
                  {rest.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-3 py-1.5 bg-emerald-500/5 text-gray-500 text-[10px] rounded-lg font-black uppercase tracking-widest border border-emerald-500/10 group-hover:text-emerald-300 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-400 text-sm mb-8 flex-grow line-clamp-3 leading-relaxed font-medium">
                  {rest.description}
                </p>
                
                <div className="flex gap-4 mt-auto">
                  <Link 
                    to="/booking" 
                    state={{ tab: 'book' }}
                    className="flex-1 text-center bg-gray-900 text-white font-black uppercase tracking-widest py-4 px-2 rounded-2xl transition-all duration-300 hover:bg-emerald-600 border border-white/5 shadow-xl text-xs active:scale-95"
                  >
                    Reserve Table
                  </Link>
                  <Link 
                    to="/booking" 
                    state={{ tab: 'quote' }}
                    className="flex-1 text-center bg-transparent text-gray-400 font-black uppercase tracking-widest py-4 px-2 rounded-2xl transition-all duration-300 hover:text-white hover:bg-white/5 border border-white/5 text-xs active:scale-95"
                  >
                    Menu Details
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Empty State */}
        {((activeTab === 'hotels' && hotels.length === 0) || (activeTab === 'restaurants' && restaurants.length === 0)) && (
            <div className="text-center py-40 animate-pulse">
                <h3 className="text-2xl font-black text-gray-700 uppercase tracking-widest">No listings found in the collection.</h3>
                <p className="text-gray-500 mt-2">The system is being synchronized with the latest data.</p>
            </div>
        )}
      </div>
    </div>
  );
}

