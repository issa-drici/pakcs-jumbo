"use client"
import React from 'react'

import { Box, Typography } from '@mui/material'

import Navbar from '../../components/Navbar'
import Pagetitle from '../../components/Pagetitle'
import Searchbar from '../../components/Searchbar'

const mouvements = () => {
  return (
    <div>
        <Navbar />
        <Pagetitle title='Mouvements' subtitle='Analysez les entrées et sorties de vos références' />
        <Searchbar />
        <Box>

        </Box>
    </div>
  )
}

export default mouvements