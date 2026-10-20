export default function ThemeIcon({ darkMode }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={darkMode
        ? "M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
        : "M12 3v1m0 16v1m8.66-9h1m-17.32 0h1M16.24 7.76l.71-.71m-9.9 9.9l.71-.71M16.24 16.24l.71.71m-9.9-9.9l.71.71M12 7a5 5 0 100 10 5 5 0 000-10z"} />
    </svg>
  );
}
