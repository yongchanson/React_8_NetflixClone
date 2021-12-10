import { DefaultTheme } from "styled-components";
import { atom } from "recoil";

export const darkTheme: DefaultTheme = {
  bgColor: "#2f3640",
  textColor: "gray",
  accentColor: "yellow",
  cardBgColor: "black",
};

export const lightTheme: DefaultTheme = {
  bgColor: "lightgray",
  textColor: "black",
  accentColor: "orange",
  cardBgColor: "white",
};

export const Atom = atom({
  key: "isDark",
  default: true,
});