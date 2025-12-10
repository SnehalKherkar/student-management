import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import {
  LogIn,
  Eye,
  EyeOff,
  User2,
  ShieldCheck,
  Mail,
  Lock,
} from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      toast.warning("⚠ Please select Admin or Student first");
      return;
    }

    const success = await login(email, password);

    if (!success) {
      toast.error("Wrong email or password");
      return;
    }

    const isAdminEmail = email.toLowerCase().includes("admin");

    if (role === "admin" && !isAdminEmail) {
      toast.error(" This account is not an Admin");
      return;
    }

    if (role === "student" && isAdminEmail) {
      toast.error("Admin cannot login as Student");
      return;
    }

    toast.success("Login Successful!");
    navigate("/");
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[#0F0F1A]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#4f46e5,_transparent_50%)] opacity-40 animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#ec4899,_transparent_50%)] opacity-40 animate-ping"></div>

      <div className="absolute inset-0 pointer-events-none animate-stars"></div>
      <div
        className="
          relative w-full max-w-md px-10 py-12 rounded-3xl 
          bg-white/10 backdrop-blur-2xl shadow-[0_0_60px_rgba(255,255,255,0.2)]
          border border-white/20
          transform transition-all duration-500 hover:scale-[1.02]
          animate-fadeIn
        "
      >
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-white/70 mb-8 text-sm">
          Choose role and login to continue
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <RoleCard
            label="Admin"
            icon={<ShieldCheck size={26} />}
            active={role === "admin"}
            onClick={() => setRole("admin")}
          />
          <RoleCard
            label="Student"
            icon={<User2 size={26} />}
            active={role === "student"}
            onClick={() => setRole("student")}
          />
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white/50" size={18} />
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/30 
                text-white placeholder-white/50 backdrop-blur
                focus:ring-2 focus:ring-pink-500 outline-none transition-all
              "
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-white/50" size={18} />
            <input
              type={showPass ? "text" : "password"}
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 border border-white/30 
                text-white placeholder-white/50 backdrop-blur
                focus:ring-2 focus:ring-pink-500 outline-none transition-all
              "
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 cursor-pointer text-white/70"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <button
            type="submit"
            className="
              w-full py-3 rounded-xl font-bold text-white text-lg
              bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
              shadow-lg hover:shadow-pink-500/40 hover:scale-[1.03]
              transition-all flex items-center justify-center gap-2
            "
          >
            <LogIn size={20} /> Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


const RoleCard = ({ label, icon, active, onClick }) => (
  <div
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center gap-3 p-4 rounded-2xl cursor-pointer
      backdrop-blur-xl border transition-all 
      transform hover:-translate-y-1 hover:shadow-xl hover:scale-[1.04]
      ${
        active
          ? "bg-gradient-to-br from-white/30 to-white/10 border-white/70 text-white shadow-2xl"
          : "bg-white/5 border-white/20 text-white/80"
      }
    `}
  >
    <div className="p-3 rounded-full bg-white/20">{icon}</div>
    <span className="font-semibold tracking-wide">{label}</span>
  </div>
);
