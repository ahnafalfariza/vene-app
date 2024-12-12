import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<p>About</p>} />
          <Route path="discover" element={<p>Discover</p>} />
          <Route path="create" element={<p>Create</p>} />
          <Route path="event/:eventid" element={<p>Event</p>} />
          <Route path="profile/:profileId" element={<p>Profile</p>} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default App;
