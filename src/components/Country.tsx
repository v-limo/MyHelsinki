import { Box, IconButton } from '@mui/material'
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone'
import { Link } from 'react-router-dom'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useDispatch } from 'react-redux'

import {
  taggleFevoutite,
  taggleVisit,
} from '../features/countries/countriesSlice'
import { CountryTypes } from '../features/countries/types'

type CountryProps = {
  country: CountryTypes
}

export const Country = ({ country }: CountryProps) => {
  const dispatch = useDispatch()

  const handleFevorite = (name: string) => {
    dispatch(taggleFevoutite(name))
  }

  const handleVisted = (name: string) => {
    dispatch(taggleVisit(name))
  }
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '0.7fr 1.5fr 0.9fr 1.4fr 0.8fr 0.7fr 0.25fr',
        flexWrap: 'nowrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottom: 0.5,
        minHeight: '100px',
        cursor: 'pointer',
      }}
    >
      <Box sx={{ maxHeight: '100%' }}>
        <img
          src={country?.flags?.svg || country?.flags?.png}
          alt={country?.name?.common}
          loading='lazy'
          width='100%'
        />
      </Box>

      <Link
        to={`/countries/${country?.name?.official}`}
        style={{ textDecoration: 'none', color: 'secondary' }}
      >
        <Box
          sx={{
            textDecoration: 'none',
            cursor: 'pointer',
            color: 'secondary',
          }}
        >
          {country?.name?.common}
        </Box>
      </Link>

      <Box>{country?.region}</Box>
      <Box>{country?.capital || 'N/A'}</Box>
      <Box>
        {country?.population >= 1000000 &&
          `~${(country?.population / 1000000).toFixed(2)} M`}
        {country?.population > 1000 &&
          country?.population < 1000000 &&
          `~${(country?.population / 1000).toFixed(2)} K`}
        {country?.population <= 1000 && `${country?.population}`}
      </Box>
      <IconButton onClick={() => handleVisted(country?.name?.official)}>
        {country?.visited ? (
          <VisibilityTwoToneIcon />
        ) : (
          <VisibilityOffTwoToneIcon />
        )}
      </IconButton>
      <IconButton
        onClick={() => handleFevorite(country?.name?.official)}
        sx={{
          '&:hover': {
            backgroundColor: 'red',
            padding: 1.1,
          },
        }}
      >
        <FavoriteIcon sx={{ color: country?.fevourite ? 'red' : 'primary' }} />
      </IconButton>
    </Box>
  )
}
