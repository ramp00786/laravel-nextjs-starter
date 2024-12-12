"use client"

import { useForm } from 'react-hook-form';
import axios from '../../utils/axios';
import useAuth from '../../hooks/useAuth';
import Link from 'next/link';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoutButton from '@/app/component/LogoutButton';

export default function SubmitPaper() {
    const user = useAuth(); // Authentication check (will redirect if not authenticated)
    const { register, handleSubmit, setValue } = useForm();
    const [error, setError] = useState(null); // State for error message
    const [success, setSuccess] = useState(null); // State for error message
    const [sending, setSending] = useState(false); // State for error message
    const onSubmit = async (data) => {
        setSending(true);
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('gender', data.gender);
        formData.append('description', data.description);

        // Check if the images are present and append them
        if (data.images && data.images.length) {
            Array.from(data.images).forEach((image) => {
                formData.append('images[]', image);
            });
        }

        // Ensure the PDF file is present before appending
        if (data.pdf && data.pdf.length) {
            formData.append('pdf', data.pdf[0]); // Assuming a single PDF file is being uploaded
        }

        const token = localStorage.getItem('auth_token'); // Get the token from local storage

        try {
            await axios.post('/papers', formData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the Bearer token
                    'Content-Type': 'multipart/form-data',
                },
            });
            // alert('Paper submitted successfully.');
            setSending(false);
            setSuccess('Paper submitted successfully.');
        } catch (error) {
            console.error(error);
            setSending(false);
            setError("Error fetching papers. Please try again later.");
        }
    };

    return (
        <div className='container pt-4'>
            <h1>Submit Paper</h1>
            <Link href="/papers">All Papers</Link>

            <LogoutButton></LogoutButton>
            <hr />
            {error && (
                <div className="alert alert-danger" role="alert">
                {error}
                </div>
            )}

            {success && (
                <div className="alert alert-success" role="alert">
                {success}
                </div>
            )}

            {sending?(
                <h3 className='text-center'>Sending data ...</h3>
            ) : '' }


            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                    <label>Title</label>
                    <input className='form-control' {...register('title', { required: true })} />
                </div>
                <div className='form-group'>
                    <label>Gender</label>
                    <select className='form-control' {...register('gender', { required: true })}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Description</label>
                    <textarea className='form-control' {...register('description', { required: true })}></textarea>
                </div>
                <div className='form-group'>
                    <label>Images</label>
                    <input className='form-control' type="file" multiple {...register('images')} />
                </div>
                <div className='form-group'>
                    <label>PDF</label>
                    <input className='form-control' type="file" {...register('pdf', { required: true })} />
                </div>
                <button className='mt-4 btn btn-primary' type="submit" disabled={sending} >Submit</button>
            </form>
        </div>
    );
}
