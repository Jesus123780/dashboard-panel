import './App.css';
import { useState, useEffect, useMemo } from 'react'
import { BrowserRouter, Route, Router, Switch, Redirect } from 'react-router-dom'
import { Books } from './components/books/index'
import ContextLayout from './Context';
import { Suspense } from 'react';
import { Loading } from './components/Loading';
import { Login } from './pages/Login';
import withClearCache from './ClearCache';
import { NotFound } from './components/NotFound';
import AutoContext from './AutoContext'
import { decodeToken, getToken, removeToken } from './utils'
import { UserProfile } from './pages/UserProfile';
import { LayoutMain } from './components/layout'
import { Banner } from './pages/Update/Banner';
import { Categories } from './pages/Update/Categories';
import { Kit } from './pages/Update/Kit';
import { Offers } from './pages/Update/Offers';
import { OficialStores } from './pages/Update/OficialStores';
import { PopularCategories } from './pages/Update/PopularCategories';
import { PQR } from './pages/Update/PQR';
import { Products } from './pages/Update/Products';
import { Chat } from './pages/Chat';
import { Location } from './pages/Update/location';
import { history } from './utils';

function App() {
    const [auth, setAuth] = useState(undefined)

    useEffect(() => {
        const token = getToken()
        if (!token) {
            setAuth(null)
        } else {
            setAuth(decodeToken(token))
        }
    }, [])
    const logout = () => {
        // eslint-disable-next-line
        removeToken()
        setAuth(null)
    }
    const setUser = user => {
        setAuth(user)
    }
    const authData = useMemo(
        () => ({
            auth,
            logout,
            setUser
        }),
        [auth]
    )
    if (auth === undefined) return null
    return (
        <BrowserRouter>
            <Router history={history}>
                <AutoContext.Provider value={authData}>
                    {!auth ?
                        <Switch>
                            <Route component={Login} />
                            <Route component={NotFound} />
                        </Switch>
                        :
                        <Switch>
                            <Route>
                                <ContextLayout.Consumer>
                                    {
                                        ({ error }) => <LayoutMain error={error}>
                                            <Suspense fallback={<Loading />} >
                                                <Switch>
                                                    <Route exact path='/' component={Books} />
                                                    {/* Panel de usuarios */}
                                                    <Route exact path='/user/:uUsername/admin' component={UserProfile} />
                                                    <Route exact path='/banner/home' component={Banner} />
                                                    {/* Update Sección */}
                                                    <Route exact path='/update/category' component={Categories} />
                                                    <Route exact path='/update/kit' component={Kit} />
                                                    <Route exact path='/update/offers' component={Offers} />
                                                    <Route exact path='/update/oficialstores' component={OficialStores} />
                                                    <Route exact path='/update/popularCategories' component={PopularCategories} />
                                                    <Route exact path='/update/products' component={Products} />
                                                    <Route exact path='/update/PQR' component={PQR} />
                                                    <Route exact path='/update/location' component={Location} />

                                                    {/* Chat */}
                                                    <Route exact path='/chat' component={Chat} />
                                                    <Route component={NotFound} />
                                                    <Redirect to="/" />
                                                </Switch>
                                            </Suspense>
                                        </LayoutMain>
                                    }
                                </ContextLayout.Consumer>
                            </Route>
                        </Switch>
                    }
                </AutoContext.Provider >
            </Router>
        </BrowserRouter>
    )

}

const ClearCacheComponent = withClearCache(App)

export default () => <ClearCacheComponent />