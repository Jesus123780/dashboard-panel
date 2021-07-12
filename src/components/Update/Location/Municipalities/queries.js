import { gql } from '@apollo/client';

export const UPDATE_MUNICIPALITIES = gql`
mutation($input: IMunicipalities){
  createMunicipalities(input: $input){
    m_id
    d_id
    m_name
    
  }
}
`

export const GET_MUNICIPALITIES = gql`
query getMunicipalities{
  getMunicipalities{
    m_id
    d_id
    m_name
    m_state
  }
}
`
export const EDIT_MUNICIPALITIES = gql`
mutation($input: IEditMunicipalities!){
editMunicipalities(input: $input){
	m_id
  m_name
}
}
`