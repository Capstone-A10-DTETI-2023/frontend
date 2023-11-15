import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react';
import ProtectedRouteProvider from "@/components/layouts/ProtectedRouteProvider";
import RootLayout from "@/components/layouts/RootLayout";
import PROTECTED_ROUTES from "utils/constants/protectedRoutes";

import { Nunito } from 'next/font/google';
const nunito = Nunito({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  style: ['italic', 'normal'],
  subsets: ['latin'],
  display: 'swap'
})

import "@/styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={nunito.className}>
      <ProtectedRouteProvider protectedRoutes={PROTECTED_ROUTES}>
        <ChakraProvider>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </ChakraProvider>
      </ProtectedRouteProvider>
    </main>
  )
};

export default App;
