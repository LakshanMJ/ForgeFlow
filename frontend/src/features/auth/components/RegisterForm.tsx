'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';

const RegisterForm = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    organizationName: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      const response = await axios.post(
        '/auth/register',
        form,
      );

      const { accessToken, refreshToken } =
        response.data;

      localStorage.setItem(
        'accessToken',
        accessToken,
      );

      localStorage.setItem(
        'refreshToken',
        refreshToken,
      );

      router.push('/dashboard');
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          'Registration failed',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 400,
        margin: '50px auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <h2>Create Account</h2>

      <input
        name="organizationName"
        placeholder="Organization Name"
        value={form.organizationName}
        onChange={handleChange}
        required
      />

      <input
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
        required
      />

      <input
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Account'}
      </button>
    </form>
  );
};

export default RegisterForm;