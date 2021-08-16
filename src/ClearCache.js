import React, { useState, useEffect } from 'react'
import packageJson from '../package.json'
import moment from 'moment'
import { SpinnerColorJust } from './components/Loading'
// import { Loading } from './components/Loading'

const buildDateGreaterThan = (latestDate, currentDate) => {
    const momLatestDateTime = moment(latestDate)
    const momCurrentDateTime = moment(currentDate)
    return momLatestDateTime.isAfter(momCurrentDateTime)
}

function withClearCache(Component) {
    function ClearCacheComponent(props) {
        const [isLatestBuildDate, setIsLatestBuildDate] = useState(false)

        const refreshCacheAndReload = () => {
            if (caches) {
                // Service worker cache should be cleared width caches.delete()
                caches.keys().then(names => {
                    for (const name of names) {
                        caches.delete(name)
                    }
                })
                // eslint-disable-next-line
                console.log('forcing reload...')
                // Hard Reload
                window.location.reload()
            }
        }

        useEffect(() => {
            fetch('/meta.json')
                .then(response => response.json())
                .then(meta => {
                    const latestVersionDate = meta.buildDate
                    const currentVersionDate = packageJson.buildDate

                    const shouldForceRefresh = buildDateGreaterThan(latestVersionDate, currentVersionDate)
                    if (shouldForceRefresh) {
                        setIsLatestBuildDate(false)
                        refreshCacheAndReload()
                    } setIsLatestBuildDate(true)
                })
                .catch(() => {
                    // eslint-disable-next-line
                        console.log('Err:', 'meta.json no read')
                    setIsLatestBuildDate(true)
                })
        }
        , [])
        // Cambiar cuando se haga deploy
        // if (process.env.NODE_ENV !== 'production') return <Component {...props} />
        if (process.env.NODE_ENV === 'production') return <Component {...props} />
        return <React.Fragment>
            {isLatestBuildDate ? <Component {...props} /> : <SpinnerColorJust />}
        </React.Fragment>
    }
    return ClearCacheComponent
}

export default withClearCache