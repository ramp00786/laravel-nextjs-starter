"use client"

import { useForm } from 'react-hook-form';
import axios from '../utils/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation'
import Link from 'next/link';


export default function Login() {
    const { register, handleSubmit } = useForm();
    const router = useRouter()
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/login', data);
            localStorage.setItem('auth_token', response.data.token);
            router.push('/papers', { scroll: false })
        } catch (error) {
            console.error(error);
            alert('Login failed!');
        }
    };

    return (
        <div className='container pt-4'>
            <h2>Login</h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                    <label>Email</label>
                    <input className='form-control' type="email" {...register('email', { required: true })} />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input className='form-control' type="password" {...register('password', { required: true })} />
                </div>
                <button className='my-4  btn btn-primary' type="submit">Login</button>

                <Link className='mx-4' href='/register'>Register</Link>
            </form>
        </div>
    );
}
