import {Metadata} from 'next';
import {redirect} from 'next/navigation';
import {auth} from '@/auth';
import CredentialsLogInForm from './credentials-login-form';

export const metadata: Metadata = {
    title: 'Log In',
};

const LogInPage = async () => {
    const session = await auth();

    if (session) {
        return redirect('/');
    }

    return (
        <div className="container flex justify-center">
            <CredentialsLogInForm />
        </div>
    );
};

export default LogInPage;
