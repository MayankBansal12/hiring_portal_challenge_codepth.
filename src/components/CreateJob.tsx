import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { userAtom } from '../atoms/user';
import { Link, useNavigate } from 'react-router-dom';
import { notify } from '../utils/notify';
import { TextField, Button, FormControl, Select, InputLabel, MenuItem, SelectChangeEvent, OutlinedInput, Box, Chip } from "@mui/material";
import { JobType } from '../types/types';
import { useFirebase } from "../context/Firebase";

// Skill Names for Selecting skills
const skillNames = [
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Node",
    "Express",
    "MongoDB",
    "SQL",
    "Angular",
    "Java",
    "Kotlin",
    "SwiftUI",
    "C++",
    "React Native",
    "Docker",
    "Kubernetes",
    "Linux",
];

const CreateJob = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const navigate = useNavigate();
    const firebase = useFirebase();
    const [skills, setSkills] = useState<string[]>([]);
    const [job, setJob] = useState<JobType>({
        title: "",
        company: "",
        desc: "",
        type: "",
        experience: "",
        location: "",
        skills: [],
        posted: new Date()
    });

    // Check if user is logged in
    useEffect(() => {
        if (!user) {
            notify("Login to create a new job");
            navigate("/auth");
        }
    }, [])

    // Posting a new job
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        job.skills = skills;
        firebase.writeData(job).then(() => {
            notify("New Post Created!", "success");
            navigate("/");
        }).catch((error) => {
            console.log(error);
            notify("Error, try again!", "error");
        });
    }

    // For change in normal textfield
    const inputChange = (e: React.FormEvent<HTMLElement>) => {
        const form = e.target as HTMLInputElement
        setJob(prev => ({ ...prev, [form.name]: form.value }))
    }

    // For change in select field
    const handleChange = (event: SelectChangeEvent) => {
        const form = event.target;
        setJob(prev => ({ ...prev, [form.name]: form.value }))
    };

    // For handling change in input for skills
    const skillChange = (event: SelectChangeEvent<typeof skills>) => {
        const {
            target: { value },
        } = event;
        setSkills(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div className="flex flex-col h-screen px-2">
            <Link to="/" className="flex items-center gap-2 m-4 mb-8 sm:m-8"><span>&lt;-</span><span className="text-xs font-semibold underline"> Back to Home</span></Link>
            <div className="h-full w-full flex flex-col items-center justify-center">
                <h2>Create a New Job Post</h2>
                <form className="w-4/5 md:w-1/2 flex flex-col gap-5 my-8" onSubmit={onSubmit}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={job.type}
                            name="type"
                            label="Type"
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value={"Intern"}>Intern</MenuItem>
                            <MenuItem value={"Contract"}>Contract</MenuItem>
                            <MenuItem value={"Full Time"}>Full Time</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Company Name"
                        name="company"
                        variant="outlined"
                        value={job.company}
                        required={true}
                        onChange={inputChange}
                    />
                    <TextField
                        label="Job Description"
                        name="desc"
                        variant="outlined"
                        value={job.desc}
                        onChange={inputChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Job Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={job.title}
                            name="title"
                            label="Job Role"
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value={"Frontend Developer"}>Frontend Developer</MenuItem>
                            <MenuItem value={"Backend Developer"}>Backend Developer</MenuItem>
                            <MenuItem value={"Full Stack Developer"}>Full Stack Developer</MenuItem>
                            <MenuItem value={"DevOps Engineer"}>DevOps Engineer</MenuItem>
                            <MenuItem value={"Mobile Developer"}>Mobile Developer</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Location</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={job.location}
                            name="location"
                            label="Location"
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value={"Remote"}>Remote</MenuItem>
                            <MenuItem value={"In-Office"}>In Office</MenuItem>
                            <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Experience</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={job.experience}
                            name="experience"
                            label="Experience"
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value={"Fresher"}>Fresher</MenuItem>
                            <MenuItem value={"Junior Level"}>Junior Level</MenuItem>
                            <MenuItem value={"Senior Level"}>Senior Level</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-chip-label">Skills</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={skills}
                            onChange={skillChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {skillNames.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Post Job
                        </Button>
                    </div>
                </form>
                <p>Job can't be edited later once created!</p>
            </div>
        </div>
    )
}

export default CreateJob
