import styled from "styled-components";

import { devices } from "@/src/constants/devices";
import Link from "next/link";

export const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${devices.sm} {
    & > div:first-child {
      display: none;
    }
  }
`;

export const Logo = styled(Link)`
  & > p {
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
  }

  & span {
    color: ${({ theme }) => theme.colors};
  }

  ${devices.md} {
    & > p {
      font-size: 18px;
      line-height: 20px;
    }
  }
`;

export const Links = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;

  ${devices.md} {
    flex-direction: row;
  }
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.green};

  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
`;
