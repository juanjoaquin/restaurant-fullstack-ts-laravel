import { SyntheticEvent, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";





export const Login = (props: { setName: (name: string) => void }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);


    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
    
        try {
          // Realizamos la solicitud y guardamos la respuesta en 'response'
          const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
    
          // Verificamos si la respuesta es correcta
          if (!response.ok) {
            throw new Error("Failed to login, please check your credentials.");
          }
    
          // Parseamos la respuesta a JSON
          const content = await response.json();
    
          // Si todo sale bien, pasamos el nombre al componente padre y redirigimos
          props.setName(content.name);
          setRedirect(true);
        } catch (error) {
          console.error("Login failed:", error);
        }
      };
    
      useEffect(() => {
        if (redirect) {
          navigate("/"); // Redirige al Home si el login fue exitoso
        }
      }, [redirect, navigate]);


    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <img
                        src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-40 mb-8 mx-auto block' />


                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Sign in</h2>

                        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email</label>

                                <div className="relative flex items-center">
                                    <input name="email" type="text" onChange={(e) => setEmail(e.target.value)} className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" />
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                <div className="relative flex items-center">
                                    <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                    </svg>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a href="jajvascript:void(0);" className="text-blue-600 hover:underline font-semibold">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div className="!mt-8">
                                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                    Sign in
                                </button>
                            </div>
                            <p className="text-gray-800 text-sm !mt-8 text-center">Don't have an account? <a href="/" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Register here</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
