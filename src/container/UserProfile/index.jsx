import { useQuery, useMutation } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import { UserProfile } from '../../components/UserProfile'
import { GET_USER } from '../../gql/LoginAut'
import { UPDATE_AVATAR } from '../../gql/LoginAut'

export const UserProfileC = () => {
    // Parametros para obetener el nombre del usuario
    const params = useParams()
    const { uUsername } = useParams()
    // Query para buscar a los usuarios por usuario
    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            username: uUsername
        }
    })
    const [updateAvatar] = useMutation(UPDATE_AVATAR)
    const handleFileChange = async e => {
        const file = e.target.files[0]?.name
        // eslint-disable-next-line
        console.log(file)
        try {
            const Response = await updateAvatar({ variables: { file } })
            // eslint-disable-next-line
            console.log(Response)
        } catch (err) {
            // eslint-disable-next-line
            console.log(err)

        }
    }

    return (
        <UserProfile
            params={params}
            error={error}
            data={data}
            handleFileChange={handleFileChange}
            loading={loading}
            values
            handleChangePass
        />
    )
}