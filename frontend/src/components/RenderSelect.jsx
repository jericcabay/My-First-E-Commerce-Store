import React from 'react'

function RenderSelect(label, name, value, onChange, editable) {
  return (
    <div className='flex flex-col'>
      <label className='text-sm font-semibold mb-1'>{label}</label>
      {editable ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400'
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      ) : (
        <p className='text-base'>{value}</p>
      )}
    </div>
  );
}

export default RenderSelect