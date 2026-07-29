interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export default function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`w-full px-4 py-2 border rounded-xl outline-none ${className}`}
      {...props}
    />
  );
}