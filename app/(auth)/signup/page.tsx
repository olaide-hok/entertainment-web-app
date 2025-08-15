import {Metadata} from 'next';
import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import SignUpForm from './signup-form';

export const metadata: Metadata = {
    title: 'Sign Up',
};

const SignUpPage = async () => {
    const session = await auth();

    if (session) {
        return redirect('/');
    }

    return (
        <div className="container flex justify-center">
            <SignUpForm />
        </div>
    );
};

export default SignUpPage;
