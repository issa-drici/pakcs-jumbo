import React from 'react'

import { Box, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const Searchbar = ({ searchTerm, handleSearchChange }) => {

  return (
    <>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
            <SearchIcon sx={{ mr: 1 }} />
            <InputBase placeholder='Tapez votre référence...' value={searchTerm} onChange={handleSearchChange} />
        </Box>
    </>
  )
}

export default Searchbar