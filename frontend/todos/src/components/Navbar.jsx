import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast';

const Navbar = ({ setSearchQuery }) => {
  const [userName, setUserName] = useState(' ');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()
  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decode = jwtDecode(token);
        setUserName(decode.name || "User");
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Invalid token");
        setIsLoggedIn(false);
        setUserName('');
      }
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  };

  useEffect(() => {
    checkToken()
  })
  const handleLogOut = () => {
    localStorage.removeItem("token");
    checkToken();
    navigate("/login");
    toast.success("logout!", {
      icon: "🚪"
    })
  };
  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-black">Todos</h1>

      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search notes..."
            className="p-1 px-3 rounded-md text-black"
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
          <div className="flex items-center gap-3">
            {/* Avatar with subtle ring and shadow */}
            <div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 text-white flex items-center justify-center text-lg font-bold shadow-lg ring-2 ring-white"
              title={userName}
            >
              {userName.charAt(0).toUpperCase()}
            </div>

            {/* Logout Button with soft style */}
            <button
              onClick={handleLogOut}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-1.5 rounded-full shadow-md transition-all duration-200 ease-in-out"
            >
              Logout
            </button>
          </div>

        </div>
      ) : (
        <div className="text-gray-500">Please log in</div>
      )}
    </nav>
  );
};

export default Navbar;
