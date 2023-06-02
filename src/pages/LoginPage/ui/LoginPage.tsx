import { Login } from 'widgets/LoginComponent';
import { clsx } from 'clsx';
import cls from './LoginPage.module.scss';

interface LoginPageProps {
  className?: string;
}

const LoginPage: React.FC = ({ className }: LoginPageProps) => {
  return (
    <div className={clsx(cls.LoginPage, className)}>
      <Login/>
    </div>
  );
};
export default LoginPage;
