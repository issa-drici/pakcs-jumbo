"use client"

import React, { useState, useEffect } from 'react';
import { Chip, Button, Card, CardContent, Typography, Box, CircularProgress, TextField } from '@mui/material';
import Pagetitle from '@/components/Pagetitle';
import Navbar from '../../components/Navbar';

const Inventaire = () => {
  const [references, setReferences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    reference: '',
    price: '',
    quantity: '',
    designation: ''
  });
  const [deleteReference, setDeleteReference] = useState('');

  useEffect(() => {
    fetchReferences();
  }, []);

  const fetchReferences = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/references');
      const data = await response.json();
      setReferences(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des références :', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddReference = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true)
      const response = await fetch('/api/references', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setReferences([...references, data]);
      setFormData({ reference: '', price: '', quantity: '', designation: '' });
      setIsAdding(false);
      setIsLoading(false)
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la référence :', error);
    }
  };

  const handleDeleteReference = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/references`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: deleteReference })
      })

      if (response.ok) {
        setReferences(references.filter(ref => ref.reference !== deleteReference));
        setDeleteReference('');
        setIsDeleting(false);
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de la suppression de la référence :', errorData);
        alert("La référence entrée n'existe pas")
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la référence :', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <Navbar />
      <Pagetitle title="Inventaire" subtitle="Prenez connaissance de l'état de vos stocks" />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 2 }}>
        <Button variant="contained" color="success" sx={{ mr: 1 }} onClick={() => setIsAdding(true)}>
          Ajouter une référence
        </Button>
        <Button variant="outlined" color="error" sx={{ ml: 1 }} onClick={() => setIsDeleting(true)}>
          Supprimer une référence
        </Button>
      </Box>

      {isAdding && (
        <form onSubmit={handleAddReference} style={{ transform: 'translateX(0)', transition: 'transform 0.3s ease-in-out' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
            <TextField
              name="reference"
              label="Référence"
              type="text"
              value={formData.reference}
              onChange={handleChange}
              sx={{ mr: 1 }}
              required
            />
            <TextField
              name="price"
              label="Prix"
              type="number"
              value={formData.price}
              onChange={handleChange}
              sx={{ mr: 1 }}
              required
            />
            <TextField
              name="quantity"
              label="Quantité"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              sx={{ mr: 1 }}
              required
            />
            <TextField
              name="designation"
              label="Désignation"
              type="text"
              value={formData.designation}
              onChange={handleChange}
              sx={{ mr: 1 }}
              required
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Ajouter
            </Button>
            <Button variant="outlined" color="error" onClick={() => setIsAdding(false)} sx={{ ml: 1 }}>
              Annuler
            </Button>
          </Box>
        </form>
      )}

      {isDeleting && (
        <form onSubmit={handleDeleteReference} style={{ transform: 'translateX(0)', transition: 'transform 0.3s ease-in-out' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
            <TextField
              name="deleteReference"
              label="Référence à supprimer"
              type="text"
              value={deleteReference}
              onChange={(e) => setDeleteReference(e.target.value)}
              sx={{ mr: 1 }}
              required
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Supprimer
            </Button>
            <Button variant="outlined" color="error" onClick={() => setIsDeleting(false)} sx={{ ml: 1 }}>
              Annuler
            </Button>
          </Box>
        </form>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        {isLoading ? (
          <CircularProgress sx={{ mt: 3 }} />
        ) : (
          references.length > 0 ? (
            references.map((ref) => (
              <Card key={ref._id} variant="outlined" sx={{ m: 1, mt: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    {ref.reference}

                    {ref.quantity > 0 ? (
                      <Chip label="En stock" color="success" sx={{ ml: 1 }} />
                    ) : (
                      <Chip label="Indisponible" color="error" sx={{ ml: 1 }} />
                    )}
 
                  </Typography>
                  <Typography sx={{ mt: 1 }}>Quantité: {ref.quantity}</Typography>
                  <Typography>Prix: {ref.price} euros</Typography>
                  <Typography>Désignation: {ref.designation}</Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="h6">Aucune référence trouvée</Typography>
          )
        )}
      </Box>
    </div>
  );
};

export default Inventaire;
