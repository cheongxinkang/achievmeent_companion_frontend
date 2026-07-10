
const TextButton = ({
  children,
  variant = 'default', // default, primary, danger, success
  type = 'button',
  className = '',
  icon,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`text-btn ${variant} ${className}`}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default TextButton;
