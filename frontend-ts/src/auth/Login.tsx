import { SyntheticEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Por favor ingresa un correo válido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

export const Login = (props: { setName: (name: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas. Por favor verifica tus datos.");
      }

      const content = await response.json();
      props.setName(content.name);
      setRedirect(true);
    } catch (error: any) {
      setServerError(error.message || "Error al iniciar sesión. Intenta nuevamente.");
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
    document.title = "Login";
  }, [redirect, navigate]);

  return (
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto rounded-2xl p-8">
        <div className="max-w-md w-full">
         
          <div className="p-8 rounded-2xl bg-white shadow">
          <h2 className="uppercase mb-4 text-center font-bold text-3xl text-blue-500">
            La App del Restaurante
          </h2>

            <h2 className="text-gray-800 text-center text-2xl font-bold">Iniciar sesión</h2>

            <form className="mt-8 space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block" htmlFor="email">
                  Email
                </label>

                <div className="relative flex items-center">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`text-gray-800 bg-white border w-full text-sm px-4 py-3 rounded-md outline-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Ingresá el email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block" htmlFor="password">
                  Contraseña
                </label>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full text-gray-800 text-sm border px-4 py-3 rounded-md outline-blue-600 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Ingresá la contraseña"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Iniciar sesión
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                ¿No tenes cuenta?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Registraté
                </Link>
              </p>
            </form>

            {serverError && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {serverError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
