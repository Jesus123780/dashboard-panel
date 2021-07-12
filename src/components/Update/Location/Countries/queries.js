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

export const EDIT_COUNTRIES = gql`
mutation($input: IEditCountries!){
editCountries(input: $input){
  c_id
  c_name
  c_calCod
  c_state
}
}
`
// No se esta usando
export const GET_ONE_COUNTRIES = gql`
query getOneCountry($c_calCod: String, $c_id: ID){
 getOneCountry(c_calCod: $c_calCod, c_id: $c_id ){
  c_name
  c_calCod
  c_state
  c_id
  
}
}
`