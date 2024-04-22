import { extendTheme } from "@chakra-ui/react";
import { fonts } from "./fonts";

export const theme = extendTheme({
  
  colors: {
    primary: {
      50: '#ffe5e5',
      100: '#ffb8b8',
      200: '#990000',
      300: '#cc0000',
      400: '#ff2e2e',
      500: '#ff0000',
      600: '#cc0000',
      700: '#990000',
      800: '#660000',
      900: '#330000',
    },
  },
  components: {
    Button: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'sm',
        colorScheme: 'primary'
        
      },
    },
    Input: {
      defaultProps: {
        size: 'lg',
        variant: 'filled',
        colorScheme: ''        
      }
    }
  },
});