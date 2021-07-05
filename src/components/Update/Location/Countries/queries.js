import { gql } from '@apollo/client';

export const UPDATE_COUNTRIES = gql`
mutation($input: ICountries ){
  createCountries(input: $input ){
    c_id
    c_name
    c_calCod
  }
}
`

export const GET_COUNTRY = gql`
query  countries{
  countries{
    c_id
    c_name
    c_calCod
  }
}
`