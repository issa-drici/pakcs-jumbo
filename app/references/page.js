"use client"
import React from 'react'

import { Box, Button, Card, CardContent, Typography, CardActions } from '@mui/material'

import Navbar from '../../components/Navbar'
import Pagetitle from '../../components/Pagetitle'
import Searchbar from '../../components/Searchbar'

const References = () => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [references, setReferences] = React.useState([])

  React.useEffect(() => {
    const fetchReferences = async () => {
      const response = await fetch('/api/references')
      const data = await response.json()
      setReferences(data)
    }

    fetchReferences()
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleQuantityChange = async (reference, change) => {
    const updatedReference = {
      ...reference,
      quantity: reference.quantity + change
    }

    try {
      const response = await fetch('/api/references', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: reference.reference, quantity: updatedReference.quantity })
      })

      if (response.ok) {
        setReferences(prevReferences =>
          prevReferences.map(ref =>
            ref.reference === reference.reference ? updatedReference : ref
          )
        )
      } else {
        console.error('Error updating reference quantity')
      }
    } catch (error) {
      console.error('Error updating reference quantity:', error)
    }
  }

  const filteredReferences = references.filter(ref =>
    ref.reference.includes(searchTerm.toUpperCase()) + ref.designation.includes(searchTerm.toUpperCase())
  )

  return (
    <div>
      <Navbar />
      <Pagetitle title='Références' subtitle='Procédez à vos opérations sur références' />

      <Searchbar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mt: 3 }}>
        {filteredReferences.length > 0 ? (
          filteredReferences.map(reference => (
            <Card key={reference.reference} sx={{ m: 2, width: 300 }}>
              <CardContent>
                <Typography variant="h6">Référence: {reference.reference}</Typography>
                <Typography>Prix: {reference.price} €</Typography>
                <Typography>Quantité: {reference.quantity}</Typography>
                <Typography>Désignation: {reference.designation}</Typography>
              </CardContent>
              <CardActions>
                <Button size="medium" variant='outlined' color='error' onClick={() => handleQuantityChange(reference, -1)} disabled={reference.quantity <= 0}>-</Button>
                <Button size="medium" variant='contained' color='success' onClick={() => handleQuantityChange(reference, 1)}>+</Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="h6">Aucune référence trouvée</Typography>
        )}
      </Box>
    </div>
  )
}

export default References
