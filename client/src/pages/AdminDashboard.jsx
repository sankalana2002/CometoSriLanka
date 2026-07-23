import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [data, setData] = useState({ bookings: [], quotes: [], feedbacks: [], users: [], hotels: [], restaurants: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('bookings');
  const [inventoryType, setInventoryType] = useState('hotels'); // 'hotels' or 'restaurants'
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [hotelForm, setHotelForm] = useState({ name: '', location: '', description: '', pricePerNight: '', rating: 4.5, amenities: '', images: '' });
  const [restForm, setRestForm] = useState({ name: '', location: '', description: '', price: '$$', rating: 4.5, tags: '', image: '' });

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/admin/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await res.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Failed to fetch admin data.');
      }
    } catch {
      setError('Connection failed. Admin area requires backend access.');
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await fetch('http://localhost:5000/api/admin/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        if (active) {
          if (result.success) {
            setData(result.data);
          } else {
            setError(result.error || 'Failed to fetch admin data.');
          }
          setLoading(false);
        }
      } catch {
        if (active) {
          setError('Connection failed. Admin area requires backend access.');
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [navigate]);

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/${type}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchData();
    } catch {
      alert('Delete failed');
    }
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = {
      ...hotelForm,
      pricePerNight: parseFloat(hotelForm.pricePerNight),
      amenities: hotelForm.amenities.split(',').map(s => s.trim()),
      images: [hotelForm.images]
    };
    try {
      const res = await fetch('http://localhost:5000/api/admin/hotels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowAddModal(false);
        fetchData();
        setHotelForm({ name: '', location: '', description: '', pricePerNight: '', rating: 4.5, amenities: '', images: '' });
      }
    } catch {
      alert('Failed to add hotel');
    }
  };

  const handleAddRest = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = {
      ...restForm,
      tags: restForm.tags.split(',').map(s => s.trim())
    };
    try {
      const res = await fetch('http://localhost:5000/api/admin/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowAddModal(false);
        fetchData();
        setRestForm({ name: '', location: '', description: '', price: '$$', rating: 4.5, tags: '', image: '' });
      }
    } catch {
      alert('Failed to add restaurant');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-10 text-center">
      <div className="bg-red-900/20 border border-red-500 p-8 rounded-2xl max-w-lg shadow-2xl">
        <h1 className="text-3xl font-black mb-4 tracking-tighter uppercase">Access Denied</h1>
        <p className="text-red-300 font-medium mb-8 leading-relaxed">{error}</p>
        <button onClick={() => navigate('/')} className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-red-600/20">Back to Security</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Admin Control Center
            </h1>
            <p className="text-gray-400 mt-2 font-medium">System-wide monitoring and resource management</p>
          </div>
          <div className="flex bg-gray-900/50 p-1.5 rounded-2xl border border-gray-800 backdrop-blur-md overflow-x-auto max-w-full">
            {['bookings', 'quotes', 'feedbacks', 'users', 'inventory'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-300 whitespace-nowrap ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 transform scale-105' : 'text-gray-500 hover:text-white hover:bg-gray-800'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-900/40 p-6 rounded-3xl border border-gray-800 shadow-xl backdrop-blur-sm group hover:border-blue-500/50 transition-colors">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Total Bookings</p>
            <div className="flex items-end justify-between">
              <p className="text-4xl font-black text-blue-500">{data.bookings?.length || 0}</p>
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-900/40 p-6 rounded-3xl border border-gray-800 shadow-xl backdrop-blur-sm group hover:border-purple-500/50 transition-colors">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Inquiries</p>
            <div className="flex items-end justify-between">
              <p className="text-4xl font-black text-purple-500">{data.quotes?.length || 0}</p>
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2.01 2.01 0 00.586 1.414l2.414 2.414z"/></svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-900/40 p-6 rounded-3xl border border-gray-800 shadow-xl backdrop-blur-sm group hover:border-emerald-500/50 transition-colors">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Reviews</p>
            <div className="flex items-end justify-between">
              <p className="text-4xl font-black text-emerald-500">{data.feedbacks?.length || 0}</p>
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
              </div>
            </div>
          </div>
          <div className="bg-gray-900/40 p-6 rounded-3xl border border-gray-800 shadow-xl backdrop-blur-sm group hover:border-orange-500/50 transition-colors">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Total Users</p>
            <div className="flex items-end justify-between">
              <p className="text-4xl font-black text-orange-500">{data.users?.length || 0}</p>
              <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Content Container */}
        <div className="bg-gray-900/60 rounded-[2.5rem] border border-gray-800 shadow-2xl overflow-hidden backdrop-blur-md">
          {activeTab === 'inventory' ? (
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex bg-gray-800 p-1 rounded-xl">
                    <button onClick={() => setInventoryType('hotels')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${inventoryType === 'hotels' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>Hotels</button>
                    <button onClick={() => setInventoryType('restaurants')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${inventoryType === 'restaurants' ? 'bg-orange-600 text-white' : 'text-gray-400 hover:text-white'}`}>Restaurants</button>
                </div>
                <button onClick={() => setShowAddModal(true)} className="px-6 py-2.5 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
                  Add New {inventoryType === 'hotels' ? 'Hotel' : 'Place'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(inventoryType === 'hotels' ? data.hotels : data.restaurants).map(item => (
                  <div key={item.id} className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden group">
                    <div className="h-40 relative overflow-hidden">
                       <img src={inventoryType === 'hotels' ? item.images?.[0] : item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                       <div className="absolute top-3 right-3 flex gap-2">
                         <button onClick={() => handleDelete(inventoryType, item.id)} className="p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg backdrop-blur-sm transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                       </div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="font-bold text-white text-lg">{item.name}</h3>
                         <p className={`font-black ${inventoryType === 'hotels' ? 'text-blue-400' : 'text-orange-400'}`}>{inventoryType === 'hotels' ? `$${item.price_per_night}` : item.price}</p>
                      </div>
                      <p className="text-xs text-gray-500 mb-4">{item.location}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {(inventoryType === 'hotels' ? item.amenities : item.tags).slice(0, 3).map(t => (
                          <span key={t} className="px-2 py-0.5 bg-gray-700 text-gray-400 text-[10px] rounded uppercase font-bold tracking-wider">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto min-h-[400px]">
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-800/80 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-gray-800">
                    <th className="p-6">Identification & Details</th>
                    <th className="p-6">Status / Categorization</th>
                    <th className="p-6">Reference Contacts</th>
                    <th className="p-6 text-right">Value / Metrics</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                    {activeTab === 'bookings' && data.bookings.map(b => (
                    <tr key={b.id} className="hover:bg-gray-800/40 transition-all group">
                        <td className="p-6">
                        <p className="font-bold text-white group-hover:text-blue-400 transition-colors text-lg">{b.hotel_name}</p>
                        <p className="text-xs text-gray-600 font-mono mt-1">UUID: REG-{b.id}</p>
                        </td>
                        <td className="p-6">
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] font-black uppercase border border-blue-500/20">{b.status}</span>
                        <p className="text-xs text-gray-500 mt-2 font-medium">{new Date(b.created_at).toLocaleDateString()}</p>
                        </td>
                        <td className="p-6">
                        <p className="text-sm font-bold text-gray-300">{b.guest_name}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{b.email}</p>
                        </td>
                        <td className="p-6 text-right">
                        <p className="font-black text-xl text-white tracking-tighter">${b.total_price}</p>
                        </td>
                    </tr>
                    ))}

                    {activeTab === 'quotes' && data.quotes.map(q => (
                    <tr key={q.id} className="hover:bg-gray-800/40 transition-all group">
                        <td className="p-6">
                        <p className="font-bold text-white uppercase group-hover:text-purple-400 transition-colors text-lg">{q.destination}</p>
                        <p className="text-xs text-gray-600 italic mt-1 line-clamp-1">"{q.message}"</p>
                        </td>
                        <td className="p-6">
                        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-[10px] font-black uppercase border border-purple-500/20">{q.status}</span>
                        <p className="text-xs text-gray-500 mt-2 font-medium">Trip: {q.travel_date}</p>
                        </td>
                        <td className="p-6">
                        <p className="text-sm font-bold text-gray-300">{q.name}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{q.email}</p>
                        </td>
                        <td className="p-6 text-right">
                        <div className="flex flex-col items-end">
                            <p className="font-black text-white text-lg">{q.travelers}</p>
                            <p className="text-[10px] text-gray-600 uppercase font-black">Travelers</p>
                        </div>
                        </td>
                    </tr>
                    ))}

                    {activeTab === 'feedbacks' && data.feedbacks.map(f => (
                    <tr key={f.id} className="hover:bg-gray-800/40 transition-all group">
                        <td className="p-6">
                        <div className="flex text-yellow-500 mb-2 gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="text-lg">
                                {i < (f.rating || 0) ? '★' : '☆'}
                            </span>
                            ))}
                        </div>
                        <p className="text-sm text-gray-400 italic font-medium">"{f.message}"</p>
                        </td>
                        <td className="p-6">
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-[10px] font-black uppercase border border-emerald-500/20">Verified</span>
                        <p className="text-xs text-gray-500 mt-2 font-medium">{new Date(f.created_at).toLocaleDateString()}</p>
                        </td>
                        <td className="p-6">
                        <p className="text-sm font-bold text-gray-300">{f.name}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{f.email}</p>
                        </td>
                        <td className="p-6 text-right">
                        <p className="font-black text-2xl text-emerald-500 leading-none">{f.rating || 0}<span className="text-xs text-gray-700 ml-1">/ 5</span></p>
                        </td>
                    </tr>
                    ))}

                    {activeTab === 'users' && data.users.map(u => (
                    <tr key={u.id} className="hover:bg-gray-800/40 transition-all group">
                        <td className="p-6">
                        <p className="font-bold text-white group-hover:text-orange-400 transition-colors text-lg uppercase tracking-tight">{u.name}</p>
                        <p className="text-xs text-gray-600 font-mono mt-1">USER_ID: {u.id}</p>
                        </td>
                        <td className="p-6">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border ${u.role === 'admin' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                            {u.role}
                        </span>
                        <p className="text-xs text-gray-500 mt-2 font-medium">Joined: {new Date(u.created_at).toLocaleDateString()}</p>
                        </td>
                        <td className="p-6">
                        <p className="text-sm font-bold text-gray-300">{u.email}</p>
                        <p className="text-[10px] text-gray-600 font-black uppercase mt-1">Access Level: {u.role === 'admin' ? 'Root' : 'Guest'}</p>
                        </td>
                        <td className="p-6 text-right">
                        <button className="px-3 py-1 bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white rounded-md text-[10px] font-bold uppercase transition-colors">Manage</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
          )}
          
          {((activeTab === 'bookings' && data.bookings.length === 0) ||
            (activeTab === 'quotes' && data.quotes.length === 0) ||
            (activeTab === 'feedbacks' && data.feedbacks.length === 0) ||
            (activeTab === 'users' && data.users.length === 0) ||
            (activeTab === 'inventory' && inventoryType === 'hotels' && data.hotels.length === 0) ||
            (activeTab === 'inventory' && inventoryType === 'restaurants' && data.restaurants.length === 0)) ? (
            <div className="flex flex-col items-center justify-center py-32 animate-pulse">
              <svg className="w-16 h-16 text-gray-800 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
              <p className="text-gray-600 font-black uppercase tracking-widest text-sm text-center">No structural data found in <br/><span className="text-blue-500">{activeTab}</span></p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Add Inventory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl animate-scaleIn">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Add New {inventoryType === 'hotels' ? 'Hotel' : 'Dining Place'}</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-white transition-colors"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
            </div>

            <form onSubmit={inventoryType === 'hotels' ? handleAddHotel : handleAddRest} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-xs font-black uppercase text-gray-500 tracking-widest mb-2">Name</label>
                   <input required value={inventoryType === 'hotels' ? hotelForm.name : restForm.name} onChange={(e) => inventoryType === 'hotels' ? setHotelForm({...hotelForm, name: e.target.value}) : setRestForm({...restForm, name: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" placeholder="Enter name..." />
                 </div>
                 <div>
                   <label className="block text-xs font-black uppercase text-gray-500 tracking-widest mb-2">Location</label>
                   <input required value={inventoryType === 'hotels' ? hotelForm.location : restForm.location} onChange={(e) => inventoryType === 'hotels' ? setHotelForm({...hotelForm, location: e.target.value}) : setRestForm({...restForm, location: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" placeholder="City, State..." />
                 </div>
                 <div>
                   <label className="block text-xs font-black uppercase text-gray-500 tracking-widest mb-2">{inventoryType === 'hotels' ? 'Price/Night' : 'Price Level'}</label>
                   <input required value={inventoryType === 'hotels' ? hotelForm.pricePerNight : restForm.price} onChange={(e) => inventoryType === 'hotels' ? setHotelForm({...hotelForm, pricePerNight: e.target.value}) : setRestForm({...restForm, price: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" placeholder={inventoryType === 'hotels' ? '250' : '$$$'} />
                 </div>
                 <div>
                   <label className="block text-xs font-black uppercase text-gray-500 tracking-widest mb-2">Rating</label>
                   <input required step="0.1" min="0" max="5" type="number" value={inventoryType === 'hotels' ? hotelForm.rating : restForm.rating} onChange={(e) => inventoryType === 'hotels' ? setHotelForm({...hotelForm, rating: e.target.value}) : setRestForm({...restForm, rating: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" />
                 </div>
               </div>

               <div>
                <label className="block text-xs font-black uppercase text-gray-500 tracking-widest mb-2">Image URL</label>
                <input required value={inventoryType === 'hotels' ? hotelForm.images : restForm.image} onChange={(e) => inventoryType === 'hotels' ? setHotelForm({...hotelForm, images: e.target.value}) : setRestForm({...restForm, image: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" placeholder="https://..." />
               </div>

               <div>
                <label className="block text-xs font-black uppercase text-gray-500 tracking-widest mb-2">{inventoryType === 'hotels' ? 'Amenities' : 'Tags'} (comma separated)</label>
                <input required value={inventoryType === 'hotels' ? hotelForm.amenities : restForm.tags} onChange={(e) => inventoryType === 'hotels' ? setHotelForm({...hotelForm, amenities: e.target.value}) : setRestForm({...restForm, tags: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" placeholder="Pool, Wifi, Beach..." />
               </div>

               <div>
                <label className="block text-xs font-black uppercase text-gray-500 tracking-widest mb-2">Description</label>
                <textarea required rows="4" value={inventoryType === 'hotels' ? hotelForm.description : restForm.description} onChange={(e) => inventoryType === 'hotels' ? setHotelForm({...hotelForm, description: e.target.value}) : setRestForm({...restForm, description: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all resize-none" placeholder="Provide a details overview..."></textarea>
               </div>

               <div className="flex gap-4 pt-4">
                 <button onClick={() => setShowAddModal(false)} type="button" className="flex-1 py-4 border border-gray-800 text-gray-500 rounded-2xl font-bold uppercase transition-all hover:text-white hover:bg-gray-800">Cancel</button>
                 <button type="submit" className={`flex-1 py-4 ${inventoryType === 'hotels' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20' : 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/20'} text-white rounded-2xl font-black uppercase tracking-widest shadow-lg transition-all transform active:scale-95`}>Confirm & Upload</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
