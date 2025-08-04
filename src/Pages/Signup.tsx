import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignupProps {
  onSignup?: (token: string) => void;
  userRole?: string;
}

const Signup: React.FC<SignupProps> = ({ onSignup, userRole }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('User role detected:', userRole); 
    if (userRole === 'admin') {
      console.log('Redirecting admin to dashboard'); 
      navigate('/dashboard');
    }
  }, [userRole, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('Signup form submitted with:', { name, email, password, confirmPassword, role });

    if (password !== confirmPassword) {
      console.error('Passwords do not match'); 
      setError('Passwords do not match');
      return;
    }

    try {
      console.log('Sending signup request to backend'); 
      const res = await fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
        credentials: 'include'
      });

      const data = await res.json();
      console.log('Response from backend:',role, data); 

      if (res.ok && data.email) {
        console.log('Signup successful, redirecting based on role'); 
        if (role === 'admin') {
          navigate('/dashboard'); 
        } else {
          navigate('/employedashboard'); 
        }
        if (onSignup) onSignup(data.token);
      } else if (data.errors) {
        console.error('Validation errors:', data.errors); 
        setError(data.errors.map((err: any) => err.msg).join(', '));
      } else {
        console.error('Signup failed:', data.message); 
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Network error during signup:', error); 
      setError('Network error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  // Styles
  const cardStyle: React.CSSProperties = {
    maxWidth: 380,
    margin: "auto auto",
    padding: '32px 28px',
    borderRadius: 16,
    background: '#fff',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    textAlign: 'center',
  };
  const tabContainer: React.CSSProperties = {
    display: 'flex',
    marginBottom: 24,
    background: '#f2f2f2',
    borderRadius: 8,
    overflow: 'hidden',
  };
  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: '10px 0',
    background: active ? 'linear-gradient(90deg, #005bea 0%, #3ec6e0 100%)' : 'transparent',
    color: active ? '#fff' : '#222',
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.2s',
  });
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #e0e0e0',
    marginBottom: 16,
    fontSize: 15,
    outline: 'none',
    background: '#fafbfc',
  };
  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 0',
    borderRadius: 8,
    border: 'none',
    background: 'linear-gradient(90deg, #005bea 0%, #3ec6e0 100%)',
    color: '#fff',
    fontWeight: 700,
    fontSize: 16,
    cursor: 'pointer',
    marginTop: 8,
    marginBottom: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  };
  const linkStyle: React.CSSProperties = {
    color: '#005bea',
    textDecoration: 'none',
    fontWeight: 500,
    cursor: 'pointer',
    fontSize: 14,
  };

  return (
    <div style={{ background: '#b5b8f7', minHeight: '100vh', alignContent: "center", width: '100vw' }}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: 18, fontWeight: 700 }}>Signup Form</h2>
        <div style={tabContainer}>
          <button style={tabStyle(false)} onClick={() => navigate('/login')}>Login</button>
          <button style={tabStyle(true)} onClick={() => navigate('/signup')}>Signup</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
          {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          <button type="submit" style={buttonStyle}>Signup</button>
        </form>
        <div style={{ marginTop: 12, fontSize: 14 }}>
          Already have an account?
          <span style={linkStyle} onClick={() => navigate('/login')}>Login now</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;