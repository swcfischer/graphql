import React from 'react'
import UserInfo from './UserInfo';

export default ({ session }) => {
  return (
    <div>
      <UserInfo session={session} />
    </div>
  )
}
