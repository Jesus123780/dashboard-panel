import { gql } from '@apollo/client';

export const UPDATE_IDENTITY_EXAMPLE = gql`
mutation($input: ICountry ){
  createCountry(input: $input ){
    cId
    cName
    cCalCod
    cState
  }
}
`