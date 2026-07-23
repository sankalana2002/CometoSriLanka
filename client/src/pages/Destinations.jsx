import React, { useState } from 'react';

const destinationsData = [
  {
    category: "Colombo & Western Province",
    icon: "🌆",
    items: [
      { name: "Galle Face Green", description: "Oceanfront promenade popular for sunset views and street food." },
      { name: "Gangaramaya Temple", description: "Famous Buddhist temple with museum and architecture." },
      { name: "Colombo National Museum", description: "Largest museum with Sri Lankan history." },
      { name: "Viharamahadevi Park", description: "Biggest park in Colombo city." },
      { name: "Independence Square", description: "Historic independence monument." },
      { name: "Mount Lavinia Beach", description: "Popular beach near Colombo." },
      { name: "Dutch Hospital Shopping Precinct", description: "Colonial shopping and dining area." },
      { name: "Beira Lake", description: "Scenic lake in city center." },
      { name: "Kelaniya Raja Maha Vihara", description: "Sacred Buddhist temple." },
      { name: "Diyatha Uyana", description: "Park with lake and food stalls." }
    ]
  },
  {
    category: "Cultural Triangle",
    icon: "🏛️",
    items: [
      { name: "Sigiriya Rock Fortress", description: "Ancient rock palace and UNESCO site." },
      { name: "Pidurangala Rock", description: "Best viewpoint of Sigiriya." },
      { name: "Dambulla Cave Temple", description: "Cave temple with Buddha statues." },
      { name: "Anuradhapura Ancient City", description: "Sacred ancient capital." },
      { name: "Sri Maha Bodhi Tree", description: "Oldest recorded tree in the world." },
      { name: "Ruwanwelisaya", description: "Massive white stupa." },
      { name: "Polonnaruwa Ancient City", description: "Medieval ruins and temples." },
      { name: "Gal Vihara", description: "Rock-carved Buddha statues." },
      { name: "Minneriya National Park", description: "Elephant gathering safari." },
      { name: "Kaudulla National Park", description: "Wildlife and elephants." }
    ]
  },
  {
    category: "Kandy & Hill Country",
    icon: "🌄",
    items: [
      { name: "Temple of the Tooth Relic", description: "Sacred Buddhist site." },
      { name: "Kandy Lake", description: "Scenic lake in city center." },
      { name: "Royal Botanical Gardens Peradeniya", description: "Famous botanical garden." },
      { name: "Udawattakele Forest Reserve", description: "Forest sanctuary." },
      { name: "Knuckles Mountain Range", description: "Hiking and nature." },
      { name: "Victoria Dam", description: "Scenic reservoir." },
      { name: "Hanthana Mountain Range", description: "Popular hiking area." },
      { name: "Three Temple Loop", description: "Cultural temple route." },
      { name: "International Buddhist Museum", description: "Buddhist heritage museum." },
      { name: "Ambuluwawa Tower", description: "Spiral tower with views." }
    ]
  },
  {
    category: "Nuwara Eliya & Ella",
    icon: "🌿",
    items: [
      { name: "Nuwara Eliya", description: "“Little England” with tea estates." },
      { name: "Gregory Lake", description: "Lake with activities." },
      { name: "Hakgala Botanical Garden", description: "Mountain garden." },
      { name: "Horton Plains National Park", description: "World’s End viewpoint." },
      { name: "World's End", description: "Cliff drop viewpoint." },
      { name: "Ella Town", description: "Scenic hill town." },
      { name: "Nine Arches Bridge", description: "Iconic railway bridge." },
      { name: "Little Adam’s Peak", description: "Easy hike viewpoint." },
      { name: "Ella Rock", description: "Trekking destination." },
      { name: "Ravana Falls", description: "Beautiful waterfall." }
    ]
  },
  {
    category: "Wildlife & Nature",
    icon: "🐘",
    items: [
      { name: "Yala National Park", description: "Famous for leopards." },
      { name: "Wilpattu National Park", description: "Natural lakes and wildlife." },
      { name: "Udawalawe National Park", description: "Elephant sanctuary." },
      { name: "Sinharaja Forest Reserve", description: "UNESCO rainforest." },
      { name: "Bundala National Park", description: "Bird watching paradise." },
      { name: "Horton Plains", description: "Cloud forest ecosystem." },
      { name: "Maduru Oya National Park", description: "Wildlife reserve." },
      { name: "Gal Oya National Park", description: "Boat safari experience." },
      { name: "Wasgamuwa National Park", description: "Elephant habitat." },
      { name: "Pinnawala Elephant Orphanage", description: "Elephant care center." }
    ]
  },
  {
    category: "Southern Beaches",
    icon: "🏖️",
    items: [
      { name: "Galle Fort", description: "Dutch colonial fort." },
      { name: "Unawatuna Beach", description: "Popular beach." },
      { name: "Mirissa Beach", description: "Whale watching spot." },
      { name: "Bentota Beach", description: "Water sports destination." },
      { name: "Hikkaduwa Beach", description: "Coral reefs." },
      { name: "Tangalle Beach", description: "Quiet beaches." },
      { name: "Weligama Beach", description: "Surfing hotspot." },
      { name: "Jungle Beach", description: "Hidden beach." },
      { name: "Dalawella Beach", description: "Famous rope swing." },
      { name: "Koggala Lake", description: "Lagoon experience." }
    ]
  },
  {
    category: "Eastern & Northern Sri Lanka",
    icon: "🌊",
    items: [
      { name: "Trincomalee", description: "Beaches and temples." },
      { name: "Nilaveli Beach", description: "White sand beach." },
      { name: "Pigeon Island National Park", description: "Snorkeling island." },
      { name: "Arugam Bay", description: "Surfing destination." },
      { name: "Pasikudah Beach", description: "Shallow calm sea." },
      { name: "Jaffna City", description: "Cultural heritage." },
      { name: "Nallur Kandaswamy Temple", description: "Hindu temple." },
      { name: "Delft Island", description: "Unique island." },
      { name: "Casuarina Beach", description: "Calm beach." },
      { name: "Nagadeepa Temple", description: "Sacred Buddhist site." }
    ]
  },
  {
    category: "Waterfalls & Hidden Gems",
    icon: "🌄",
    items: [
      { name: "Diyaluma Falls", description: "Second highest waterfall." },
      { name: "Bambarakanda Falls", description: "Tallest waterfall." },
      { name: "Dunhinda Falls", description: "Misty waterfall." },
      { name: "Laxapana Falls", description: "Scenic waterfall." },
      { name: "St Clair’s Falls", description: "“Little Niagara”." },
      { name: "Kirindi Ella Falls", description: "Hidden waterfall." },
      { name: "Devon Falls", description: "Tea country waterfall." },
      { name: "Ramboda Falls", description: "Near Nuwara Eliya." },
      { name: "Aberdeen Falls", description: "Jungle waterfall." },
      { name: "Bopath Ella Falls", description: "Leaf-shaped waterfall." }
    ]
  },
  {
    category: "More Unique Attractions",
    icon: "🏞️",
    items: [
      { name: "Adam’s Peak", description: "Sacred mountain." },
      { name: "Lipton’s Seat", description: "Tea plantation viewpoint." },
      { name: "Belihuloya", description: "Eco tourism village." },
      { name: "Haputale", description: "Mountain views." },
      { name: "Kitulgala", description: "White water rafting." },
      { name: "Kalpitiya", description: "Dolphin watching." },
      { name: "Negombo Lagoon", "description": "Fishing lagoon." },
      { name: "Seetha Amman Temple", description: "Ramayana site." },
      { name: "Ridiyagama Safari Park", description: "Open zoo safari." },
      { name: "Hambantota Port Area", description: "Modern development." }
    ]
  },
  {
    category: "Islands & Special Places",
    icon: "🏝️",
    items: [
      { name: "Mannar Island", description: "Baobab tree & birds." },
      { name: "Kalpitiya Lagoon", description: "Kite surfing." },
      { name: "Batticaloa Lagoon", description: "Singing fish myth." },
      { name: "Kumana National Park", description: "Bird sanctuary." },
      { name: "Chilaw Beach", description: "Quiet beach." },
      { name: "Kosgoda Turtle Hatchery", description: "Turtle conservation." },
      { name: "Hiriketiya Beach", description: "Hidden surfing bay." },
      { name: "Dondra Head Lighthouse", description: "Southernmost point." },
      { name: "Rumassala Hill", description: "Mythical mountain." },
      { name: "Sri Pada Forest Reserve", description: "Sacred biodiversity zone." }
    ]
  }
];

export default function Destinations() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = destinationsData.map(category => {
    return {
      ...category,
      items: category.items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    };
  }).filter(category => category.items.length > 0 || category.category.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Discover Sri Lanka
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From the bustling streets of Colombo to the serene tea estates of Nuwara Eliya, explore the finest destinations this beautiful island has to offer.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-6 py-4 text-lg border-2 border-transparent rounded-full shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-300 ease-in-out"
              placeholder="Search destinations (e.g. 'Beach', 'Temple')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filteredData.length > 0 ? (
            filteredData.map((category, idx) => (
              <div 
                key={idx} 
                className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden transform hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 p-5 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-4">
                  <span className="text-4xl bg-white dark:bg-gray-900 rounded-full p-2 shadow-sm">{category.icon}</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.category}
                  </h3>
                </div>
                
                {/* List Items */}
                <div className="flex-1 p-5 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                  <ul className="divide-y divide-gray-100 dark:divide-gray-700 space-y-3">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="pt-3 first:pt-0 group cursor-pointer rounded-lg p-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex flex-col">
                          <span className="text-base font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {item.name}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-snug">
                            {item.description}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
                <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No destinations found</h3>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                We couldn't find anything matching "{searchTerm}". Try adjusting your search.
              </p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

