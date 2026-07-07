'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import './login.scss';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState<{
        username?: string;
        password?: string;
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
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
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
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrors({ general: errorData.message || 'Login failed' });
            } else {
                router.push('/');
            }
        } catch (error) {
            setErrors({ general: 'An unexpected error occurred' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="login-wrapper">
            <div className="login-component">
                <h1> Login </h1>
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="input-field-wrapper">
                        <label htmlFor="username"> Username </label>
                        <input className="input-field" type="text" id="username" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} />
                        {errors.username && (
                            <p className="error-message">{errors.username}</p>
                        )}
                    </div>

                    <div className="input-field-wrapper">
                        <label htmlFor="password"> Password </label>
                        <input className="input-field" type="password" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                        {errors.password && (
                            <p className="error-message">{errors.password}</p>
                        )}
                    </div>

                    <button className="button" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
