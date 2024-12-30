import { SyntheticEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

// Esquema de validación con Zod
const registerSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  email: z.string().email("Por favor ingresa un correo válido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    // Validar los datos ingresados
    const validationResult = registerSchema.safeParse({ name, email, password });
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Error al registrar. Por favor, intenta nuevamente.");
      }

      const content = await response.json();
      console.log(content);
      setRedirect(true);
    } catch (error: any) {
      setServerError(error.message || "Error al registrar. Intenta nuevamente.");
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate("/login");
    }
    document.title = "Register";
  }, [redirect, navigate]);

  return (
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto  rounded-2xl p-8">
        <div className="text-center mb-12">
          <h2 className="uppercase text-center font-bold text-3xl text-blue-500">
            La App del Restaurante
          </h2>
        </div>

        <form onSubmit={onSubmit}>
          <h2 className="text-gray-800 text-center text-2xl font-bold">Registrarse</h2>
          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block" htmlFor="nombre">
                Nombre
              </label>
              <input
                name="nombre"
                id="nombre"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`text-gray-800 bg-white border w-full text-sm px-4 py-3 rounded-md outline-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ingresá tú nombre"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`text-gray-800 bg-white border w-full text-sm px-4 py-3 rounded-md outline-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ingresá tu Email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block" htmlFor="contraseña">
                Contraseña
              </label>
              <input
                id="contraseña"
                name="contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`text-gray-800 bg-white border w-full text-sm px-4 py-3 rounded-md outline-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ingresá la contraseña"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
          </div>

          <div className="!mt-12">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Crear cuenta
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">
            ¿Ya estás registrado?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline ml-1">
              Iniciar sesión
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
  );
};
