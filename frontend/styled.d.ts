import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      white: string;
      black: string;
      grey: string;
      light_grey: string;
      yellow: string;
      green: string;
      black20: string;
      black50: string;
      black80: string;
    };
  }
}
