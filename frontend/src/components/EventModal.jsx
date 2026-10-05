import React, { useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Users, Award, CheckCircle2, Bookmark } from 'lucide-react';
import CategoryBadge from './CategoryBadge';

export default function EventModal({
  event,
  onClose,
  isSaved,
  onToggleSave
}) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Subtle backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0F172A]/40 transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl border border-[#E2E8F0] shadow-card-hover overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Modal Image Header */}
        <div className="relative w-full h-56 sm:h-64 bg-slate-100 overflow-hidden shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#172554] flex items-center justify-center shadow-subtle border border-[#E2E8F0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Badge overlay */}
          <div className="absolute bottom-4 left-4">
            <CategoryBadge category={event.category} className="shadow-xs" />
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Title & Organizer */}
          <div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-[#172554] tracking-tight">
              {event.title}
            </h2>
            <p className="mt-1 text-sm text-[#64748B]">
              Organized by <span className="font-semibold text-[#334155]">{event.organizer}</span>
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#EFF6FF] text-[#2563EB] shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#64748B] font-semibold">Date</p>
                <p className="text-sm font-semibold text-[#172554]">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#EFF6FF] text-[#2563EB] shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#64748B] font-semibold">Time</p>
                <p className="text-sm font-semibold text-[#172554]">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#EFF6FF] text-[#2563EB] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#64748B] font-semibold">Venue</p>
                <p className="text-sm font-semibold text-[#172554]">{event.venue}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#172554] mb-2">
              About This Event
            </h4>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Additional details */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748B] pt-2 border-t border-[#F1F5F9]">
            <div className="flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-[#2563EB]" />
              <span>{event.attendees} students attending</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-[#2563EB]" />
              <span>Capacity: {event.capacity}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 sm:px-8 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-sm font-semibold text-[#334155] hover:bg-slate-200/60 border border-[#E2E8F0] transition-colors order-2 sm:order-1"
          >
            Close
          </button>

          <button
            onClick={() => onToggleSave(event.id)}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 flex items-center justify-center space-x-2 order-1 sm:order-2 ${
              isSaved
                ? 'bg-[#15803D] hover:bg-[#166534] text-white shadow-xs'
                : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-xs'
            }`}
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Registered (In My Events)</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Register / Add to My Events</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
