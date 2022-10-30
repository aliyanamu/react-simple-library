import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const useView = () => {
  const theme = useTheme();

  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"), {
    noSsr: true,
  });

  const isDesktopView = useMediaQuery(theme.breakpoints.up("md"), {
    noSsr: true,
  });

  const isLargeScreenView = useMediaQuery(theme.breakpoints.up("lg"), {
    noSsr: true,
  });

  return { isDesktopView, isLargeScreenView, isMobileView };
};

export default useView;
