import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';

const Heading = styled.h1`
  color: ${({ theme }) => theme.color.primary.default};
`;

const Identifier: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Anmelden - SET.GO. Konten</title>
        <meta name="description" content="In SET.GO. anmelden" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading>Welcome</Heading>
      </main>
    </div>
  );
};

export default Identifier;
