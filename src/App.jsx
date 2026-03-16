import { Routes, Route } from "react-router-dom";

import AuthPage from "./components/AuthPage";

import Dashboard from "./pages/dashboard/Dashboard";
import PostTask from "./pages/dashboard/PostTask";
import BrowseTasks from "./pages/dashboard/BrowseTasks";
import MyTasks from "./pages/dashboard/MyTasks";
import AcceptedTasks from "./pages/dashboard/AcceptedTasks";
import NearbyHelpers from "./pages/dashboard/NearbyHelpers";
import Profile from "./pages/dashboard/Profile";
import Chat from "./pages/dashboard/Chat";
import Wallet from "./pages/dashboard/Wallet"; // ⭐ WALLET PAGE

import GoogleSuccess from "./pages/GoogleSuccess";

import ProtectedRoute from "./utils/ProtectedRoute";

function App() {

  return (

    <Routes>

      {/* AUTH PAGE */}
      <Route path="/" element={<AuthPage />} />

      {/* GOOGLE LOGIN SUCCESS */}
      <Route path="/google-success" element={<GoogleSuccess />} />

      {/* PROTECTED ROUTES */}

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      <Route path="/wallet" element={    // ⭐ WALLET ROUTE
        <ProtectedRoute>
          <Wallet />
        </ProtectedRoute>
      } />

      <Route path="/post-task" element={
        <ProtectedRoute>
          <PostTask />
        </ProtectedRoute>
      } />

      <Route path="/browse-tasks" element={
        <ProtectedRoute>
          <BrowseTasks />
        </ProtectedRoute>
      } />

      <Route path="/my-tasks" element={
        <ProtectedRoute>
          <MyTasks />
        </ProtectedRoute>
      } />

      <Route path="/accepted-tasks" element={
        <ProtectedRoute>
          <AcceptedTasks />
        </ProtectedRoute>
      } />

      <Route path="/nearby-helpers" element={
        <ProtectedRoute>
          <NearbyHelpers />
        </ProtectedRoute>
      } />

      {/* CHAT */}
      <Route path="/chat/:taskId" element={
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      } />

    </Routes>

  );

}

export default App;