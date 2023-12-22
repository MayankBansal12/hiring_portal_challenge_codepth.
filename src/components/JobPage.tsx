import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userAtom } from '../atoms/user'
import { notify } from '../utils/notify';
import { useNavigate } from 'react-router-dom';

const JobPage = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      notify("Login to view job details");
      navigate("/auth");
    }
  }, [])

  return (
    <div>
      Job Page
    </div>
  )
}

export default JobPage
