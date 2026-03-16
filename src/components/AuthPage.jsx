import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHandshake, FaCoins, FaChartLine, FaHeart } from "react-icons/fa";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);

  const floatingIcons = [
    { icon: <FaCoins />, x: "10%", y: "20%", delay: 0 },
    { icon: <FaHandshake />, x: "85%", y: "15%", delay: 2 },
    { icon: <FaChartLine />, x: "15%", y: "80%", delay: 4 },
    { icon: <FaHeart />, x: "80%", y: "75%", delay: 1 },
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617]">

      {/* Animated Background */}
      <div className="absolute inset-0 z-0">

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-600/20 blur-[120px] rounded-full"
        />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-emerald-500/20 blur-[120px] rounded-full"
        />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 4,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute text-4xl text-white/20 hidden md:block"
          style={{ left: item.x, top: item.y }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-[1000px] md:h-[620px] bg-white/90 backdrop-blur-xl 
        rounded-[2rem] md:rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.4)] 
        flex flex-col md:flex-row overflow-hidden z-10 mx-4"
      >

        {/* Mobile Header */}
        <div className="md:hidden w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-center py-6">
          <h1 className="text-2xl font-bold">
            {isRegister ? "Create Account 🚀" : "Welcome Back 👋"}
          </h1>
          <p className="text-sm opacity-90">
            {isRegister
              ? "Start helping & earning"
              : "Login to continue"}
          </p>
        </div>

        {/* Form Section */}
        <div
          className={`w-full md:w-1/2 h-full transition-all duration-700 ease-in-out ${
            isRegister ? "md:translate-x-full" : "md:translate-x-0"
          }`}
        >
          <AnimatePresence mode="wait">
            {!isRegister ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                className="h-full"
              >
                <Login switchToRegister={() => setIsRegister(true)} />
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="h-full"
              >
                <Register switchToLogin={() => setIsRegister(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Overlay */}
        <motion.div
          animate={{ x: isRegister ? "-100%" : "0%" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="absolute right-0 w-1/2 h-full bg-gradient-to-br from-blue-600 to-emerald-500 
          z-20 hidden md:flex flex-col items-center justify-center text-white p-12 text-center"
        >
          <motion.div
            key={isRegister ? "reg-text" : "log-text"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >

            <h2 className="text-4xl font-extrabold mb-4">
              {isRegister ? "Start Your Journey 🚀" : "Welcome Back 👋"}
            </h2>

            <p className="text-blue-100 mb-10 text-lg leading-relaxed">
              {isRegister
                ? "Create your account and start helping people while earning rewards."
                : "Log in and continue helping your community."}
            </p>

            <button
              onClick={() => setIsRegister(!isRegister)}
              className="px-12 py-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-all font-bold shadow-xl active:scale-95"
            >
              {isRegister ? "Go to Login" : "Create Account"}
            </button>

          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AuthPage;