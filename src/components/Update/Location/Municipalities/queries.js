import { gql } from '@apollo/client';

export const UPDATE_MUNICIPALITIES = gql`
mutation createCity($input: ICity){
	createCity(input: $input){
    cId
    dId
    cName
    cState
  }
}
`

export const GET_MUNICIPALITIES = gql`
query getAllCities{
  getCities{
    ctId
    dId
    cName
    cState
    cDatCre
    cDatMod
  }

}
`
export const EDIT_MUNICIPALITIES = gql`
mutation cityeditMutation($input: IEditMunicipalities!){
	editMunicipalities(input: $input){
    cId
    dId
    cName
    cState
  }
}
`