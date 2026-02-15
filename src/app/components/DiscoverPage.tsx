import { Search, MapPin, Calendar, Heart, Ticket, Camera, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState('Concerts');
  const navigate = useNavigate();

  const categories = ['Concerts', 'Sports', 'Arts, Theater & Comedy'];

  const featuredArtists = [
    {
      name: 'A$AP Rocky',
      image: 'https://images.unsplash.com/photo-1585230699768-a31a4d76e48f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBU0FQJTIwUm9ja3klMjBjb25jZXJ0JTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzcxMTU0NDkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-black px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1" />
          <span className="text-white text-xl italic" style={{ fontFamily: 'Georgia, serif' }}>
            ticketmaster
          </span>
          <div className="flex-1 flex justify-end">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <rect width="32" height="32" fill="#B22234"/>
                <rect width="32" height="2.46" y="0" fill="white"/>
                <rect width="32" height="2.46" y="4.92" fill="white"/>
                <rect width="32" height="2.46" y="9.84" fill="white"/>
                <rect width="32" height="2.46" y="14.76" fill="white"/>
                <rect width="32" height="2.46" y="19.68" fill="white"/>
                <rect width="32" height="2.46" y="24.6" fill="white"/>
                <rect width="32" height="2.46" y="29.54" fill="white"/>
                <rect width="12.8" height="17.38" fill="#3C3B6E"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Location and Date Filters */}
        <div className="flex items-center gap-3 mb-4 text-sm">
          <button className="flex items-center gap-2 text-gray-400">
            <MapPin size={16} className="text-blue-500" />
            <span>Los Angeles...</span>
            <span className="text-gray-600">⊗</span>
          </button>
          <div className="text-gray-600">|</div>
          <button className="flex items-center gap-2 text-gray-400">
            <Calendar size={16} className="text-blue-500" />
            <span>All Dates</span>
          </button>
          <span className="ml-auto text-gray-400">›</span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Artist, Event or Venue"
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500" size={20} />
        </div>
      </header>

      {/* Category Tabs */}
      <div className="px-4 py-4 flex gap-2 overflow-x-auto bg-white border-b border-gray-200">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
              activeTab === category
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Featured Section */}
        <div className="relative">
          <div className="relative h-72 overflow-hidden">
            <img
              src={featuredArtists[0].image}
              alt={featuredArtists[0].name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h2 className="text-white text-3xl font-bold mb-3">{featuredArtists[0].name}</h2>
              <button className="bg-[#0060FF] text-white px-6 py-2 rounded font-semibold">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Country Section */}
        <div className="px-4 mt-6">
          <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-3">
            COUNTRY
          </h3>
          <div className="space-y-4">
            {/* Megan Moroney Card */}
            <div>
              <div className="relative h-56 rounded-lg overflow-hidden mb-2">
                <img
                  src="https://images.unsplash.com/photo-1641169126640-b72d61ebab33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZWdhbiUyME1vcm9uZXklMjBjb3VudHJ5JTIwc2luZ2VyJTIwcGlua3xlbnwxfHx8fDE3NzExNTQ0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Megan Moroney"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-black text-lg font-bold">Megan Moroney</h4>
            </div>

            {/* VIP - Boys 4 Life Tour Card */}
            <div>
              <div className="relative h-56 rounded-lg overflow-hidden mb-2">
                <img
                  src="https://images.unsplash.com/photo-1642524757798-2a128dfab358?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3lzJTIwYmFuZCUyMGdyb3VwJTIwdG91ciUyMGNvbmNlcnR8ZW58MXx8fHwxNzcxMTU2MDA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Boys 4 Life Tour"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">
                GO AS A VIP
              </h4>
              <h3 className="text-black text-lg font-bold">Boys 4 Life Tour</h3>
            </div>

            {/* Band on Couch Card */}
            <div>
              <div className="relative h-56 rounded-lg overflow-hidden mb-2">
                <img
                  src="https://images.unsplash.com/photo-1605370692977-3c272ddb10ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5kJTIwbWVtYmVycyUyMGNvdWNoJTIwcmVkJTIwc29mYXxlbnwxfHx8fDE3NzExNTYwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Band on red couch"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* GET THE VIP TREATMENT - 5 Seconds of Summer Card */}
            <div>
              <div className="relative h-56 rounded-lg overflow-hidden mb-2">
                <img
                  src="https://images.unsplash.com/photo-1626766859896-d2ccd8513593?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHw1JTIwc2Vjb25kcyUyMHN1bW1lciUyMGJhbmQlMjBjb25jZXJ0fGVufDF8fHx8MTc3MTE1NjAwNnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="5 Seconds of Summer"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">
                GET THE VIP TREATMENT
              </h4>
              <h3 className="text-black text-lg font-bold">5 Seconds of Summer</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-1 text-blue-500"
          >
            <Search size={24} />
            <span className="text-xs">Discover</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Heart size={24} />
            <span className="text-xs">Favourites</span>
          </button>
          <button
            onClick={() => navigate('/my-events')}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <Ticket size={24} />
            <span className="text-xs">My Events</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Camera size={24} />
            <span className="text-xs">Sell</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <User size={24} />
            <span className="text-xs">My Account</span>
          </button>
        </div>
        {/* Home Indicator */}
        <div className="flex justify-center mt-1">
          <div className="w-32 h-1 bg-black rounded-full"></div>
        </div>
      </nav>
    </div>
  );
}