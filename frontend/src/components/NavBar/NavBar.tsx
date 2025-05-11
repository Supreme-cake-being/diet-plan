import { useState } from "react";
import { Bar, Links, Logo, StyledLink } from "./NavBar.styled";

import CrossIcon from "@/public/x.svg";

export const NavBar = () => {
  const pathes = {
    home: "/",
    generateMealPlan: "/generate-meal-plan",
    meals: "/meals",
    ingredients: "/ingredients",
  };

  return (
    <Bar>
      <Links>
        <StyledLink href="/">Home</StyledLink>
        <StyledLink href="/generate-meal-plan">Generate meal plan</StyledLink>
        <StyledLink href="/meals">Meals</StyledLink>
        <StyledLink href="/ingredients">Ingredients</StyledLink>
      </Links>

      <Logo href="/">
        <p>
          <span>diet</span>plan.
        </p>
      </Logo>
    </Bar>
  );
};
