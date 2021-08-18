import { ApolloClient, createHttpLink, from } from '@apollo/client';
import { URL_BASE_GRAPHQL } from '../api';
import { typeDefs } from '../apollo/schema';
import { cache, isLoggedVar } from '../apollo/cache';
import { setContext } from '@apollo/client/link/context'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { onError } from '@apollo/client/link/error'
// import useAuth from '../components/hooks/useAuth';

const httpLink = createHttpLink({ uri: URL_BASE_GRAPHQL })

// busca el id del dispositivo
const getDeviceId = async () => {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    return result.visitorId
}

const authLink = setContext(async (_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || '',
            deviceid: await getDeviceId() || '',
            client: 'ml.app.investor'
        }
    }
})
const errorHandler = onError(({ graphQLErrors }) => {
    localStorage.clear()
    if (!graphQLErrors) {
        graphQLErrors?.length && graphQLErrors.forEach(err => {
            const { code } = err.extensions
            if (code === 'UNAUTHENTICATED' || code === 'FORBIDDEN') isLoggedVar({ state: false, expired: true, message: 'Ha ocurrido un problema.', code: 500 })
            else if (code === 403) {
                localStorage.clear()
                isLoggedVar({ state: false, expired: true, message: 'La sesión ha expirado.', code })
            } else isLoggedVar({ ...isLoggedVar(), message: err.message, code })
        })
    }
})
export const apolloClient = new ApolloClient({
    cache,
    link: from([
        errorHandler,
        authLink,
        httpLink
    ]),
    typeDefs
})