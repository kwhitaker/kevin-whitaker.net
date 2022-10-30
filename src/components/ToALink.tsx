export function ToALink({ children, ...props }: any) {
  return (
    <a
      {...(props as any)}
      href="https://toa.kevin-whitaker.net"
      className="text-blue-500 hover:text-blue-800 focus:text-blue-800 visited:text-purple-500 underline cursor-pointer"
    >
      {children || "https://toa.kevin-whitaker.net"}
    </a>
  );
}
