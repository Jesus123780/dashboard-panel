import { InMemoryCache, makeVar } from '@apollo/client'

export const isLoggedVar = makeVar({ state: !!localStorage.getItem('token'), expired: false })

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLogged: {
                    read: () => isLoggedVar()
                }
            }
        }
    }
})