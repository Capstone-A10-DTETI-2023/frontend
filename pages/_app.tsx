import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react';
import ProtectedRouteProvider from "@/components/layouts/ProtectedRouteProvider";
import RootLayout from "@/components/layouts/RootLayout";
import PROTECTED_ROUTES from "utils/constants/protectedRoutes";

import "@/styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <ProtectedRouteProvider protectedRoutes={PROTECTED_ROUTES}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ProtectedRouteProvider>
    </ChakraProvider>
  )
};

export default App;
