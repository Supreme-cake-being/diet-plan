"use client";

import Link from "next/link";
import { useState } from "react";
import { Logout } from "../Logout";

interface IMobileMenu {
  isLoggedIn: boolean;
}

export const MobileMenu = ({ isLoggedIn }: IMobileMenu) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hidden sm:block">
      <button onClick={toggleIsOpen}>
        <svg
          width="28"
          height="28"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <path
            fill="#000000"
            d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute inset-0 bg-gray-800 pt-[56px] px-[16px] pb-[16px] flex flex-col justify-between">
          <button
            onClick={toggleIsOpen}
            className="absolute top-[16px] right-[16px]"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 5L5 19M5.00001 5L19 19"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <ul className="flex flex-col gap-[16px]">
            <Link
              href="/"
              className="font-medium text-xl text-emerald-500"
              onClick={toggleIsOpen}
            >
              Home
            </Link>
            <Link
              href="/generate-meal-plan"
              className="font-medium text-xl text-emerald-500"
              onClick={toggleIsOpen}
            >
              Generate meal plan
            </Link>
            <Link
              href="/meals"
              className="font-medium text-xl text-emerald-500"
              onClick={toggleIsOpen}
            >
              Meals
            </Link>
            <Link
              href="/ingredients"
              className="font-medium text-xl text-emerald-500"
              onClick={toggleIsOpen}
            >
              Ingredients
            </Link>
          </ul>

          {isLoggedIn ? (
            <div className="flex justify-center">
              <Logout />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Link
                href="/signup"
                className="px-[36px] py-[8px] rounded-lg bg-emerald-500 text-white"
                onClick={toggleIsOpen}
              >
                Signup
              </Link>
              <Link
                href="sign-in"
                className="text-base text-emerald-500"
                onClick={toggleIsOpen}
              >
                Already a member? Sign In
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
