import { ApolloClient, createHttpLink, from, split } from '@apollo/client';
import { URL_BASE_GRAPHQL } from '../api';
import { typeDefs } from '../apollo/schema';
import { cache } from '../apollo/cache';
import { setContext } from '@apollo/client/link/context'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

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
            client: 'ifood'
        }
    }
})
/**
 * Configuracion de WebSocket
 *  @autor Jesus Juvinao
 */
const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
        reconnect: true,
        connectionParams: {
            Authorization: localStorage.getItem('token') || '',
        },
    },
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
        );
    },
    httpLink,
);
export const apolloClient = new ApolloClient({
    cache,
    link: from([
        authLink,
        httpLink,
        wsLink,
        splitLink
    ]),
    typeDefs
})