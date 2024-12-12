"use client"


import { useForm } from 'react-hook-form';
import axios from '../utils/axios';
import Link from 'next/link';
export default function Register() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post('/register', data);
            alert('User registered successfully!');
        } catch (error) {
            console.error(error);
            alert('Registration failed!');
        }
    };

    return (
        <div className='container pt-4'>
            <h2>Register</h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                    <label>Name</label>
                    <input className='form-control' {...register('name', { required: true })} />
                </div>
                <div>
                    <label>Email</label>
                    <input className='form-control' type="email" {...register('email', { required: true })} />
                </div>
                <div>
                    <label>Password</label>
                    <input className='form-control' type="password" {...register('password', { required: true })} />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input className='form-control' type="password" {...register('password_confirmation', { required: true })} />
                </div>
                <button className='btn btn-primary my-4' type="submit">Register</button>

                <Link className='mx-4' href='/login'>Login</Link>

            </form>
        </div>
    );
}
