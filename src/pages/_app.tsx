import '@/styles/globals.css';

import { Inter, Poppins } from '@next/font/google';

import type { AppPropsWithLayout } from '@/types';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'optional',
});

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'optional',
});

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <div className={`${inter.variable} ${poppins.variable} font-sans h-full`}>
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}

export default App;
