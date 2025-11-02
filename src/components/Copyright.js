"use client";

export default function Copyright() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <p className="text-sm text-gray-400 text-center">
      {`© Copyright ${new Date().getFullYear()} `}
      <button
        onClick={scrollToTop}
        className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
      >
        Fortex Ad Media
      </button>
      . All Rights Reserved
    </p>
  );
}
