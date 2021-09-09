import { gql } from '@apollo/client'
export const GET_MODULES = gql`
    query getModules($data: IQModule!){
        modules(input: $data) {
            mId
            mName
            mPath
            mPriority
            mIcon
            mState
            subModules {
                smId
                mId
                smPath
                smName
                smPriority
                smState
            }
        }
    }
`
export const GET_USER_MASTER = gql`
    query($umSeCredential: ID!) {
        getUserMaster(umSeCredential: $umSeCredential) {
            umId
            umSeCredential
        }
    }
`