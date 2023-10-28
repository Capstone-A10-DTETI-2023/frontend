import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react';
import PrivateRoute from "@/components/layouts/PrivateRoute";
import PROTECTED_ROUTES from "utils/constants/protectedRoutes";

import "@/styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <PrivateRoute protectedRoutes={PROTECTED_ROUTES}>
        <Component {...pageProps} />
      </PrivateRoute>
    </ChakraProvider>
  )
};

export default App;
