
export default function CustomButton ({ children, className, ...props }) {
  return (
    <button
      className={`bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
