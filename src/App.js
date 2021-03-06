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
import { Banner } from './pages/Update/Banner';
import { Kit } from './pages/Update/Kit';
import { Offers } from './pages/Update/Offers';
import { OficialStores } from './pages/Update/OficialStores';
import { PopularCategories } from './pages/Update/PopularCategories';
import { PQR } from './pages/Update/PQR';
import { Chat } from './pages/Chat';
import { Location } from './pages/Update/location';
import { history } from './utils';
import { Information } from './components/Update/Information';
import { ProductsC } from './container/Update/Products';
import { ContextMenu } from './components/positionMap';
import { FloatMenu } from './components/MenuFloat';
import { Drag } from './components/drag';
import { ProductsBack } from './pages/backend';
import { Categories } from './pages/Categories';
import { LayoutMain } from './pages/layout';
import { Modules } from './pages/Modules';
import { Messages } from './pages/Messages';
import { ChatC } from './componentshat/Chat/Chat';
import { SignIn } from './componentshat/Join/Join';

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
                                        ({ error }) => <LayoutMain error={error} error={error}>
                                            <Suspense fallback={<Loading />} >
                                                <Switch>
                                                    <Route exact path='/' component={SignIn} />
                                                    <Route exact path='/chat' component={ChatC} />
                                                    <Route exact path='/books' component={Books} />
                                                    {/* Panel de usuarios */}
                                                    <Route exact path='/u/:uUsername' component={UserProfile} />
                                                    <Route exact path='/banner/home' component={Banner} />
                                                    {/* Update Secci??n */}
                                                    <Route exact path='/update/category' component={Categories} />
                                                    <Route exact path='/update/kit' component={Kit} />
                                                    <Route exact path='/update/offers' component={Offers} />
                                                    <Route exact path='/update/oficialstores' component={OficialStores} />
                                                    <Route exact path='/update/popularCategories' component={PopularCategories} />
                                                    <Route exact path='/update/PQR' component={PQR} />
                                                    <Route exact path='/update/products' component={ auth && ProductsC} />
                                                    <Route exact path='/update/location' component={Location} />
                                                    <Route exact path='/update/information' component={Information} />
                                                    {/* Delete Secci??n */}
                                                    {/* <Route exact path='/update/category' component={Categories} />
                                                    <Route exact path='/update/kit' component={Kit} />
                                                    <Route exact path='/update/offers' component={Offers} />
                                                    <Route exact path='/update/oficialstores' component={OficialStores} />
                                                    <Route exact path='/update/popularCategories' component={PopularCategories} />
                                                    <Route exact path='/delete/products' component={Products} />
                                                    <Route exact path='/update/PQR' component={PQR} />
                                                    <Route exact path='/update/location' component={Location} /> */}

                                                    {/* Chat */}
                                                    <Route exact path='/messages' component={Messages} />
                                                    <Route exact path='/chatrandom' component={Chat} />
                                                    <Route exact path='/position' component={ContextMenu} />
                                                    <Route exact path='/drag' component={Drag} />
                                                    <Route exact path='/menu' component={FloatMenu} />
                                                    {/* Logistica */}
                                                    <Route exact path='/logistica' component={ProductsBack} />
                                                    {/* Modules */}
                                                    <Route exact path='/modules' component={Modules} />
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