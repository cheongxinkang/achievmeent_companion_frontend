import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import TextField from '../Common/TextField';
import SubmitButton from '../Common/SubmitButton';

const LoginForm = () => {
  const { loginUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim()) {
      setError('Username cannot be empty.');
      return;
    }
    if (!password.trim()) {
      setError('Password cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      await loginUser(username, password);
    } catch (err) {
      setError(err.message || 'Incorrect credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <TextField
        id="login-username"
        label="Username"
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <TextField
        id="login-password"
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <div className="text-field-error" style={{ textAlign: 'center' }}>{error}</div>}

      <SubmitButton loading={loading}>
        Sign In
      </SubmitButton>
    </form>
  );
};

export default LoginForm;
