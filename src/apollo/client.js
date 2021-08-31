import { ApolloClient, createHttpLink, from } from '@apollo/client';
import { URL_BASE_GRAPHQL } from '../api';
import { typeDefs } from '../apollo/schema';
import { cache } from '../apollo/cache';
import { setContext } from '@apollo/client/link/context'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
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

export const apolloClient = new ApolloClient({
    cache,
    link: from([
        authLink,
        httpLink
    ]),
    typeDefs
})