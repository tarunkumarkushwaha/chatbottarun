import React from "react";

const UiInput = ({ placeholder, value, change }) => {
  return (
    <input
      type="text"
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300"
      placeholder={placeholder}
      value={value}
      onChange={change}
    />
  );
};

export default UiInput;
