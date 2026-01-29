import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#005461] text-white ">
      <div className=" my-2 py-2 text-center">
        <p className="text-blue-100 text-sm">
          © {currentYear} LostFound. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
