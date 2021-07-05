import { useState } from 'react'
import PropTypes from 'prop-types'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { Card, Div, Span, Text, IMG } from './styled'

export const Map = withScriptjs(withGoogleMap(props => {

    const [showInfo, setShowInfo] = useState(false)
    const [dataMap, setDataMap] = useState({})
    const handleClick = x => {
        setShowInfo(true)
        setDataMap(x)
    }

    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: 11.002549188326553, lng: -74.79031952559009 }}
        >
            {!!(props?.isMarkerShown && props?.data?.getDoctors?.length) && props?.data?.getDoctors?.map((x, i) => <div key={i}>
                <Marker
                    key={i}
                    position={{
                        lat: parseInt(x?.clinic?.cliLatitude),
                        lng: parseInt(x?.clinic?.cliLength)
                    }}
                    icon={{
                        url: IMG,
                        // eslint-disable-next-line no-undef
                        anchor: new google.maps.Point(20, 20),
                        // eslint-disable-next-line no-undef
                        scaledSize: new google.maps.Size(37, 37),
                    }}
                    onClick={() => handleClick(x)}
                />
            </div>)}

            {showInfo && (
                <InfoWindow
                    onCloseClick={() => setShowInfo(false)}
                    position={{
                        lat: parseInt(dataMap?.clinic?.cliLatitude),
                        lng: parseInt(dataMap?.clinic?.cliLength)
                    }}
                >
                    <Card>
                        <Span>
                            {dataMap?.drFirstNam} {dataMap?.drLastNam}
                            &nbsp;
                        </Span>
                        <Div>
                            <Text>{dataMap?.category?.cName}</Text>
                            <br/>
                            <br/>
                        </Div>
                        <br/>
                        <Div>
                            <div>
                                <Text>
                                    &nbsp;
                                    Colombia, B/Quilla/Atlántico
                                </Text>
                            </div>
                            <div>
                                <Text>
                                    &nbsp;
                                    Disponible hasta 25 de marzo
                                </Text>
                            </div>
                            <div>
                                <Text>
                                    &nbsp;
                                    $50.000 - $700.000
                                </Text>
                            </div>
                        </Div>
                    </Card>
                </InfoWindow>)}
        </GoogleMap>
    )}))

Map.propTypes = {
    google: PropTypes.func
}