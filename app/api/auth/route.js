import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// Fonction pour obtenir les informations d'utilisateur depuis les variables d'environnement
function getUserFromEnv() {
  return {
    username: process.env.USER_USERNAME,
    password: process.env.USER_PASSWORD,
    role: process.env.USER_ROLE
  }
}

export async function POST(request) {
  const { username, password } = await request.json()
  const user = getUserFromEnv()

  if (username !== user.username || password !== user.password) {
    return NextResponse.json(
      { error: 'Identifiants invalides' },
      { status: 401 }
    )
  }

  // Créer une session simple
  const session = {
    username: user.username,
    role: user.role
  }

  // Stocker la session dans un cookie
  cookies().set('session', JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 // 24 heures
  })

  return NextResponse.json({ success: true })
}

export async function DELETE() {
  cookies().delete('session')
  return NextResponse.json({ success: true })
} 