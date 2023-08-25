import React from 'react'
import GoogleSignIn from '../components/GoogleSignIn'
import GithubSignIn from '../components/GithubSignIn'

function Home() {
  return (
    <div>
        <h1 className='text-2xl'>Home Page</h1>
        <div className='mt-4'>
            <GoogleSignIn />
            <GithubSignIn />
        </div>
    </div>
  )
}

export default Home