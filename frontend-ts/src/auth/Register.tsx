import { SyntheticEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        const content = await response.json();

        console.log(content);
        setRedirect(true);
    };

    useEffect(() => {
        if (redirect) {
            navigate('/login');
        }
    }, [redirect, navigate]);


    return (
        <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
            <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                <div className="text-center mb-12">
                    <img
                        src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-40 inline-block' />

                </div>

                <form onSubmit={onSubmit}>
                    <div className="space-y-6">
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Name</label>
                            <input name="name" type="text" onChange={(e) => setName(e.target.value)} className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter name" />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Email</label>
                            <input name="email" type="text" onChange={(e) => setEmail(e.target.value)} className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Password</label>
                            <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
                        </div>

                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="text-gray-800 ml-3 block text-sm">
                                I accept the <a href="/" className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</a>
                            </label>
                        </div>
                    </div>

                    <div className="!mt-12">
                        <button type="submit" className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                            Create an account
                        </button>
                    </div>
                    <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <a href="/" className="text-blue-600 font-semibold hover:underline ml-1">Login here</a></p>
                </form>
            </div>
        </div>
    )
}
