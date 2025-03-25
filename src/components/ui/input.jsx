
// src/components/ui/input.jsx
export function Input({ type = "text", placeholder, ...props }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-2 border rounded-md"
        {...props}
      />
    );
  }
  