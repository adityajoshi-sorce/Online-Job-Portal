import React from "react";

function Header() {
  return (
    <div className="mt-10 flex flex-col gap-5 items-center justify-center text-white px-4 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        Your Ideal Job Awaits, Start The Search
      </h1>
      <p className="text-base sm:text-lg md:text-xl">
        Get Latest Job Openings that best suits for you!
      </p>
    </div>
  );
}

export default Header;
