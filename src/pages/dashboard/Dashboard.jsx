import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

import {
  FaUser,
  FaPlusCircle,
  FaSearch,
  FaTasks,
  FaCoins,
  FaCheckCircle
} from "react-icons/fa";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">

      <Navbar />

      {/* HERO */}

      <div className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-16 px-6 rounded-b-[3rem] shadow-2xl">

        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Welcome to HelpX
          </h1>

          <p className="text-blue-100 text-lg md:text-xl font-medium mb-8 opacity-90">
            Help people nearby and turn your skills into daily earnings.
          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <Link
              to="/browse-tasks"
              className="flex items-center gap-2 bg-white text-blue-700 px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-50 transition-all active:scale-95"
            >
              <FaCoins />
              Start Earning
            </Link>

            <Link
              to="/post-task"
              className="flex items-center gap-2 bg-blue-500/30 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-2xl font-bold hover:bg-white/20 transition-all"
            >
              <FaPlusCircle />
              Post Task
            </Link>

          </div>

        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="max-w-6xl mx-auto px-6 -mt-10 space-y-8">

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-white p-5 rounded-2xl shadow border border-slate-100">
            <FaTasks className="text-blue-500 text-xl mb-2"/>
            <p className="text-sm text-slate-500">Tasks Posted</p>
            <h3 className="text-xl font-bold text-slate-800">12</h3>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow border border-slate-100">
            <FaCheckCircle className="text-green-500 text-xl mb-2"/>
            <p className="text-sm text-slate-500">Tasks Completed</p>
            <h3 className="text-xl font-bold text-slate-800">8</h3>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow border border-slate-100">
            <FaCoins className="text-yellow-500 text-xl mb-2"/>
            <p className="text-sm text-slate-500">Total Earnings</p>
            <h3 className="text-xl font-bold text-slate-800">₹1200</h3>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow border border-slate-100">
            <FaUser className="text-purple-500 text-xl mb-2"/>
            <p className="text-sm text-slate-500">Your Rating</p>
            <h3 className="text-xl font-bold text-slate-800">4.8 ⭐</h3>
          </div>

        </div>


        {/* QUICK ACTIONS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Link
            to="/profile"
            className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all group"
          >

            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
              <FaUser />
            </div>

            <h3 className="text-xl font-bold text-slate-800">
              Your Profile
            </h3>

            <p className="text-slate-500 mt-2">
              Manage your skills and check your ratings.
            </p>

          </Link>


          <Link
            to="/post-task"
            className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all group"
          >

            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
              <FaPlusCircle />
            </div>

            <h3 className="text-xl font-bold text-slate-800">
              Post Task
            </h3>

            <p className="text-slate-500 mt-2">
              Need help? Post a task and find helpers fast.
            </p>

          </Link>


          <Link
            to="/browse-tasks"
            className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all group"
          >

            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
              <FaSearch />
            </div>

            <h3 className="text-xl font-bold text-slate-800">
              Find Work
            </h3>

            <p className="text-slate-500 mt-2">
              Browse tasks near you and start earning.
            </p>

          </Link>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;