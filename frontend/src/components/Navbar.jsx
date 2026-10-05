import React, { useState } from 'react';
import { Calendar, Search, User, Menu, X } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onSearchClick, savedCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { id: 'Home', label: 'Home' },
    { id: 'Events', label: 'Events' },
    { id: 'My Events', label: 'My Events', badge: savedCount > 0 ? savedCount : null },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: CampusConnect Logo */}
          <div 
            onClick={() => handleNavClick('Home')}
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] shadow-xs group-hover:scale-105 transition-transform duration-200">
              <Calendar className="w-5 h-5 text-[#2563EB]" strokeWidth={2.2} />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#172554]">
              Campus<span className="text-[#2563EB]">Connect</span>
            </span>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-sm sm:text-base font-semibold transition-colors duration-150 flex items-center space-x-1.5 ${
                    isActive ? 'text-[#2563EB]' : 'text-[#334155] hover:text-[#172554]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-[#2563EB] rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#2563EB] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Search Icon and Profile Icon */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Icon button */}
            <button
              onClick={onSearchClick}
              aria-label="Search events"
              className="p-2.5 rounded-full text-[#334155] hover:text-[#172554] hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] transition-colors"
              title="Search events"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Profile Icon button */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-label="User profile"
                className="w-10 h-10 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#172554] hover:border-[#2563EB] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                title="Account: Alex Morgan"
              >
                <User className="w-5 h-5 text-[#2563EB]" />
              </button>

              {/* Profile dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E2E8F0] py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 border-b border-[#E2E8F0]">
                    <p className="text-sm font-semibold text-[#172554]">Alex Morgan</p>
                    <p className="text-xs text-[#64748B]">alex.morgan@campus.edu</p>
                    <span className="inline-block mt-1 text-[11px] font-medium text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-md">
                      CSE • 3rd Year
                    </span>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleNavClick('My Events');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-[#334155] hover:bg-[#F8FAFC] hover:text-[#172554]"
                    >
                      My Registered Events ({savedCount})
                    </button>
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full text-left px-4 py-2 text-sm text-[#64748B] hover:bg-[#F8FAFC]"
                    >
                      Campus ID: CC-8924
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#334155] hover:bg-[#F8FAFC] border border-[#E2E8F0]"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#E2E8F0] bg-white space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 text-base font-semibold rounded-lg flex items-center justify-between ${
                    isActive
                      ? 'bg-[#EFF6FF] text-[#2563EB]'
                      : 'text-[#334155] hover:bg-[#F8FAFC] hover:text-[#172554]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-[#2563EB] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
