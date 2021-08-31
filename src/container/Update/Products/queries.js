import { gql } from '@apollo/client';

export const GET_ALL_PQR = gql`
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
  getAllColor{
    colorId
    colorName
    colorState
  }
}
`
export const UPDATE = gql`
mutation updateProducts($input: InputProduct){
  updateProducts(input: $input){
    pId
    sizeId #Talla
    colorId #Color
    cId  #Country
    dId  #Department
    ctId  #Cuidad
    pName
    ProPrice
    ProDescuento
	  ProUniDisponibles
	  ProDescription
	  ProProtegido
	  ProAssurance
	  ProStar
	  ProImage
	  ProWidth
	  ProHeight
	  ProLength
	  ProWeight
	  ProQuantity
	  ProOutstanding
	  ProDelivery
	  ProVoltaje
  }
}
`
export const DELETE_ONE_PRODUCT = gql`
mutation deleteProducts($input: IDeleteProduct){
    pId
    pState
}
`
export const GET_ALL_PRODUCTS = gql`
query productsAll {
  productsAll{
    pId
    sizeId #Talla
    colorId #Color
    cId  #Country
    dId  #Department
    ctId  #Cuidad
    pName
    ProPrice
    ProDescuento
	  ProUniDisponibles
	  ProDescription
	  ProProtegido
	  ProAssurance
	  ProStar
	  ProImage
	  ProWidth
	  ProHeight
	  ProLength
	  ProWeight
	  ProQuantity
	  ProOutstanding
	  ProDelivery
	  ProVoltaje
    pState
  }
}
`