import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation login($input: LoginInput){
  login(input: $input){
    token
  }
}
`
export const GET_USER = gql`
query getUser($id: ID, $username: String, $name: String){
 getUser(id: $id, username: $username, name: $name, ){
  id
  name
  username
  email
  description
  avatar
  siteWeb
}
}
`
export const UPDATE_AVATAR = gql`
mutation updateAvatar($file: Upload){
  UpdateAvatar(file: $file){
    status
    urlAvatar
  }
}
`