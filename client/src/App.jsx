import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Poll from "./pages/Poll";
import AdminDashboard from "./pages/AdminDashboard";
import CreatePoll from "./pages/CreatePoll";
import EditPoll from "./pages/EditPoll";
import MyPolls from "./pages/MyPolls";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/poll/:id" element={<Poll />} />
          <Route path="/my-polls" element={<MyPolls />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/create-poll" element={<CreatePoll />} />
            <Route path="/admin/poll/:id/edit" element={<EditPoll />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
