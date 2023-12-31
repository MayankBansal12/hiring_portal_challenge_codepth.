import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom';
import { JobType } from '../types/types';
import { Card, CardContent, Typography, Button, Chip } from '@mui/material';

interface JobProps {
    job: JobType
}

const JobCard = ({ job }: JobProps) => {
    const diff = dayjs(Date.now()).diff(job?.posted, 'day');

    return (
        <Card sx={{ minWidth: 350 }} className="p-2 w-full sm:w-4/5">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <span className="flex justify-between gap-2">
                        <span className="flex gap-2">
                            <span>
                                {job?.type}
                            </span>
                            <span>
                                {job?.location}
                            </span>
                        </span>
                        <span>
                            Posted {diff >= 1 ? `${diff} days ago` : `Today`}
                        </span>
                    </span>
                </Typography>
                <Typography variant="h5" component="div" className="py-1">
                    {job.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }} color="text.secondary">
                    <span className="flex gap-2 items-center">
                        <span className="text-lg">
                            {job?.company}
                        </span>
                        <span>•</span>
                        <span>
                            {job?.experience}
                        </span>
                    </span>
                </Typography>
                <div className="flex items-center gap-2 flex-wrap">
                    {job?.skills && job?.skills.length > 0 ? job?.skills?.map((skill, i) => (
                        <Chip key={i} variant="outlined" color="info" label={skill} />
                    )) : <div className="text-gray-500">No skills mentioned!</div>}
                </div>
            </CardContent>
            <Link to={"/job/" + job?.id} className="flex justify-end">
                <Button size="small">View Details</Button>
            </Link>
        </Card >
    )
}

export default JobCard;