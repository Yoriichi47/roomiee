import { auth } from '@/auth'
import React from 'react'

const SessionChecker = async () => {

    const session = await auth()

  return (
    <div>{}</div>
  )
}

export default SessionChecker