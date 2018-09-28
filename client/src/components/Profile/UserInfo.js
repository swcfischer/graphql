import React from 'react'

export default ({ session }) => {

  const { username, name, email, favorites} = session.getCurrentUser
  return (
    <div className="app">
      <h4>{name}</h4>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      {!favorites.length 
        ? <p><strong>You have yet to select any favorites</strong></p> 
        : (
        favorites.map(recipe => 
          <div>
            Hi
          </div>  
      ))}
    </div>
  )
}
