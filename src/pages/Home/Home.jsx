import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

function Home() {
  const { user, isLoaded } = useUser()

  // Insert New User
  const insertNewUser = async (user) => {
    const { data, error } = await supabase.from('Users').insert([
      {
        UserID: user.id,
        UserEmail: user.primaryEmailAddress.emailAddress,
        FullName: user.fullName,
      },
    ])

    if (error) {
      console.error('Insert Error:', error)
    } else {
      console.log('User inserted successfully')
    }
  }

  // Check for New Users
  const checkNewUsers = async (user) => {
    if (!user) return

    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('UserID', user.id)

    if (error) {
      console.error('Check Error:', error)
      return
    }

    if (data.length === 0) {
      await insertNewUser(user)
    } else {
      console.log('User already exists')
    }
  }

  useEffect(() => {
    if (isLoaded) {
      checkNewUsers(user)
    }
  }, [isLoaded])

  return <div>Home</div>
}

export default Home
