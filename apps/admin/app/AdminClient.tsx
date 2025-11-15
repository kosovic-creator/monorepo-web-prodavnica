'use client';
import React from 'react'

const AdminClient = ({ korisnici }) => {
  return (
    <div>
        <h1>Admin Panel - Lista Korisnika</h1>
        {korisnici.map((k) => (
            <div key={k.id}>
                <h2>{k.ime} {k.prezime}</h2>
                <p>Email: {k.email}</p>
            </div>
        ))}
    </div>
  )
}

export default AdminClient
