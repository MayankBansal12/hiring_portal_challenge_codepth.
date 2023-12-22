import React from 'react'
import { useRecoilState } from 'recoil'
import { userAtom } from '../atoms/user'

const JobPage = () => {
  const [user, setUser] = useRecoilState(userAtom);

  if (!user) {
    alert("Please login to view details");
  }

  return (
    <div>
      Job Page
    </div>
  )
}

export default JobPage
