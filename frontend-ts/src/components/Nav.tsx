import { Link, useNavigate } from "react-router-dom";



export const Nav = (props: { name: string, setName: (name: string) => void }) => {
    const navigate = useNavigate()
    const handleLogout = async () => {

        try {
            await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            props.setName("");
            navigate('/login')
        } catch (error) {
            console.error("Error al hacer logout:", error);
        }
    };

    let menu;

    if (props.name === '') {
        menu = (<ul className="flex ">

            <li className="p-2 hover:bg-gray-200">
                <Link to="/">Home</Link>
            </li>

            <li className="p-2 hover:bg-gray-200">
                <Link to="/mesas">Mesas</Link>
            </li>
            <li className="p-2 hover:bg-gray-200">
                <Link to="/register">Register</Link>
            </li>
            <li className="p-2 hover:bg-gray-200">
                <Link to="/login">Login</Link>
            </li>
        </ul>
        )
    } else {
        menu = (
            <ul>
                <li className="p-2 hover:bg-gray-200">
                    <span onClick={handleLogout}>Logout</span>
                </li>
            </ul>
        )
    }


    return (
        <div>
            <nav className="bg-gray-500">
                <div className=" flex justify-around text-white p-4">


                    <div>
                        {menu}
                    </div>
                </div>
            </nav>
        </div>
    );
};
