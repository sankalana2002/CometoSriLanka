import React, { useState, useEffect } from 'react';

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch feedbacks
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/feedbacks');
        const data = await res.json();
        if (data.success) {
          setFeedbacks(data.feedbacks);
        }
      } catch (err) {
        console.error('Failed to fetch feedbacks', err);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/feedbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setSuccess('Thank you for your valuable feedback!');
        setFeedbacks([{ ...formData, created_at: new Date().toISOString() }, ...feedbacks]);
        setFormData({ name: '', email: '', rating: 5, message: '' });
      } else {
        setError(data.error || 'Failed to submit feedback.');
      }
    } catch {
      setError('Connection failed. Please ensure the server is running.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pb-20">
      
      {/* Hero Header */}
      <div className="relative bg-blue-700 dark:bg-gray-800 py-20 px-4 mb-12 shadow-inner overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply z-10" />
        <img 
          src="https://images.unsplash.com/photo-1544473244-f6895e69ce8d?auto=format&fit=crop&q=80&w=2000" 
          alt="Feedback Background" 
          className="absolute inset-0 w-full h-full object-cover z-0 blur-sm brightness-50"
        />
        <div className="relative z-20 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl tracking-tight">
            Customer Feedback
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-medium">
            We value your experiences in Sri Lanka. Share your thoughts and help us improve!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Form */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 h-fit sticky top-24">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Leave a Review</h2>
          
          {error && <div className="mb-6 bg-red-100 text-red-700 p-4 rounded-xl text-sm font-semibold">{error}</div>}
          {success && <div className="mb-6 bg-green-100 text-green-700 p-4 rounded-xl text-sm font-semibold">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First & Last Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" placeholder="John Doe" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" placeholder="john@example.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Rating</label>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className="cursor-pointer text-3xl transition-transform hover:scale-110">
                    <input 
                      type="radio" 
                      name="rating" 
                      value={star} 
                      className="hidden"
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    />
                    <span className={formData.rating >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}>★</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea name="message" required value={formData.message} onChange={handleChange} rows="4" className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" placeholder="Tell us about your trip..." />
            </div>
            
            <button type="submit" disabled={loading} className="w-full py-4 text-white font-bold bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg transition-transform hover:-translate-y-1">
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>

        {/* Right Side: Display Feedbacks */}
        <div className="lg:col-span-7">
          <div className="flex justify-between items-end mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Recent Thoughts</h2>
            <span className="text-gray-500 font-medium">{feedbacks.length} Reviews</span>
          </div>

          <div className="space-y-6">
            {feedbacks.length === 0 ? (
              <p className="text-gray-500 italic p-6 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">No feedback submitted yet. Be the first!</p>
            ) : (
              feedbacks.map((fb, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-md border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold text-xl uppercase ring-4 ring-blue-50 dark:ring-gray-700">
                        {fb.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white">{fb.name}</h4>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Verified Traveler</span>
                      </div>
                    </div>
                    <div className="text-yellow-400 text-xl tracking-tight">
                      {'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg italic leading-relaxed pl-2 border-l-4 border-blue-500">
                    "{fb.message}"
                  </p>
                  <p className="text-sm text-gray-400 mt-6 font-medium">
                    Posted on {new Date(fb.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
