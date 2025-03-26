import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "./SharedLayout.styled";
// import { NavBar } from "@components/NavBar/NavBar";
// import { Loader } from "@components/Loader/Loader";

export const SharedLayout = () => {
  return (
    <Container>
      {/* <NavBar /> */}
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </Container>
  );
};
