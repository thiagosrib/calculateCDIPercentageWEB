import React from 'react';

interface InputProps {
  type: string;
  max?: string;
  min?: string;
  step?: string;
  label: string;
  name: string;
  onChange: (event: any) => void;
}

const Input: React.FC<InputProps> = ({ type, min, max, label, name, step, onChange }) => {
  return (
    <div style={{
      width: '60%',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginBottom: '10px',
    }}>
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} name={name} onChange={onChange} required min={min} max={max} step={step} />
    </div>
  )
}

export default Input;