import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { userAtom } from '../atoms/user'
import { notify } from '../utils/notify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { auth, useFirebase } from "../context/Firebase.jsx";
import { Button, Chip, Skeleton, Stack } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import CreateResponse from './CreateResponse';
import { onAuthStateChanged } from 'firebase/auth';
import Response from './Response';

const JobPage = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const firebase = useFirebase();
  const [apply, setApply] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  // Fetch Data using id
  const fetchData = async () => {
    const doc = await firebase.fetchDetail(id);
    if (doc.exists()) {
      setJob(doc.data());
    } else {
      notify("Some Error, try again!", "warning");
      navigate("/");
    }
  }

  // To format date for posted on
  const formatDate = (dateInput: Timestamp) => {
    const date = dateInput.toDate();
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const monthName = months[monthIndex];

    const formattedDate = `${day} ${monthName}, ${year.toString()}`;
    return formattedDate;
  }

  // In case user is logged in, redirect to auth
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email
        })
        fetchData();
      } else {
        setUser(null);
      }
    })
  }, [])

  useEffect(() => {
    if (!user) {
      notify("Login to view job details");
      navigate("/auth");
    }
  }, [user])

  return (
    <div className="flex flex-col h-screen px-2">
      <Link to="/" className="flex items-center gap-2 m-4 mb-8 sm:m-8"><span>&lt;-</span><span className="text-xs font-semibold underline"> Back to Home</span></Link>
      <div className="h-full w-full flex flex-col items-center">
        {job ? (
          <div className="flex flex-col gap-4 w-[90vw]">
            <div className="my-3">
              <h1 className="text-4xl font-bold mb-2"> {job.title} <span className="block sm:inline">
                <Chip variant="outlined" size="small" color="primary" label={job.location} className="m-2" />
                <Chip variant="outlined" size="small" color="primary" label={job.type} className="m-2" />
              </span>
              </h1>
              <div className="text-gray-500 text-lg mb-4">
                <span className="flex gap-2 items-center">
                  <span className="text-lg">
                    {job?.company}
                  </span>
                  <span>•</span>
                  <span>
                    {job?.experience}
                  </span>
                </span>
              </div>
              <Stack direction="row" spacing={1} className="flex flex-wrap gap-2">
                {job?.skills && job?.skills.length > 0 ? job?.skills?.map((skill, i) => (
                  <Chip key={i} color="primary" label={skill} />
                )) : <div className="text-gray-500">No skills mentioned!</div>}
              </Stack>
            </div>
            <div className="text-gray-500 text-sm">
              <span className="font-semibold">Posted On: </span>
              {formatDate(job.posted)}
            </div>
            <div className="flex flex-col gap-1">
              <div>
                {!job.desc || job.desc === '' ? <div className="h-40 flex items-center justify-center">No Description provided for the Job</div> :
                  <><h3 className="font-semibold my-1">Description: </h3>
                    {job.desc}</>
                }
              </div>
            </div>
            {job.recruiter === user.email && <div>
              {!showResponse ? <Button variant="outlined" type="button" onClick={() => setShowResponse(true)}>View Responses</Button> : <Button variant="contained" type="button" onClick={() => setShowResponse(false)}>Hide Responses</Button>}
            </div>}
            {job.recruiter !== user.email &&
              <div className="my-2">
                {apply ? <Button variant="outlined" type="button" size="small" className="text-center" onClick={() => setApply(false)}>Close</Button>
                  : <Button variant="contained" type="button" onClick={() => setApply(true)}>Apply</Button>}
              </div>}
            {apply && <div className="flex flex-col justify-center items-center">
              <h3>Fill up the form carefully!</h3>
              <CreateResponse docId={id} />
            </div>}
            {showResponse && <Response docId={id} />}
          </div>
        ) : (
          <div className="w-[90vw]">
            <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
            <Skeleton variant="rectangular" height={100} className="mb-2" />
            <Skeleton variant="rounded" height={400} />
          </div>
        )}
      </div>
    </div >
  )
}

export default JobPage
