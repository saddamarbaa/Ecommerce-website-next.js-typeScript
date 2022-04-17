import { ArrowLeftIcon } from '@heroicons/react/solid';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CountryType } from 'types';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  country: CountryType[];
};

function Index({ country }: Props) {
  const router = useRouter();

  return (
    <>
      {country.length > 0 && (
        <Head>
          <title> {country[0]?.name?.official}</title>
          <meta
            name="description"
            content={country[0]?.name?.nativeName?.ara?.official}
          />
        </Head>
      )}

      <div className="mt-[3rem] max-w-[90%] xl:w-96">
        <div
          className=" flex cursor-pointer  items-center justify-center   rounded p-3 shadow ring-1 ring-slate-900/5 dark:bg-slate-900 sm:max-w-[100px]"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon
            className="mr-2 h-4 w-4  text-slate-500  dark:text-slate-400"
            role="button"
            onClick={() => router.back()}
          />
          <button type="button" className="text-slate-500  dark:text-slate-400">
            Back
          </button>
        </div>
      </div>

      {country.length > 0 && (
        <div className="mb-8 mt-8  dark:bg-[#212E37] dark:text-gray-100 ">
          <div className="cursor-pointer">
            <div className="sm:flex  sm:space-x-[3rem] ">
              <div className="relative  mb-2 h-[15rem]   w-full  max-w-[95%] sm:max-w-[300px]">
                <Image
                  src={country[0]?.flags.png}
                  alt={country[0]?.name?.official}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col space-y-4">
                <div className="sm:flex sm:space-x-5">
                  <div>
                    <div className="p-4 pb-0 text-[1.1rem] font-bold  tracking-tight text-slate-600 dark:text-white sm:pt-0">
                      {country[0]?.name?.official}
                    </div>
                    <div className="flex flex-col space-y-2 p-4">
                      <div>
                        <span className="font-bold  text-slate-500 dark:text-slate-400">
                          Native Name:{' '}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {country[0]?.name?.nativeName?.ara?.official}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-500 dark:text-slate-400">
                          Population:{' '}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {country[0]?.population}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-500 dark:text-slate-400">
                          Region:{' '}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {country[0]?.region}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-500 dark:text-slate-400">
                          Sub Region:{' '}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {country[0]?.subregion}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-500 dark:text-slate-400">
                          Capital:{' '}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {country[0]?.capital}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex  flex-col space-y-2 p-4 pt-0">
                    {country[0]?.currencies && (
                      <div>
                        <span className="font-bold text-slate-500 dark:text-slate-400">
                          Currencies:{' '}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                          {/*  @ts-ignore */}
                          {Object.values(country[0]?.currencies)[0]?.name}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="font-bold text-slate-500 dark:text-slate-400">
                        languages:{' '}
                      </span>
                      {country[0]?.languages &&
                        Object.values(country[0]?.languages).map(
                          (item: any) => (
                            <span
                              key={uuidv4()}
                              className="text-slate-500 dark:text-slate-400"
                              style={{ minWidth: '80px' }}
                            >
                              {item}{' '}
                            </span>
                          )
                        )}
                    </div>
                  </div>
                </div>
                <div className="flex  max-w-xl flex-col space-y-2 p-4 pt-0">
                  <div className="items-center sm:flex">
                    <span className="font-bold text-slate-500 dark:text-slate-400">
                      Borders Currencies:{' '}
                    </span>

                    <div className="flex flex-wrap items-center justify-between">
                      {country[0]?.borders?.map((item: string) => (
                        <span
                          key={uuidv4()}
                          style={{ minWidth: '80px' }}
                          className=" m-2  flex  max-w-[100px] items-center   justify-center rounded p-2 shadow ring-1 ring-slate-900/5 dark:bg-slate-900"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!country.length && (
        <div className="mt-[3rem] w-full max-w-[90%] rounded-lg p-6 text-center shadow dark:bg-[#212E37] dark:text-gray-100 dark:shadow-lg sm:text-left">
          No Data Found
        </div>
      )}
    </>
  );
}
// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.query;
  // Fetch data from external API
  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  // Pass data to the page via props
  return { props: { country: data } };
};

export default Index;
