import { gql } from '@apollo/client'

// Cambia la contraseña del usuario
export const CHANGE_PASS_USER = gql`
	mutation UpdateUser($input: UserUpdateInput){
    UpdateUser(input: $input)	
  }  		
`