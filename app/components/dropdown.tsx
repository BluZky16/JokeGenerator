"use client";

import { useState } from "react";

interface DropdownProps {
  selected: string;
  setSelected: (value: string) => void;
}

export default function Dropdown({ selected, setSelected }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const options = ["Flirty", "Dark", "Dad Joke", "Funny", "Corny"];

  return (
    <div className="relative flex flex-col gap-4 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="generate-button"
      >
        {selected} <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="dropdown-item"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}