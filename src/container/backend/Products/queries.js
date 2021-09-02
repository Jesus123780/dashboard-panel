import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS_BACK = gql`
query productsLogis($search: String, $min: Int, $max: Int) {
  productsLogis(search: $search, min: $min, max: $max) {
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
    sTateLogistic
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