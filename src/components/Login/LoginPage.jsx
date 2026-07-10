import Card from '../Common/Card';
import LoginForm from './LoginForm';

const LoginPage = () => {
  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <h1 className="login-logo">Achievement Companion</h1>
          <p className="login-subtitle">Track, organize, and achieve your daily goals</p>
        </div>
        <LoginForm />
      </Card>
    </div>
  );
};

export default LoginPage;
