export function Select({ children, className, ...props }) {
    return (
      <select className={`border rounded px-4 py-2 ${className}`} {...props}>
        {children}
      </select>
    );
  }
  
  export function SelectItem({ value, children }) {
    return <option value={value}>{children}</option>;
  }
  