"use client"
import Navbar from '../components/Navbar'
import Pagetitle from '../components/Pagetitle'

import { Chip } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face'

export default function Home() {
  return (
    <>
      <Navbar />
      <Pagetitle title='Accueil' subtitle='Bienvenue dans votre gestionnaire de stocks' />
    </>
  );
}
