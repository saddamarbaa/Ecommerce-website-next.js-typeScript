import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import { CountryType } from 'types';
import { v4 as uuidv4 } from 'uuid';

import { useDebounce } from '@/components/custom-hooks';

type Props = {
  countries: CountryType[];
};

export function MainContent({ countries }: Props) {
  const [data, setData] = useState<CountryType[]>(countries);
  const [region, setRegion] = useState<string | ''>('');

  // State and setters for ... Search term
  const [searchTerm, setSearchTerm] = useState<string | ''>('');

  // Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms
  // As a result the API call should only fire once user stops typing
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    let url = 'https://restcountries.com/v3.1/all';

    if (debouncedSearchTerm) {
      url = `https://restcountries.com/v3.1/name/${debouncedSearchTerm}`;
    } else if (region) {
      url = `https://restcountries.com/v3.1/region/${region}`;
    }

    if (searchTerm || region) {
      setIsSearching(true);
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          // throw new Error(response.statusText);
          throw new Error('Something went wrong');
        })
        .then((responseData: CountryType[]) => {
          setIsSearching(false);
          setData(responseData);
        })
        .catch(() => {
          setIsSearching(false);
          setData([]);
        });
    }
  }, [region, debouncedSearchTerm]); // Only call effect if debounced search term or region changes

  return (
    <div className="flex w-full flex-col items-center ">
      <div className="w-full max-w-[90%] justify-between space-y-8 pt-[2rem] pb-[2rem] sm:flex  sm:space-y-0  lg:max-w-[100%]">
        <div className="form-control dar:shadow-xl font-norma xl:max-w-96 mb-3 flex w-full items-center  rounded bg-white py-3 px-4 text-base shadow ring-1 ring-slate-900/5 dark:bg-slate-900 sm:w-96  ">
          <SearchIcon
            className="h-15 w-5 text-[1.1rem] tracking-tight  text-slate-500  dark:text-slate-400"
            role="button"
          />
          <input
            type="search"
            className="flex-1 bg-transparent px-4 focus:outline-none"
            placeholder="Search for country"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        {isSearching && (
          <div className=" hidden max-w-[200px] items-center   py-3 px-4 text-base font-semibold    text-slate-500  dark:text-slate-200  sm:inline-flex">
            Searching ...
          </div>
        )}
        <div className="mb-3  cursor-pointer sm:ml-6">
          <select
            onChange={(event) => setRegion(event.target.value)}
            className="form-control dar:shadow-xl font-norma l block w-full rounded bg-white px-4 py-3  text-base shadow ring-1 ring-slate-900/5 focus:outline-none dark:bg-slate-900 sm:text-[1.2rem]"
            aria-label="form-select-lg"
            defaultValue="Filter by region"
          >
            <option disabled>Filter by region</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="America">America</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
      {isSearching && (
        <div className=" mt-[1rem] mb-[1rem] max-w-[200px] items-center  py-3 px-4 text-base font-semibold  text-slate-500  dark:text-slate-200 sm:hidden">
          Searching ...
        </div>
      )}

      <div className="mb-8 grid w-full max-w-[90%] grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-[100%]  lg:grid-cols-3  xl:grid-cols-4">
        {data.length > 0 &&
          data.map((country: CountryType) => (
            <Link href={`country/${country?.name?.official}`}>
              <div
                key={uuidv4()}
                className="w-full cursor-pointer rounded-lg bg-white shadow-xl ring-1  ring-slate-900/5  dark:bg-slate-900"
              >
                <div className="relative mb-2 h-[150px] w-full dark:bg-[#212E37] dark:text-gray-100 dark:shadow-lg">
                  <Image
                    src={country.flags.png}
                    alt={country?.name?.official}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col space-y-2 p-4">
                  <div className="mb-1  text-[1.1rem] font-bold tracking-tight text-slate-900 dark:text-white">
                    {country?.name?.official}
                  </div>
                  <div>
                    <span className="font-bold  text-slate-500 dark:text-slate-400">
                      Population:{' '}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {country.population}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500">Region: </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {country.region}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500">Capital: </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {country.capital}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      {data.length === 0 && (
        <div className="w-full max-w-[90%] rounded-lg bg-white  p-4   py-6 shadow-xl ring-1  ring-slate-900/5 dark:bg-slate-900  dark:text-gray-100  dark:shadow-lg lg:max-w-[100%]">
          No Data Found
        </div>
      )}
    </div>
  );
}
