import React, { useState, useRef, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EventCard from './components/EventCard';
import EventModal from './components/EventModal';
import { INITIAL_EVENTS, CATEGORIES } from './data/eventsData';
import { Search, Calendar, ArrowRight, RotateCcw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home'); // 'Home' | 'Events' | 'My Events'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Track registered / saved events by ID (pre-saving Hackathon 2025 for realistic portal feel)
  const [savedEventIds, setSavedEventIds] = useState([1]);

  const searchInputRef = useRef(null);

  // Focus search input when search icon in navbar is clicked
  const handleNavbarSearchClick = () => {
    if (activeTab !== 'Home') {
      setActiveTab('Home');
    }
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  // Toggle saving / registering for an event
  const handleToggleSave = (eventId) => {
    setSavedEventIds((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  // Filter events based on search query and selected category
  const filteredEvents = useMemo(() => {
    return INITIAL_EVENTS.filter((event) => {
      // Category filter
      if (selectedCategory && event.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Search query filter (title, category, venue, description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesCategory = event.category.toLowerCase().includes(query);
        const matchesVenue = event.venue.toLowerCase().includes(query);
        const matchesDesc = event.description.toLowerCase().includes(query);
        return matchesTitle || matchesCategory || matchesVenue || matchesDesc;
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  // Saved events for "My Events" tab
  const myEventsList = useMemo(() => {
    return INITIAL_EVENTS.filter((event) => savedEventIds.includes(event.id));
  }, [savedEventIds]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#2563EB]/15 selection:text-[#172554]">
      
      {/* 1. NAVBAR */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearchClick={handleNavbarSearchClick}
        savedCount={savedEventIds.length}
      />

      <main className="flex-1 pb-16">
        
        {/* VIEW: HOME */}
        {activeTab === 'Home' && (
          <>
            {/* 2. HERO SECTION */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchRef={searchInputRef}
            />

            {/* 3. UPCOMING EVENTS */}
            <section className="pt-2 sm:pt-4 pb-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header: Heading & "View All →" Link */}
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#172554] tracking-tight">
                      Upcoming Events
                    </h2>
                    {(selectedCategory || searchQuery) && (
                      <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                        Showing results for {selectedCategory ? `category "${selectedCategory}"` : ''}
                        {selectedCategory && searchQuery ? ' and ' : ''}
                        {searchQuery ? `query "${searchQuery}"` : ''}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('Events');
                      setSelectedCategory(null);
                      setSearchQuery('');
                    }}
                    className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center space-x-1 group transition-colors"
                  >
                    <span>View All</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>

                {/* 4 Event Cards: Horizontal on Desktop (grid-cols-4), Responsive on Tablet/Mobile */}
                {filteredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredEvents.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onSelect={(ev) => setSelectedEvent(ev)}
                        isSaved={savedEventIds.includes(event.id)}
                      />
                    ))}
                  </div>
                ) : (
                  /* Empty state if search/filter doesn't match */
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-10 text-center max-w-md mx-auto shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mx-auto mb-4">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#172554]">No matching events found</h3>
                    <p className="mt-1 text-sm text-[#64748B]">
                      Try searching with different keywords or clearing your active filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory(null);
                      }}
                      className="mt-5 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] text-xs font-semibold transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Filters</span>
                    </button>
                  </div>
                )}

              </div>
            </section>
          </>
        )}

        {/* VIEW: EVENTS (All Events Directory) */}
        {activeTab === 'Events' && (
          <section className="pt-8 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header with Search and Category filters */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#172554]">
                      Explore Campus Events
                    </h1>
                    <p className="text-sm text-[#64748B] mt-1">
                      Browse all campus activities, tech workshops, sports, and cultural festivals.
                    </p>
                  </div>

                  {/* Compact Search input in Events View */}
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search events..."
                      className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#E2E8F0] rounded-full focus:outline-none focus:border-[#2563EB] text-[#172554] shadow-xs"
                    />
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                      selectedCategory === null
                        ? 'bg-[#172554] text-white border-[#172554]'
                        : 'bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    All Categories ({INITIAL_EVENTS.length})
                  </button>

                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(isSelected ? null : cat)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                          isSelected
                            ? 'bg-[#2563EB] text-white border-[#2563EB]'
                            : 'bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#EFF6FF] hover:text-[#2563EB]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Event Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onSelect={(ev) => setSelectedEvent(ev)}
                    isSaved={savedEventIds.includes(event.id)}
                  />
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-10 text-center max-w-md mx-auto mt-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#172554]">No matching events found</h3>
                  <p className="mt-1 text-sm text-[#64748B]">Try adjusting your search or category filter.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                    }}
                    className="mt-4 px-4 py-2 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-semibold"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

            </div>
          </section>
        )}

        {/* VIEW: MY EVENTS */}
        {activeTab === 'My Events' && (
          <section className="pt-8 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="mb-8 pb-6 border-b border-[#E2E8F0]">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#172554]">
                  My Registered Events
                </h1>
                <p className="text-sm text-[#64748B] mt-1">
                  Manage the campus events you have registered for or saved to your calendar.
                </p>
              </div>

              {myEventsList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {myEventsList.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onSelect={(ev) => setSelectedEvent(ev)}
                      isSaved={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center max-w-md mx-auto shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-[#172554]">No Registered Events Yet</h3>
                  <p className="mt-2 text-sm text-[#64748B]">
                    Discover upcoming campus fests, workshops, and games and add them to your schedule!
                  </p>
                  <button
                    onClick={() => setActiveTab('Home')}
                    className="mt-6 inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-sm font-semibold transition-colors shadow-xs"
                  >
                    <span>Browse Upcoming Events</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          </section>
        )}

      </main>

      {/* EVENT DETAILS MODAL */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        isSaved={selectedEvent ? savedEventIds.includes(selectedEvent.id) : false}
        onToggleSave={handleToggleSave}
      />

    </div>
  );
}
