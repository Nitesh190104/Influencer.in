import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Dashboard from './pages/Dashboard';
import InfluencerDetails from './pages/InfluencerDetails';
import ComedyInfluencers from './pages/ComedyInfluencers';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Team from './pages/Team';
import Contact from './pages/Contact';
import GamingInfluencers from './pages/GamingInfluencers';
import TravelInfluencers from './pages/TravelInfluencers';
import FinanceInfluencers from './pages/FinanceInfluencers';
import ParentingInfluencers from './pages/ParentingInfluencers';
import BeautyInfluencers from './pages/BeautyInfluencers';
import FashionInfluencers from './pages/FashionInfluencers';
import FitnessInfluencers from './pages/FitnessInfluencers';
import FoodInfluencers from './pages/FoodInfluencers';
import TechInfluencers from './pages/TechInfluencers';
import CreatorsPage from './pages/CreatorsPage';
import LiveCampaigns from './pages/LiveCampaigns';
import DashboardGate from './pages/DashboardGate';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/discover" element={
            <>
              <Navbar />
              <Discover />
              <Footer />
            </>
          } />
          <Route path="/dashboard" element={
            <>
              <Navbar />
              <Dashboard />
              <Footer />
            </>
          } />
          <Route path="/influencer/:id" element={
            <>
              <Navbar />
              <InfluencerDetails />
              <Footer />
            </>
          } />
          <Route path="/comedy-influencers" element={
            <>
              <Navbar />
              <ComedyInfluencers />
              <Footer />
            </>
          } />
          <Route path="/gaming-influencers" element={
            <>
              <Navbar />
              <GamingInfluencers />
              <Footer />
            </>
          } />
          <Route path="/travel-influencers" element={
            <>
              <Navbar />
              <TravelInfluencers />
              <Footer />
            </>
          } />
          <Route path="/finance-influencers" element={
            <>
              <Navbar />
              <FinanceInfluencers />
              <Footer />
            </>
          } />
          <Route path="/parenting-influencers" element={
            <>
              <Navbar />
              <ParentingInfluencers />
              <Footer />
            </>
          } />
          <Route path="/beauty-influencers" element={
            <>
              <Navbar />
              <BeautyInfluencers />
              <Footer />
            </>
          } />
          <Route path="/fashion-influencers" element={
            <>
              <Navbar />
              <FashionInfluencers />
              <Footer />
            </>
          } />
          <Route path="/fitness-influencers" element={
            <>
              <Navbar />
              <FitnessInfluencers />
              <Footer />
            </>
          } />
          <Route path="/food-influencers" element={
            <>
              <Navbar />
              <FoodInfluencers />
              <Footer />
            </>
          } />
          <Route path="/tech-influencers" element={
            <>
              <Navbar />
              <TechInfluencers />
              <Footer />
            </>
          } />
          <Route path="/creators" element={
            <>
              <Navbar />
              <CreatorsPage />
              <Footer />
            </>
          } />
          <Route path="/live-campaigns" element={
            <>
              <Navbar />
              <LiveCampaigns />
              <Footer />
            </>
          } />
          <Route path="/dashboard-gate" element={
            <>
              <Navbar />
              <DashboardGate />
              <Footer />
            </>
          } />
          <Route path="/team" element={
            <>
              <Navbar />
              <Team />
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          } />
          <Route path="/signup" element={
            <>
              <Signup />
            </>
          } />
          <Route path="/login" element={
            <>
              <Login />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
