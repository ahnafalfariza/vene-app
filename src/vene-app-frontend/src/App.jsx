import { Routes, Route } from "react-router";
import { initSatellite } from "@junobuild/core";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import Home from "./pages/Home";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import EventDetail from "./pages/EventDetail";
import EventCategoryLocation from "./pages/EventCategoryLocation";
import CreateEvent from "./pages/CreateEvent";
import MyEvent from "./pages/MyEvent";
import { AuthContextProvider } from "./components/auth";

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
      <AuthContextProvider>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<p>About</p>} />
            <Route path="discover" element={<Home />} />
            <Route path="create" element={<CreateEvent />} />
            <Route path="event/:eventId" element={<EventDetail />} />
            <Route
              path="location/:locationId"
              element={<EventCategoryLocation />}
            />
            <Route path="my-event" element={<MyEvent />} />
            <Route path="profile/:profileId" element={<p>Profile</p>} />
          </Routes>
        </div>
        <Footer />
      </AuthContextProvider>
      <Toaster />
    </main>
  );
}

export default App;
