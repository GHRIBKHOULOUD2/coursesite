import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import Dash1 from './Components/Dash/Dash';
import Circles from './Components/Circles/Circles';
import Courses from './Components/COurses/courses';

import Notes from "./Components/Notes/Notes"
function App() {
  return (
    <Router>
      <div className="app" style={{overflowX:"hidden"}}>
      
        <Navbar />

      
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Dash1 />
                <Circles />
              </>
            } 
          />
          <Route path="/courses" element={<Courses/>} />
        <Route path="/notes" element={<Notes/>} />
       
        </Routes>
      </div>
    </Router>
  );
}

export default App;
