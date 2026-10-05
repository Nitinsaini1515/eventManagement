import React from 'react';
import { CATEGORY_STYLES } from '../data/eventsData';

export default function CategoryBadge({ category, className = '' }) {
  const styles = CATEGORY_STYLES[category] || {
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    dot: 'bg-slate-400'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles.badge} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${styles.dot}`}></span>
      {category}
    </span>
  );
}
