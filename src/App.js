import React from 'react';
import Header from './components/Header';
import InvitationDetails from './components/InvitationDetails';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import './App.css'; // Assuming you want to include some styles specific to App

function App() {
    return (
        <div className="App">
            <Header />
            <InvitationDetails />
            <Gallery />
            <Footer />
        </div>
    );
}

export default App;