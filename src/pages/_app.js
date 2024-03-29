import '@styles/tailwind.css';
import Head from 'next/head';
import { ProviderAuth } from '@hooks/use-auth';

function MyApp({ Component, pageProps }) {
  return (
    <ProviderAuth>
      <Head>
        <title>Stream Play Manager</title>
        <meta name="description" content="Aplication Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-none">
        <Component {...pageProps} />
      </main>
    </ProviderAuth>
  );
}

export default MyApp;
