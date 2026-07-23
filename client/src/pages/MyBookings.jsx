import React, { useState, useEffect } from 'react';

const StatusBadge = ({ status }) => {
  let styles = "";
  if (status === "Upcoming" || status === "Confirmed") {
    styles = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800";
  } else if (status === "Completed") {
    styles = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800";
  } else if (status === "Cancelled" || status === "removed") {
    styles = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800";
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border tracking-wide uppercase ${styles}`}>
      {status}
    </span>
  );
};

export default function MyBookings() {
  const [filter, setFilter] = useState('All'); // All, Upcoming, Completed, Cancelled
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("You must be logged in to view your bookings.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/bookings/my-bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        
        if (data.success) {
          const mappedBookings = data.data.map(item => {
            return {
              id: item.bookingReference || `BKG-${item.id}`,
              realId: item.id,
              title: item.item_name || item.destination || "Trip Package",
              location: item.location || item.destination || "Sri Lanka",
              date: item.travel_date ? `${new Date(item.travel_date).toLocaleDateString()}` : "TBD",
              guests: `${item.travelers || 1} Traveler(s)`,
              status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : "Confirmed",
              price: item.total_price ? `$${item.total_price}` : "$350",
              image: "/images/luxury_hotel_1_1776016177783.png"
            };
          });
          setBookings(mappedBookings);
        } else {
          setError(data.error || "Failed to fetch bookings.");
        }
      } catch {
        setError("Connection failed. Please ensure the server is running.");
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  const handleRemove = async (realId) => {
    if (!window.confirm("Are you sure you want to remove this booking? This action cannot be undone.")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${realId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      if (data.success) {
        // Update local state
        setBookings(bookings.filter(b => b.realId !== realId));
      } else {
        alert(data.error || "Failed to remove booking.");
      }
    } catch {
      alert("Connection failed.");
    }
  };

  const filteredBookings = filter === 'All' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              My Bookings
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Manage your upcoming adventures and review past trips.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 custom-scrollbar">
          {['All', 'Upcoming', 'Completed', 'Cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                filter === f 
                  ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {loading && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading your bookings...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-center shadow-sm">
              <p className="font-bold mb-2">Something went wrong</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div 
                key={booking.id} 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col sm:flex-row group"
              >
                {/* Image Section */}
                <div className="sm:w-1/3 h-48 sm:h-auto relative overflow-hidden">
                  <img 
                    src={booking.image} 
                    alt={booking.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute top-4 left-4 sm:hidden">
                    <StatusBadge status={booking.status} />
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700 px-2 py-1 rounded-md">
                          {booking.id}
                        </span>
                        <div className="hidden sm:block">
                          <StatusBadge status={booking.status} />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-3 sm:mt-0">
                        {booking.price}
                      </h3>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1 group-hover:text-blue-500 transition-colors">
                      {booking.title}
                    </h2>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{booking.location}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{booking.date}</span>
                      </div>

                      <div className="flex items-center space-x-2 md:col-span-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>{booking.guests}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {booking.status === 'Upcoming' && (
                      <button 
                        onClick={() => handleRemove(booking.realId)}
                        className="flex-1 sm:flex-none px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow transition-colors"
                      >
                        Remove Booking
                      </button>
                    )}
                    {(booking.status === 'Completed' || booking.status === 'Cancelled') && (
                      <button className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-sm font-semibold rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 transition-colors">
                        Book Again
                      </button>
                    )}
                    <button className="flex-none px-4 py-2.5 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 transition-colors hidden sm:block">
                      View Receipt
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="mx-auto w-24 h-24 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No {filter !== 'All' ? filter.toLowerCase() : ''} bookings found</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                Looks like you don't have any {filter !== 'All' ? filter.toLowerCase() : ''} bookings at the moment. Time to plan your next adventure!
              </p>
              <button 
                onClick={() => window.location.href = '/destinations'}
                className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors shadow-lg shadow-blue-500/30"
              >
                Explore Destinations
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

