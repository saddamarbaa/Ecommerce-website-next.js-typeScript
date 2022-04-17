import { GetServerSideProps } from 'next';
import { CountryType } from 'types/index';

import { MainContent } from '@/page-components';

type Props = {
  countries: CountryType[];
};

export default function Index({ countries }: Props) {
  return <MainContent countries={countries} />;
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from external API
  const res = await fetch('https://restcountries.com/v3.1/all');
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  // Pass data to the page via props
  return { props: { countries: data } };
};
