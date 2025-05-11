import { NavBar } from "@/src/components/NavBar/NavBar";
import { Container } from "./SharedLayout.styled";

export const SharedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Container>
      <NavBar />
      {children}
    </Container>
  );
};
