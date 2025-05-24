import React from 'react'

import { Box, Typography, Divider } from '@mui/material'

const Pagetitle = ({title, subtitle}) => {
  return (
    <div>
        <Box sx={{ display: 'flex',
             alignItems: 'center',
              justifyContent: 'center',
               textAlign: 'center'}}
            >
            <Typography variant='h4'>
                {title}
            </Typography>
        </Box>

        <Box sx={{ display: 'flex',
             alignItems: 'center',
              justifyContent: 'center',
               textAlign: 'center'}}
            >
            <Typography variant='h6' sx={{ color: '#555' }}>
                {subtitle}
            </Typography>
        </Box>

        <Divider orientation='horizontal' variant='middle' sx={{ mt: 3 }}/>
    </div>
  )
}

export default Pagetitle