import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMainTab, setActiveMainTab] = useState(location.state?.tab || 'book'); // 'book' or 'quote'
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form States for Booking
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    checkIn: '',
    guests: 2
  });

  // Form States for Quote
  const [quoteData, setQuoteData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Colombo',
    travelDate: '',
    travelers: 1,
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuoteChange = (e) => {
    setQuoteData({ ...quoteData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    
    const payload = {
        hotelId: 1, 
        hotelName: "Custom Tour Package",
        guestName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        checkIn: formData.checkIn || new Date().toISOString().split('T')[0],
        checkOut: "2026-12-31", 
        guests: formData.guests,
        totalPrice: formData.guests * 150 
    };

    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (data.success) {
         navigate('/my-bookings');
      } else {
         setError('Booking failed: ' + data.error);
      }
    } catch {
        setError('Server connection error. Please try again.');
    }
    setLoading(false);
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/quotes', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(quoteData)
      });
      const data = await res.json();
      
      if (data.success) {
         setSuccess("Your quote request has been sent successfully! Our team will contact you soon.");
         setQuoteData({
            name: '',
            email: '',
            phone: '',
            destination: 'Colombo',
            travelDate: '',
            travelers: 1,
            message: ''
         });
      } else {
         setError('Quote request failed: ' + data.error);
      }
    } catch {
        setError('Server connection error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
           <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Plan Your Trip</h1>
           <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Choose between direct booking or requesting a custom quote.</p>
        </div>

        {/* Main Tab Switcher */}
        <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white dark:bg-gray-800 p-1 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
                <button 
                    onClick={() => { setActiveMainTab('book'); setError(null); setSuccess(null); }}
                    className={`px-8 py-3 rounded-xl font-bold transition-all ${activeMainTab === 'book' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                    Book Now
                </button>
                <button 
                    onClick={() => { setActiveMainTab('quote'); setError(null); setSuccess(null); }}
                    className={`px-8 py-3 rounded-xl font-bold transition-all ${activeMainTab === 'quote' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                    Request Quote
                </button>
            </div>
        </div>

        {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl text-center font-medium animate-fadeIn">
                {error}
            </div>
        )}

        {success && (
            <div className="mb-6 bg-green-500/10 border border-green-500/50 text-green-600 dark:text-green-400 px-4 py-3 rounded-xl text-center font-medium animate-fadeIn">
                {success}
            </div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-500">
          
          {activeMainTab === 'book' ? (
            <>
                <div className="flex bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <button onClick={() => setStep(1)} className={`flex-1 py-4 text-center font-bold text-sm sm:text-base transition-colors ${step >= 1 ? 'text-blue-600 bg-white dark:bg-gray-800' : 'text-gray-500'}`}>1. Details</button>
                    <button onClick={() => setStep(2)} className={`flex-1 py-4 text-center font-bold text-sm sm:text-base border-l border-gray-200 dark:border-gray-700 transition-colors ${step >= 2 ? 'text-blue-600 bg-white dark:bg-gray-800' : 'text-gray-500'}`}>2. Options</button>
                    <button onClick={() => setStep(3)} className={`flex-1 py-4 text-center font-bold text-sm sm:text-base border-l border-gray-200 dark:border-gray-700 transition-colors ${step >= 3 ? 'text-blue-600 bg-white dark:bg-gray-800' : 'text-gray-500'}`}>3. Payment</button>
                </div>

                <div className="p-8 sm:p-12">
                    {step === 1 && (
                    <div className="space-y-6 animate-fadeIn">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Personal Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all focus:border-transparent" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all focus:border-transparent" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all focus:border-transparent" />
                        </div>
                        </div>
                        <button 
                        onClick={() => {
                            if(!formData.firstName || !formData.email) {
                            setError("Please fill required fields (Name & Email)");
                            return;
                            }
                            setError(null);
                            setStep(2);
                        }} 
                        className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-colors transform hover:scale-[1.01]"
                        >
                        Continue to Options
                        </button>
                    </div>
                    )}

                    {step === 2 && (
                    <div className="space-y-6 animate-fadeIn">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customize Trip</h2>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Travel Dates</label>
                        <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all" />
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Guests</label>
                        <select name="guests" value={formData.guests} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all font-medium">
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="4">3-5 Guests</option>
                            <option value="6">6+ Guests</option>
                        </select>
                        </div>
                        <div className="flex gap-4 mt-8">
                        <button onClick={() => setStep(1)} className="w-1/3 py-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold rounded-xl transition-colors hover:bg-gray-300 dark:hover:bg-gray-600">Back</button>
                        <button onClick={() => setStep(3)} className="w-2/3 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-colors transform hover:scale-[1.01]">Continue to Payment</button>
                        </div>
                    </div>
                    )}

                    {step === 3 && (
                    <div className="space-y-6 text-center animate-fadeIn py-8">
                        <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Ready for Payment</h2>
                        <p className="text-gray-600 dark:text-gray-400">Total Price: <span className="font-bold text-blue-600 text-2xl">${formData.guests * 150}</span></p>
                        <button 
                        onClick={handlePayment} 
                        disabled={loading}
                        className="mt-8 px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg transition-colors text-lg disabled:opacity-70 flex justify-center items-center mx-auto transform hover:scale-105"
                        >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : null}
                        Pay Securely Now
                        </button>
                    </div>
                    )}
                </div>
            </>
          ) : (
            <div className="p-8 sm:p-12">
                <div className="space-y-6 animate-fadeIn">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Custom Quote</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">Tell us your requirements and we will build the perfect itinerary for you.</p>
                    
                    <form onSubmit={handleQuoteSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                <input required type="text" name="name" value={quoteData.name} onChange={handleQuoteChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all focus:border-transparent" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                <input required type="email" name="email" value={quoteData.email} onChange={handleQuoteChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all focus:border-transparent" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                                <input type="tel" name="phone" value={quoteData.phone} onChange={handleQuoteChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all focus:border-transparent" placeholder="+94 77 123 4567" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Main Destination</label>
                                <select name="destination" value={quoteData.destination} onChange={handleQuoteChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all font-medium">
                                    <option>Colombo</option>
                                    <option>Kandy</option>
                                    <option>Galle</option>
                                    <option>Ella</option>
                                    <option>Nuwara Eliya</option>
                                    <option>Sigiriya</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Travel Date</label>
                                <input type="date" name="travelDate" value={quoteData.travelDate} onChange={handleQuoteChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Travelers</label>
                                <input type="number" name="travelers" min="1" value={quoteData.travelers} onChange={handleQuoteChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tell us about your preferences</label>
                            <textarea name="message" value={quoteData.message} onChange={handleQuoteChange} rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all resize-none" placeholder="E.g. I prefer luxury hotels, beach stay, and wildlife safari..."></textarea>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-colors flex justify-center items-center transform hover:scale-[1.01] disabled:opacity-70"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            Submit Quote Request
                        </button>
                    </form>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
