'use client';
import { useState } from "react";
import './signup.scss';

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<{
        username?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        general?: string;
    }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <div className="sign-up-wrapper">
            <div className="sign-up-component">
                <h1> Sign up </h1>

                <div className="input-field-wrapper">
                    <label htmlFor="username"> Username </label>
                    <input className="input-field" type="text" id="username" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange}/>
                </div>

                <div className="input-field-wrapper">
                    <label htmlFor="email"> Email </label>
                    <input className="input-field" type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange}/>
                </div>

                <div className="input-field-wrapper">
                    <label htmlFor="password"> Password </label>
                    <input className="input-field" type="password" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange}/>
                </div>

                <div className="input-field-wrapper">
                    <label htmlFor="confirmPassword"> Confirm Password </label>
                    <input className="input-field" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange}/>
                </div>

                <button type="submit"> Sign Up </button>
            </div>
        </div>
    );
}