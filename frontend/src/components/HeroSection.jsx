import React from 'react';
import { Search, X } from 'lucide-react';
import { CATEGORIES, CATEGORY_STYLES } from '../data/eventsData';

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  searchRef
}) {
  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // toggle off
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <section className="relative pt-6 pb-10 sm:pt-10 sm:pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Horizontal Hero Area */}
        <div className="bg-[#EFF6FF]/60 border border-[#E2E8F0] rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT SIDE: Heading, Supporting Text, Search Bar, Category Pills */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              
              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#172554] tracking-tight leading-tight">
                Discover Events on Campus
              </h1>
              
              {/* Supporting Text */}
              <p className="mt-3.5 text-base sm:text-lg text-[#334155] leading-relaxed max-w-xl">
                Find the best events, explore your interests, be a part of something bigger!
              </p>

              {/* Large Rounded Search Bar */}
              <div className="mt-8 max-w-xl">
                <div className="relative flex items-center w-full bg-white rounded-full border border-[#E2E8F0] shadow-subtle hover:border-[#CBD5E1] focus-within:border-[#2563EB] focus-within:ring-3 focus-within:ring-[#2563EB]/15 transition-all duration-200">
                  <div className="pl-4 sm:pl-5 pr-2 flex items-center pointer-events-none text-[#64748B]">
                    <Search className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search events, categories, or keywords..."
                    className="w-full py-3.5 sm:py-4 pr-10 text-sm sm:text-base text-[#172554] placeholder-[#64748B] bg-transparent focus:outline-none rounded-full"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 p-1 rounded-full text-[#64748B] hover:text-[#172554] hover:bg-[#F1F5F9] transition-colors"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Four Rounded Category Pills */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:gap-3">
                {CATEGORIES.map((category) => {
                  const isSelected = selectedCategory === category;
                  const catStyle = CATEGORY_STYLES[category];

                  return (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 border shadow-xs ${
                        isSelected
                          ? catStyle.activePill
                          : catStyle.inactivePill
                      }`}
                    >
                      <span className="flex items-center space-x-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-white' : catStyle.dot
                          }`}
                        />
                        <span>{category}</span>
                      </span>
                    </button>
                  );
                })}

                {/* Reset button if filter is active */}
                {(selectedCategory || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery('');
                    }}
                    className="text-xs font-medium text-[#64748B] hover:text-[#172554] underline ml-1 py-1"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT SIDE: Large Colorful Campus Illustration Area */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-card bg-white">
                <img
                  src="/assets/images/hero-campus.jpg"
                  alt="CampusConnect friendly college environment with campus building, green lawns, outdoor stage, and students"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
                {/* Subtle soft gradient overlay along bottom for polish without being heavy */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
