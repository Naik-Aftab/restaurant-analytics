import React from 'react';

export default function Filters({ dateRange, setDateRange }) {
  return (
    <div className="space-y-2">
      <div>
        <label className="text-xs text-gray-600">Start</label>
        <input
          type="date"
          value={dateRange.start}
          onChange={e => setDateRange(d => ({...d, start: e.target.value}))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="text-xs text-gray-600">End</label>
        <input
          type="date"
          value={dateRange.end}
          onChange={e => setDateRange(d => ({...d, end: e.target.value}))}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
}
