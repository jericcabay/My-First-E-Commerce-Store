import React from 'react'

function RenderInput(label, name, value, onChange, editable, readOnly = false, type = "text") {
  return (
    <div className='flex flex-col'>
      <label className='text-sm font-semibold mb-1'>{label}</label>
      {editable && !readOnly ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400'
        />
      ) : (
        <p className='text-base'>{value}</p>
      )}
    </div>
  );
}

export default RenderInput;