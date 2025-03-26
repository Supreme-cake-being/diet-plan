import styled from "styled-components";
import { devices } from "@constants/devices";

export const Container = styled.div`
  min-width: 320px;
  max-width: 375px;

  padding-left: 20px;
  padding-right: 20px;
  margin-right: auto;
  margin-left: auto;

  font-family: "Inter", sans-serif;

  ${devices.md} {
    max-width: 768px;

    padding-left: 32px;
    padding-right: 32px;
  }

  ${devices.lg} {
    max-width: 1080px;
  }
`;
