import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

export const HorizontalScrollContainer = styled(Container)({
  display: "flex",
  flexDirection: "row",
  marginTop: "2rem",
  overflowX: "auto",
  gap: "1rem",
  // Hiding the scrollbar from all browsers.
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
});

export const VerticalScrollContainer = styled(Container)({
  overflowY: "auto",
  "::-webkit-scrollbar": {
    width: "0.4rem",
  },
  "::-webkit-scrollbar-track": {
    boxShadow: "unset",
    borderRadius: "0.4rem",
  },
  "::-webkit-scrollbar-thumb": {
    background: "#C9C9C9",
    borderRadius: "0.4rem",
  },
});
