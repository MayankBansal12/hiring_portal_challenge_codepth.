import React, { useState } from "react"
import { Button } from "@mui/material"
import Card from "./Card"
import { JobType } from "../types/types"
import { useFirebase } from "../context/Firebase";
import { notify } from "../utils/notify";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/user";

const Home = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const firebase = useFirebase();

    const [search, setSearch] = useState({
        title: "",
        location: "",
        experience: "",
        type: ""
    })

    const jobDetails: JobType = {
        id: "id",
        title: "Job Title",
        company: "Company",
        desc: "Job Description",
        type: "Full Time",
        experience: "Senior Level",
        location: "Remote",
        skills: ["Skill1", "Skill2", "Skill3"],
        posted: new Date('2023-10-10')
    }

    // Handle Logout 
    const handleLogout = () => {
        firebase.logout().then(() => {
            notify("User logged out!");
        }).catch((error) => {
            console.log(error);
            notify("Error, try again!");
        });
    }
    const handleChange = (e: React.FormEvent<HTMLElement>) => {
        const form = e.target as HTMLInputElement;
        setSearch((prev) => ({
            ...prev,
            [form.name]: form.value
        }));
    }

    const handleSubmit = () => {
        console.log(search);
    }

    return (
        <div className="p-2">
            <div className="h-20 flex items-center w-full justify-between gap-4 mt-2 sm:mt-0 md:px-5 flex-wrap">
                <div className="text-2xl sm:text-3xl font-bold md:pl-10">JobPth.</div>
                <div className="flex gap-2">
                    <Button type="button" variant="contained" onClick={() => console.log("New job post")}>Create Job</Button>
                    {user && user.email !== '' && <Button
                        type="button"
                        variant="outlined"
                        color="primary"
                        onClick={handleLogout}
                    >
                        Log Out
                    </Button>}
                </div>
            </div>
            <div className="mt-10 flex flex-col gap-5 items-center justify-center">
                <h1 className="text-2xl font-bold text-center sm:text-start">Start by searching for your next job!</h1>
            </div>
            <div className="flex gap-4 my-10 justify-center px-10 flex-wrap">
                <select onChange={handleChange} name="title" title="title" value={search.title} className="w-64 py-3 pl-4 bg-[#121212] font-semibold rounded-md">
                    <option value="" disabled hidden>Job Role</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="Mobile Developer">Mobile Developer</option>
                </select>
                <select onChange={handleChange} name="type" title="type" value={search.type} className="w-64 py-3 pl-4 bg-[#121212] font-semibold rounded-md">
                    <option value="" disabled hidden>Job Type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Intern">Intern</option>
                    <option value="Contract">Contract</option>
                </select>
                <select onChange={handleChange} name="location" title="location" value={search.location} className="w-64 py-3 pl-4 bg-[#121212] font-semibold rounded-md">
                    <option value="" disabled hidden>Location</option>
                    <option value="Remote">Remote</option>
                    <option value="In-Office">In-Office</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
                <select onChange={handleChange} name="experience" title="experience" value={search.experience} className="w-64 py-3 pl-4 bg-[#121212] font-semibold rounded-md">
                    <option value="" disabled hidden>Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Junior Level">Junior Level</option>
                    <option value="Senior Level">Senior Level</option>
                </select>
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    className="px-4 py-2"
                    onClick={handleSubmit}
                >
                    Search
                </Button>
            </div>
            <div className="flex flex-wrap gap-4 mx-2 md:mx-4 justify-start overflow-x-scroll sm:justify-center sm:overflow-hidden">
                <Card job={jobDetails} />
                <Card job={jobDetails} />
                <Card job={jobDetails} />
                <Card job={jobDetails} />
                <Card job={jobDetails} />
                <Card job={jobDetails} />
                <Card job={jobDetails} />
                <Card job={jobDetails} />
                <Card job={jobDetails} />
            </div>
        </div>
    )
}

export default Home
