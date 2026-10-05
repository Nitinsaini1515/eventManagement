import React from 'react';
import { Calendar, Clock, MapPin, Bookmark } from 'lucide-react';
import CategoryBadge from './CategoryBadge';

export default function EventCard({ event, onSelect, isSaved = false }) {
  return (
    <div
      onClick={() => onSelect(event)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(event);
        }
      }}
      className="group bg-white rounded-2xl border border-[#E2E8F0] shadow-card hover:shadow-card-hover hover:border-[#CBD5E1] transition-all duration-200 flex flex-col overflow-hidden cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25"
    >
      {/* Event image/illustration at top */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out"
          loading="lazy"
        />
        {/* Category badge positioned at top-left or right */}
        <div className="absolute top-3 left-3">
          <CategoryBadge category={event.category} />
        </div>
        {/* Saved badge if user registered/bookmarked */}
        {isSaved && (
          <div className="absolute top-3 right-3 bg-white/95 text-[#2563EB] p-1.5 rounded-full shadow-xs border border-[#BFDBFE]">
            <Bookmark className="w-3.5 h-3.5 fill-[#2563EB]" />
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Event Title */}
          <h3 className="font-semibold text-lg text-[#172554] tracking-tight group-hover:text-[#2563EB] transition-colors line-clamp-1">
            {event.title}
          </h3>

          {/* Metadata: Date, Time, Venue */}
          <div className="mt-3.5 space-y-2 text-xs sm:text-sm text-[#64748B]">
            {/* Date */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span className="text-[#334155] font-medium">{event.date}</span>
            </div>

            {/* Time */}
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#64748B] shrink-0" />
              <span>{event.time}</span>
            </div>

            {/* Venue */}
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#64748B] shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </div>

        {/* View Details prompt at bottom */}
        <div className="mt-5 pt-3.5 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-semibold text-[#2563EB]">
          <span>View Details</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </div>
  );
}
