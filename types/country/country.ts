export type CountryType = {
  name: {
    official: string;
    nativeName?: {
      ara: {
        official: string;
      };
    };
  };
  region: string;
  population: number;
  capital: string[];
  flags: {
    png: string;
  };
  languages?: any;
  currencies?: any;
  subregion?: string;
  borders?: string[];
};

export interface _countryReducerState {
  list: CountryType[];
  listIsLoading: false;
  listIsSuccess: false;
  listIsError: false;
  listMessage: string;
}
