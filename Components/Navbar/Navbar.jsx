import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();



  return (
    <nav className="navbar navbar-dark " style={{width:"80vw",marginLeft:"10vw",marginTop:"1vh",background:"#9D8189"}}>
      <div className="container-fluid">
        <a className="navbar-brand fs-1 fw-bold" href="#" style={{color:"#FFE5D9"}}>
          Corsi
        </a>

        
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

      
       <div
  className="collapse navbar-collapse mt-2"
  id="navbarMenu"
  style={{ background: "#9D8189", color: "#FFE5D9", zIndex: "20" }}
>
  <ul className="navbar-nav justify-content-center ">
    <li className="nav-item">
      <a className="nav-link fs-4" href="#" style={{ color: "#FFE5D9" ,marginLeft:"35vw"}}
       onClick={() => navigate("/")}
      >
        Dashboard
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link fs-4" href="#" style={{ color: "#FFE5D9" ,marginLeft:"35vw"}}
       onClick={() => navigate("/courses")}
      >
        Courses
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link fs-4" href="#" style={{ color: "#FFE5D9" ,marginLeft:"35vw"}}
       onClick={() => navigate("/notes")}
      >
        Notes
      </a>
    </li>
  </ul>
</div>

      </div>
    </nav>
  );
}

export default Navbar;
