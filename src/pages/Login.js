import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const PageWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 32px;
  flex-wrap: wrap;
  background: linear-gradient(160deg, var(--cream) 0%, #e8dfc8 100%);
`;

const FormBox = styled.div`
  background: var(--brown-dark);
  padding: 40px 36px;
  border-radius: 20px;
  width: 340px;
  box-shadow: 0 16px 60px rgba(0,0,0,0.3);
`;

const FormTitle = styled.h2`
  color: white;
  text-align: center;
  font-size: 34px;
  margin-bottom: 8px;
  letter-spacing: 3px;
`;

const FormSubtitle = styled.p`
  color: rgba(255,255,255,0.45);
  text-align: center;
  font-size: 12px;
  letter-spacing: 1px;
  margin-bottom: 28px;
`;

const Label = styled.label`
  display: block;
  color: rgba(255,255,255,0.6);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const FormInput = styled.input`
  display: block;
  width: 100%;
  padding: 11px 14px;
  margin-bottom: 16px;
  border: 1.5px solid transparent;
  border-radius: 10px;
  font-size: 14px;
  background: rgba(255,255,255,0.1);
  color: white;
  outline: none;
  transition: all 0.2s;

  &::placeholder { color: rgba(255,255,255,0.3); }

  &:focus {
    border-color: var(--gold);
    background: rgba(255,255,255,0.12);
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  background: linear-gradient(135deg, var(--gold), #d4a96a);
  color: var(--brown-dark);
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
  margin-top: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(201,169,122,0.4);
  }
`;

const ErrorMsg = styled.p`
  color: #fc8181;
  font-size: 13px;
  margin-bottom: 14px;
  text-align: center;
  background: rgba(252,129,129,0.1);
  padding: 8px 12px;
  border-radius: 8px;
`;

const SuccessMsg = styled.p`
  color: #68d391;
  font-size: 13px;
  margin-bottom: 14px;
  text-align: center;
  background: rgba(104,211,145,0.1);
  padding: 8px 12px;
  border-radius: 8px;
`;

const InfoNote = styled.p`
  text-align: center;
  color: rgba(255,255,255,0.3);
  font-size: 11px;
  margin-top: 16px;
  letter-spacing: 0.5px;
`;

function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [signupData, setSignupData] = useState({ username: '', email: '', password: '', confirm: '' });
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!loginData.username.trim()) return setLoginError('Username is required.');
    if (!loginData.password) return setLoginError('Password is required.');

    const result = login(loginData.username, loginData.password);
    if (result.success) {
      navigate('/');
    } else {
      setLoginError(result.message);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setSignupError('');
    setSignupSuccess('');

    if (!signupData.username.trim()) return setSignupError('Username is required.');
    if (!/\S+@\S+\.\S+/.test(signupData.email)) return setSignupError('Enter a valid email.');
    if (signupData.password.length < 6) return setSignupError('Password must be at least 6 characters.');
    if (signupData.password !== signupData.confirm) return setSignupError('Passwords do not match.');

    const result = register(signupData.username, signupData.email, signupData.password);
    if (result.success) {
      setSignupSuccess('Account created! You can now log in.');
      setSignupData({ username: '', email: '', password: '', confirm: '' });
    } else {
      setSignupError(result.message);
    }
  };

  return (
    <PageWrapper>

      {/* ── Login ── */}
      <FormBox>
        <FormTitle>Login</FormTitle>
        <FormSubtitle>SIGN IN TO YOUR ACCOUNT</FormSubtitle>

        {loginError && <ErrorMsg>{loginError}</ErrorMsg>}

        <form onSubmit={handleLoginSubmit} noValidate>
          <Label>Username</Label>
          <FormInput
            type="text"
            name="username"
            placeholder="your username"
            value={loginData.username}
            onChange={e => setLoginData({ ...loginData, username: e.target.value })}
          />
          <Label>Password</Label>
          <FormInput
            type="password"
            name="password"
            placeholder="••••••••"
            value={loginData.password}
            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
          />
          <SubmitBtn type="submit">Sign In →</SubmitBtn>
        </form>

        <InfoNote>Your data is saved locally on this device.</InfoNote>
      </FormBox>

      {/* ── Sign Up ── */}
      <FormBox>
        <FormTitle>Sign Up</FormTitle>
        <FormSubtitle>CREATE A FREE ACCOUNT</FormSubtitle>

        {signupError && <ErrorMsg>{signupError}</ErrorMsg>}
        {signupSuccess && <SuccessMsg>✓ {signupSuccess}</SuccessMsg>}

        <form onSubmit={handleSignupSubmit} noValidate>
          <Label>Username</Label>
          <FormInput
            type="text"
            placeholder="choose a username"
            value={signupData.username}
            onChange={e => setSignupData({ ...signupData, username: e.target.value })}
          />
          <Label>Email</Label>
          <FormInput
            type="email"
            placeholder="you@email.com"
            value={signupData.email}
            onChange={e => setSignupData({ ...signupData, email: e.target.value })}
          />
          <Label>Password</Label>
          <FormInput
            type="password"
            placeholder="min. 6 characters"
            value={signupData.password}
            onChange={e => setSignupData({ ...signupData, password: e.target.value })}
          />
          <Label>Confirm Password</Label>
          <FormInput
            type="password"
            placeholder="repeat password"
            value={signupData.confirm}
            onChange={e => setSignupData({ ...signupData, confirm: e.target.value })}
          />
          <SubmitBtn type="submit" style={{ background: 'rgba(255,255,255,0.12)', color: 'var(--gold)' }}>
            Create Account
          </SubmitBtn>
        </form>

        <InfoNote>Accounts are stored locally on this device.</InfoNote>
      </FormBox>

    </PageWrapper>
  );
}

export default Login;
