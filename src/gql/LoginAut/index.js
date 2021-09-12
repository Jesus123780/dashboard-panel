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
  uPhoNum
  upLat
  upLon
  password
  createAt
}
}
`
export const GET_ALL_USER = gql`
query getAllUser($search: String){
  getAllUser(search: $search){
    id
    name
    username
    lastName
    email
    email
    siteWeb
    description
    uPhoNum
    upLat
    upLon
    createAt
    avatar
    latestMessage {
      uuid
      content
      from
      to
    }
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