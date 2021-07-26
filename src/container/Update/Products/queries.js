import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
query getOnePqr($hpqrId: ID, $thpId: ID){
  getOnePqr(hpqrId: $hpqrId, thpId: $thpId ){
    hpqrId
    thpId
    hpqrQuestion
  }
}
`
export const REGISTER_ONE_PQR = gql`
query getOnePqr($hpqrId: ID, $thpId: ID){
  getOnePqr(hpqrId: $hpqrId, thpId: $thpId ){
    hpqrId
    thpId
    hpqrQuestion
  }
}
`
export const GET_ONE_COLOR = gql`
query getAllColor{
  color{
    colorId
    Name
    cState
    DatCre
    DatMod
  }
}
`