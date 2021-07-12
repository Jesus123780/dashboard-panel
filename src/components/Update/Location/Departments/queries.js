import { gql } from '@apollo/client';

export const UPDATE_DEPARTMENT = gql`
mutation($input: IDepartments!){
  createDepartments(input: $input ){
    d_id
    c_id
    d_name
    d_name
  }
  
}
`

export const GET_DEPARTMENT = gql`
query  departments{
  departments{
    d_id
    c_id
    d_name
    d_state
  }
}
`
export const EDIT_DEPARTMENT = gql`
mutation($input: IEditDepartments!){
editDepartments(input: $input){
  c_id
  d_name
  d_name
  d_state
}
}
`