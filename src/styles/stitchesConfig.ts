import { createStitches } from "@stitches/react";

export const asRem = (size: number) => {
  return `${size / 16}rem`;
}

export const { styled, createTheme, globalCss, keyframes } = createStitches({
  theme: {
    colors: {
      colorPrimary: '#ffffff',
      colorSecondary: '#000000',
      colorGold: 'gold',
    },
    fonts: {
      titleFont: asRem(32),
      subTitleFont: asRem(18),
      normal: asRem(14),
    },
    shadows: {
      shadowGold: 'gold',
    }
  },
});

export const darkTheme = createTheme('dark-theme', {
  colors: {
    colorPrimary: '#000000',
    colorSecondary: "#ffffff",
    colorGold: 'gold',
    color1: '#181818',
    color2: '#3F4346',
    color3: '#5799ef',
    color4: '#767676',
    colorRGBWhite: "255, 255, 255",
    colorRGBBlack: "0, 0, 0",
  },
  fontSizes: {
    titleFont: asRem(32),
    subTitleFont: asRem(18),
    normal: asRem(14),
  },
  shadows: {
    shadowGold: 'gold',
  },
});

export const globalStyles = globalCss({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },
  body: {
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  },
  'h1, h2, h3, h4, h5, h6': {
    margin: 0,
  },
  a: {
    textDecoration: 'none',
    color: 'inherit',
  },
  button: {
    cursor: 'pointer',
  },
});

export const Button = styled('button', {
  cursor: 'pointer',
  variants: {
    styled: {
      noStyle: {
        padding: 0,
        margin: 0,
        background: 'transparent',
        border: 'none',
      },
      normal: {
        padding: `${asRem(10)} ${asRem(20)}`,
        borderRadius: asRem(10),
        background: "$colorPrimary",
        ouline: "none",
        color: "$colorSecondary",
        border: "none",
        boxShadow: `${asRem(0)} ${asRem(0)} ${asRem(2)} ${asRem(0)} $shadowGold`,
        fontSize: asRem(14),
      }
    },
  },
})
