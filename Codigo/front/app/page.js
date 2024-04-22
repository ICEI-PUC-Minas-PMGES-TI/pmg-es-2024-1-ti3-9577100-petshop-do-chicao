'use client'

import { ChakraProvider } from "@chakra-ui/react";
import Login from "./login/page";
import { theme } from "./theme";

export default function Page() {
  return (
    <ChakraProvider theme={theme}>
      <Login/>
    </ChakraProvider>
  );
}