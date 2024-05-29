import React from 'react';
import Navbar from './components/Navbar';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer'; // New Footer component
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 flex-grow">
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/create" element={<EventForm />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
      <Footer /> {/* Add Footer here */}
    </div>
  );
}

export default App;