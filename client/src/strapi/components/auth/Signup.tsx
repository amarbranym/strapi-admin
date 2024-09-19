/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Button from '../../ui/Button';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [loader, setLoader] = useState(false)
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoader(true)
        try {
            const response = await fetch('http://localhost:1337/api/auth/local/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error.message || 'Signup request failed');
                setLoader(false)
            }
            setLoader(false)
            const responseData = await response.json();
            console.log(responseData.jwt)
            localStorage.setItem('jwt', responseData.jwt);
        } catch (error) {
            console.error('Signup error', error);
            setLoader(false)
        }

    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-xl mx-auto'>
            <div>
                <label className='label '>Username</label>
                <input required type="text" name="username" className='input-text' onChange={handleChange} />
            </div>
            <div>
                <label className='label'>Email</label>
                <input required type="email" name="email" className='input-text' onChange={handleChange} />
            </div>
            <div >
                <label className='label' >Password</label>
                <input required type="password" name="password" className='input-text' onChange={handleChange} />
            </div>
            <div>

                <Button type="submit" bg='solid' loading={loader} >Sign Up</Button>
            </div>
        </form>
    );
};

export default Signup;
