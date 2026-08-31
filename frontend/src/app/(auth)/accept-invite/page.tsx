'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AcceptInvitePage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setMessage('Invalid invitation link.');
            return;
        }

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        if (password.length < 8) {
            setMessage('Password must be at least 8 characters.');
            return;
        }

        try {
            setLoading(true);
            setMessage('');

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/accept-invite`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token,
                        password,
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Failed to accept invitation',
                );
            }

            setMessage(
                'Invitation accepted successfully. You can now log in.',
            );
            setTimeout(() => { router.push('/login'); }, 1000);
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : 'Something went wrong.',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f5f5f5',
            }}
        >
            <div
                style={{
                    width: '400px',
                    padding: '32px',
                    background: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                }}
            >
                <h1>Accept Invitation</h1>

                <p>
                    Create your password to activate your ForgeFlow
                    account.
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginTop: '6px',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label>Confirm Password</label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginTop: '6px',
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '12px',
                            cursor: loading
                                ? 'not-allowed'
                                : 'pointer',
                        }}
                    >
                        {loading
                            ? 'Accepting...'
                            : 'Accept Invitation'}
                    </button>
                </form>

                {message && (
                    <p style={{ marginTop: '16px' }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
