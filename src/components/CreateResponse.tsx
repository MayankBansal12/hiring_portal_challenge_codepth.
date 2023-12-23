import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useFirebase } from "../context/Firebase.jsx";
import { notify } from '../utils/notify';
import { useNavigate } from 'react-router-dom';

const CreateResponse = ({ docId, token }) => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        name: '',
        email: '',
        phone: '',
        desc: '',
        resume: ''
    })

    const handleChange = (e: React.FormEvent<HTMLElement>) => {
        const form = e.target as HTMLInputElement;
        setDetails(prev => ({ ...prev, [form.name]: form.value }));
    }

    const onSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        firebase.addResponse(docId, details).then(() => {
            notify("Applied Successfully!", "success");
            firebase.notification(token);
            navigate("/");
        }).catch(err => {
            console.log(err);
            notify("Error, try again!", "error")
        })
    }

    return (
        <form className="w-4/5 md:w-1/2 flex flex-col gap-5 my-8" onSubmit={onSubmit}>
            <TextField
                label="Enter your Full Name"
                name="name"
                variant="outlined"
                value={details.name}
                required={true}
                onChange={handleChange}
            />
            <TextField
                label="Your Email"
                type="email"
                name="email"
                variant="outlined"
                value={details.email}
                required={true}
                onChange={handleChange}
            />
            <TextField
                label="Contact No"
                name="phone"
                variant="outlined"
                value={details.phone}
                required={true}
                onChange={handleChange}
            />
            <TextField
                label="Resume Link"
                name="resume"
                type="link"
                variant="outlined"
                value={details.resume}
                required={true}
                onChange={handleChange}
            />
            <TextField
                label="Anything about you that we should know!"
                name="desc"
                type="link"
                variant="outlined"
                value={details.desc}
                onChange={handleChange}
            />
            <div className="flex justify-center">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Submit Response
                </Button>
            </div>
        </form>
    )
}

export default CreateResponse;