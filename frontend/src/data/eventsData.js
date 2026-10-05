export const CATEGORIES = [
  'Technical',
  'Cultural',
  'Sports',
  'Academic'
];

export const CATEGORY_STYLES = {
  Technical: {
    badge: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
    dot: 'bg-[#2563EB]',
    activePill: 'bg-[#2563EB] text-white border-[#2563EB]',
    inactivePill: 'bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#EFF6FF] hover:text-[#1D4ED8] hover:border-[#BFDBFE]',
  },
  Cultural: {
    badge: 'bg-[#FAF5FF] text-[#7E22CE] border-[#E9D5FF]',
    dot: 'bg-[#9333EA]',
    activePill: 'bg-[#9333EA] text-white border-[#9333EA]',
    inactivePill: 'bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#FAF5FF] hover:text-[#7E22CE] hover:border-[#E9D5FF]',
  },
  Sports: {
    badge: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
    dot: 'bg-[#16A34A]',
    activePill: 'bg-[#16A34A] text-white border-[#16A34A]',
    inactivePill: 'bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#F0FDF4] hover:text-[#15803D] hover:border-[#BBF7D0]',
  },
  Academic: {
    badge: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    dot: 'bg-[#D97706]',
    activePill: 'bg-[#D97706] text-white border-[#D97706]',
    inactivePill: 'bg-white text-[#334155] border-[#E2E8F0] hover:bg-[#FFFBEB] hover:text-[#B45309] hover:border-[#FDE68A]',
  },
};

export const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'Hackathon 2026',
    category: 'Technical',
    date: '15 Nov 2026',
    time: '9:00 AM',
    venue: 'CSE Block',
    image: '/assets/images/hackathon.jpg',
    description: 'Collaborate with fellow students and tech innovators for a 24-hour sprint to solve real-world problems. Mentorship from industry experts, exciting project tracks, and prizes await.',
    organizer: 'Department of Computer Science & Engineering',
    capacity: '250 Participants',
    attendees: 184
  },
  {
    id: 2,
    title: 'Cultural Fest',
    category: 'Cultural',
    date: '18 Nov 2026',
    time: '5:00 PM',
    venue: 'Parivartan Ground',
    image: '/assets/images/cultural-fest.jpg',
    description: 'The biggest cultural extravaganza of the semester! Live musical performances, acoustic open mic, theatrical performances, dance crews, and artisanal campus food stalls.',
    organizer: 'Campus Cultural Arts Committee',
    capacity: 'Open to All Students',
    attendees: 420
  },
  {
    id: 3,
    title: 'Inter-College Football',
    category: 'Sports',
    date: '22 Nov 2026',
    time: '9:00 AM',
    venue: 'Sports Complex',
    image: '/assets/images/football.jpg',
    description: 'Annual inter-college tournament kickoff! Support the varsity team as they take on regional contenders in high-spirited competitive matches on the campus athletics field.',
    organizer: 'University Sports Council',
    capacity: '500 Spectators',
    attendees: 295
  },
  {
    id: 4,
    title: 'Machine Learning Workshop',
    category: 'Academic',
    date: '25 Nov 2026',
    time: '11:00 AM',
    venue: 'Seminar Hall',
    image: '/assets/images/ml-workshop.jpg',
    description: 'A comprehensive academic masterclass covering neural network architectures, predictive modeling, and applied AI tools. Interactive live coding exercises with take-home materials.',
    organizer: 'School of Advanced Computing & Data Science',
    capacity: '120 Seats',
    attendees: 98
  }
];
