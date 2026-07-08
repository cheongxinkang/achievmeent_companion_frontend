import React from 'react';

const TextField = ({
  label,
  id,
  type = 'text',
  error,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 3,
  className = '',
  ...props
}) => {
  const isTextArea = type === 'textarea';
  
  return (
    <div className={`text-field-container ${className}`}>
      {label && (
        <label htmlFor={id} className="text-field-label">
          {label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
        </label>
      )}
      
      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className="text-field-input"
          style={{ resize: 'vertical' }}
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="text-field-input"
          {...props}
        />
      )}
      
      {error && <span className="text-field-error">{error}</span>}
    </div>
  );
};

export default TextField;
