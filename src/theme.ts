import { PaletteMode } from "@mui/material";
import { LinkProps } from "@mui/material/Link";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
import { createContext, useState, useMemo } from "react";

import LinkBehavior from "./utils/linkBehaviour";

export const tokens = (mode: PaletteMode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414"
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1F2A40",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509"
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922"
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f"
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632"
        }
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0"
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0", // manually changed
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5"
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee"
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb"
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe"
        }
      })
});

export const themeSettings = (): ThemeOptions => ({
  palette: {
    mode: "light",
    primary: {
      main: "#448bff",
      light: "rgba(33,150,243,0.2)"
    },
    secondary: {
      main: "#000000"
    },
    text: {
      primary: "#000000",
      secondary: "rgba(0,0,0,0.6)"
    },
    error: {
      main: "#C80000",
      light: "#d32f2f1f"
    },
    success: {
      main: "#00972a",
      light: "#00972A1F"
    },
    info: {
      main: "#5135FF",
      light: "#8E7CFD1F"
    },
    divider: "rgba(0,0,0,0.12)",
    background: {
      default: "#fafafb",
      paper: "#ffffff"
    },
    action: {
      hover: "#448bff14",
      focus: "#448bff14"
    }
  },
  shape: {
    borderRadius: 8
  },
  typography: {
    fontFamily: "Nunito, sans-serif",
    h1: {
      fontSize: 34,
      lineHeight: 1.23,
      fontWeight: 500
    },
    h2: {
      fontSize: 24,
      fontWeight: 500,
      lineHeight: 1
    },
    h3: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1
    },
    h4: {
      fontSize: 18,
      fontWeight: 500
    },
    h5: {
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 1.43
    },
    body1: {
      fontSize: 16,
      lineHeight: 1.2
    },
    body2: {
      fontSize: 12,
      fontWeight: 400
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: 400
    },
    subtitle2: {
      fontSize: 16
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior
      } as LinkProps
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    }
  }
});

export const ColorModeContext = createContext({
  toggleColorMode: () => {
    //
  }
});

type UseModeType = [Theme, { toggleColorMode: () => void }];

export const useMode = (): UseModeType => {
  const [mode, setMode] = useState<PaletteMode>((window.localStorage.getItem("theme") as PaletteMode) || "light");

  const theme = useMemo(() => createTheme(themeSettings()), [mode]);

  (window as any).theme = theme; // eslint-disable-line @typescript-eslint/no-explicit-any

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode(prev => {
          const themeMode = prev === "light" ? "dark" : "light";

          return themeMode;
        })
    }),
    []
  );

  return [theme, colorMode];
};
