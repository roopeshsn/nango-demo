import React from 'react'
import Nango from '@nangohq/frontend';
import { useNavigate } from "react-router-dom";

function GithubSignIn() {
    const navigate = useNavigate()
    const handleClick = (e) => {
        console.log("Signing In...")
        const nango = new Nango({ publicKey: 'f120013a-267c-4912-ae5c-9b9a55e2583b' });
  
        nango.auth('demo-github-integration', 'test-connection-id').then((result) => {
            console.log(result)
            navigate("/dashboard");
        }).catch((err) => {
            console.error(err)
        });
    }
  
    return (
      <span className='ml-2'>
          <button onClick={handleClick} className="px-4 py-2 bg-black text-white rounded text-sm">GitHub Sign in</button>
      </span>
    )
}

export default GithubSignIn