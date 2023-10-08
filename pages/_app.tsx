import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react';

import RouteGuard from "@/components/elements/RouteGuard";
import "@/styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <RouteGuard>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </RouteGuard>
  )
};

export default App;
