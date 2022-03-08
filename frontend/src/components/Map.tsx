import { useState, memo } from 'react'
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import { useDispatch, useSelector } from 'react-redux'

import { MapStyleDark } from '../img/mapStyle'
import { Place } from '../features/places/types'
import { Box } from '@mui/system'

import { selectPlaces, sortPlaces } from '../features/places/placesSlice'
import { PlaceCard } from './PlaceCard'

const containerStyle = {
  width: '100%',
  height: '100vh',
}

const center = {
  lat: 60.251232,
  lng: 24.90967,
}

function Map(children: React.ReactNode) {
  const dispatch = useDispatch()
  const { places } = useSelector(selectPlaces)
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  return (
    <Box sx={{ flex: 2.5 }}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY as string}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11.251232}
        >
          {places?.map((place) => (
            <Marker
              key={place.id + Math.random()}
              title={place?.name?.en}
              opacity={0.9}
              position={{
                lat: place?.location?.lat,
                lng: place?.location?.lon,
              }}
              onClick={() => {
                setSelectedPlace(place)
                dispatch(sortPlaces(place.id))
              }}
            />
          ))}

          <InfoWindow
            // position={{
            //   lat: selectedPlace?.location?.lat as number,
            //   lng: selectedPlace?.location?.lon as number,
            // }}
            position={center}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <PlaceCard place={selectedPlace} />
          </InfoWindow>
        </GoogleMap>
      </LoadScript>
    </Box>
  )
}

export default Map
