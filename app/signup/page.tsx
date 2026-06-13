'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import './signup.scss';

export default function SignUp() {
    const router = useRouter();
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
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        } else if (formData.username.length > 30) {
            newErrors.username = 'Username must be less than 30 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase, one lowercase, and one number';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            // Success! Redirect to login page
            router.push('/login?message=Account created successfully! Please sign in.');

        } catch (error: any) {
            setErrors({ general: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="sign-up-wrapper">
            <div className="sign-up-component">
                <h1> Sign up </h1>
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="input-field-wrapper">
                        <label htmlFor="username"> Username </label>
                        <input className="input-field" type="text" id="username" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} />
                        {errors.username && (
                            <p className="error-message">{errors.username}</p>
                        )}
                    </div>

                    <div className="input-field-wrapper">
                        <label htmlFor="email"> Email </label>
                        <input className="input-field" type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                        {errors.email && (
                            <p className="error-message">{errors.email}</p>
                        )}
                    </div>

                    <div className="input-field-wrapper">
                        <label htmlFor="password"> Password </label>
                        <input className="input-field" type="password" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                        {errors.password && (
                            <p className="error-message">{errors.password}</p>
                        )}
                    </div>

                    <div className="input-field-wrapper">
                        <label htmlFor="confirmPassword"> Confirm Password </label>
                        <input className="input-field" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
                        {errors.confirmPassword && (
                            <p className="error-message">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <button type="submit">Sign up</button>
                </form>
            </div>
        </div>
    );
}