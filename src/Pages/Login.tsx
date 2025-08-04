import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/Auth';

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {isAuthenticated} = useAuth()
  // const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Attempting login with:', { email, password });
      const res = await fetch('http://localhost:3000/api/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok && data.email) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', data.role); 
        if (data.role === 'admin') {
          navigate('/dashboard'); 
        } else {
          navigate('/employedashboard'); 
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };



  useEffect(() => {
    if(isAuthenticated)  navigate("/dashboard")
  }, [isAuthenticated]);

  // Styles
  const cardStyle: React.CSSProperties = {
    maxWidth: 380,
    margin: 'auto auto',
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
    <div style={{ background: '#b5b8f7', minHeight: '100vh', alignContent: 'center', width: '100vw' }}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: 18, fontWeight: 700 }}>Login Form</h2>
        <div style={tabContainer}>
          <button style={tabStyle(true)} >Login</button>
          <button style={tabStyle(false)} onClick={() => navigate('/signup')}>Signup</button>
        </div>
        <form onSubmit={handleSubmit} autoComplete='off'>
            <input
              type="email"
              placeholder="Email Address"
              autoComplete='off'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              autoComplete='off'
              onChange={e => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
            <button type="submit" style={buttonStyle}>Login</button>
          </form>
        <div style={{ marginTop: 12, fontSize: 14 }}>
          Not a member?{' '}
          <span style={linkStyle} onClick={() => navigate('/signup')}>Signup now</span>
        </div>
      </div>
    </div>
  );
};

export default Login;