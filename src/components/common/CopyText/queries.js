import { gql } from '@apollo/client'

// Registrar usuarios
export const CREATE_USER_LOGIN = gql`
    mutation signup($input: SignUpInput!) {
        signUpUser(input: $input) {
            success
            message
        }
    }
`