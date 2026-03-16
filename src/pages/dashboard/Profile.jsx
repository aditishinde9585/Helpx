import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

import {
  FaUserCircle,
  FaEdit,
  FaSignOutAlt,
  FaStar,
  FaWallet
} from "react-icons/fa";

function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {

    if (!token) {
      navigate("/");
      return;
    }

    fetchProfile();

  }, [navigate, token]);


  const fetchProfile = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "https://server-le4u.onrender.com/api/users/profile",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setUser(res.data);

      setName(res.data.name || "");
      setSkills(res.data.skills?.join(", ") || "");
      setBio(res.data.bio || "");

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };


  const handleUpdate = async () => {

    setUpdating(true);

    try {

      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name,
          skills: skills.split(",").map(s => s.trim()),
          bio
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setUser(res.data);
      setEditing(false);

    } catch (err) {

      console.log(err);

    } finally {

      setUpdating(false);

    }

  };


  const handleWithdraw = async () => {

    const amount = prompt("Enter withdraw amount");

    if (!amount) return;

    try {

      await axios.post(
        "http://localhost:5000/api/withdraw",
        { amount: Number(amount) },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Withdraw request created");

      fetchProfile();

    } catch (error) {

      alert(error.response?.data?.message || "Withdraw failed");

    }

  };


  if (loading)

    return (
      <div className="flex justify-center items-center h-screen text-blue-600 font-bold">
        Loading...
      </div>
    );


  return (

    <div className="min-h-screen bg-slate-50 pb-20">

      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

          {/* HEADER */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

          <div className="relative px-6 pb-8">

            {/* AVATAR */}
            <div className="absolute -top-12 left-6">

              <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white">

                <FaUserCircle className="text-5xl text-slate-500"/>

              </div>

            </div>

            <div className="pt-16 flex flex-col md:flex-row md:items-center justify-between gap-4">

              <div>

                <h1 className="text-3xl font-bold text-gray-900">
                  {user?.name}
                </h1>

                <p className="text-blue-600 font-medium">
                  {user?.email}
                </p>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => setEditing(!editing)}
                  className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200"
                >
                  <FaEdit/>
                  {editing ? "Cancel" : "Edit"}
                </button>

                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                  }}
                  className="flex items-center gap-2 px-5 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100"
                >
                  <FaSignOutAlt/>
                  Logout
                </button>

              </div>

            </div>


            <hr className="my-8 border-gray-100" />


            {!editing ? (

              <div className="grid md:grid-cols-3 gap-8">

                {/* LEFT */}
                <div className="md:col-span-2 space-y-6">

                  <section>

                    <h3 className="text-sm uppercase tracking-wider text-gray-400 font-bold mb-2">
                      About Me
                    </h3>

                    <p className="text-gray-700 leading-relaxed">
                      {user?.bio || "No bio added yet."}
                    </p>

                  </section>


                  <section>

                    <h3 className="text-sm uppercase tracking-wider text-gray-400 font-bold mb-3">
                      Skills
                    </h3>

                    <div className="flex flex-wrap gap-2">

                      {user?.skills?.map((skill, i) => (

                        <span
                          key={i}
                          className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold"
                        >
                          {skill}
                        </span>

                      ))}

                    </div>

                  </section>

                </div>


                {/* RIGHT */}
                <div className="space-y-6">

                  {/* RATING */}
                  <div className="bg-blue-50 rounded-2xl p-6 text-center">

                    <FaStar className="text-blue-500 text-xl mx-auto mb-2"/>

                    <h3 className="text-blue-800 font-bold">
                      Rating
                    </h3>

                    <div className="text-3xl font-bold text-blue-600">
                      {user?.rating ? `${user.rating.toFixed(1)} ⭐` : "N/A"}
                    </div>

                  </div>


                  {/* WALLET */}
                  <div className="bg-green-50 rounded-2xl p-6 text-center">

                    <FaWallet className="text-green-600 text-xl mx-auto mb-2"/>

                    <h3 className="text-green-800 font-bold">
                      Wallet
                    </h3>

                    <div className="text-3xl font-bold text-green-600">
                      ₹{user?.wallet || 0}
                    </div>

                    <button
                      onClick={handleWithdraw}
                      className="mt-4 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
                    >
                      Withdraw
                    </button>

                  </div>

                </div>

              </div>

            ) : (

              <div className="space-y-5">

                <input
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  className="w-full p-4 bg-gray-50 rounded-xl"
                />

                <input
                  value={skills}
                  onChange={(e)=>setSkills(e.target.value)}
                  className="w-full p-4 bg-gray-50 rounded-xl"
                />

                <textarea
                  value={bio}
                  onChange={(e)=>setBio(e.target.value)}
                  className="w-full p-4 bg-gray-50 rounded-xl h-32"
                />

                <button
                  onClick={handleUpdate}
                  disabled={updating}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl"
                >
                  {updating ? "Saving..." : "Save Profile"}
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;