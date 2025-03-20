import { auth } from '@/auth'
import React from 'react'

const SessionChecker = async () => {

    const session = await auth()

  return (
    <div>{session?.user?.email}</div>
  )
}

export default SessionChecker