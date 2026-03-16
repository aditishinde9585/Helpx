import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

import {
  FaCheckCircle,
  FaComments,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaUser
} from "react-icons/fa";

function AcceptedTasks() {

  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        "https://server-le4u.onrender.com/tasks/accepted",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks(res.data);

    } catch (err) {

      console.error(err);

    }

  };

  const completeTask = async (id) => {

    try {

      await axios.put(
        `https://server-le4u.onrender.com/api/tasks/${id}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchTasks();

    } catch (err) {

      alert("Could not complete task");

    }

  };

  useEffect(() => {

    fetchTasks();

  }, []);

  return (

    <div className="min-h-screen bg-slate-50 pb-20">

      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">

        <h1 className="text-3xl font-black text-slate-900 mb-8">
          Tasks You're Working On
        </h1>

        {tasks.length === 0 ? (

          <div className="bg-white rounded-3xl p-16 text-center border shadow-sm">

            <div className="text-5xl mb-4">👷‍♂️</div>

            <p className="text-slate-500 font-bold text-lg">
              No active tasks. Browse some to start earning!
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {tasks.map((task) => (

              <div
                key={task._id}
                className="bg-white p-6 rounded-3xl shadow border border-slate-100 flex flex-col md:flex-row gap-6 items-start hover:shadow-lg transition"
              >

                <div className="flex-1">

                  {/* STATUS */}

                  <div className="flex items-center gap-2 mb-2">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        task.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {task.status}
                    </span>

                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <FaUser />
                      {task.postedBy?.name}
                    </span>

                  </div>


                  {/* TITLE */}

                  <h2 className="text-xl font-bold text-slate-800 mb-2">
                    {task.title}
                  </h2>


                  {/* DESCRIPTION */}

                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                    {task.description}
                  </p>


                  {/* TAGS */}

                  <div className="flex flex-wrap gap-4 text-sm">

                    <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-lg font-semibold">
                      <FaRupeeSign />
                      {task.payment}
                    </span>

                    <span className="flex items-center gap-1 text-slate-600 bg-slate-50 px-3 py-1 rounded-lg">
                      <FaMapMarkerAlt />
                      {task.location?.address || "Global"}
                    </span>

                  </div>

                </div>


                {/* ACTIONS */}

                <div className="w-full md:w-auto flex flex-col gap-3">

                  {task.status === "accepted" && (

                    <>
                      <button
                        onClick={() => completeTask(task._id)}
                        className="flex items-center justify-center gap-2 w-full md:w-40 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
                      >
                        <FaCheckCircle />
                        Finish Task
                      </button>

                      <button
                        onClick={() => navigate(`/chat/${task._id}`)}
                        className="flex items-center justify-center gap-2 w-full md:w-40 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold"
                      >
                        <FaComments />
                        Chat Owner
                      </button>
                    </>

                  )}

                  {task.status === "completed" && (

                    <div className="text-center py-4 px-6 bg-blue-50 text-blue-700 rounded-xl font-semibold">
                      Waiting for Review
                    </div>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default AcceptedTasks;