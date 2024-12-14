import { Routes, Route } from "react-router";
import { initSatellite } from "@junobuild/core";
import { useEffect } from "react";

import Home from "./pages/Home";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import EventDetail from "./pages/EventDetail";
import EventCategoryLocation from "./pages/EventCategoryLocation";
import CreateEvent from "./pages/CreateEvent";

function App() {
  useEffect(() => {
    (async () =>
      await initSatellite({
        workers: {
          auth: true,
        },
      }))();
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<p>About</p>} />
          <Route path="discover" element={<Home />} />
          <Route path="create" element={<CreateEvent />} />
          <Route path="event/:eventid" element={<EventDetail />} />
          <Route
            path="location/:locationId"
            element={<EventCategoryLocation />}
          />
          <Route path="profile/:profileId" element={<p>Profile</p>} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default App;
