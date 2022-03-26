import { AppProps } from 'next/app'
import { ReactNode } from "react";
import { NextPage } from "next"

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

function App({ Component, pageProps }: Props) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: ReactNode) => page)

  return getLayout(<Component {...pageProps} />)
}

export default App
