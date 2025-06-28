import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import "./landing.css"; // Create and include a separate CSS file for custom styles

const Landing = () => {
  useEffect(() => {

    

    const AOS = require("aos");
    AOS.init({
      duration: 1200,
      once: true,
    });
 // Ensure Bootstrap reinitializes
    const bootstrap = require("bootstrap");
    document.querySelectorAll('.carousel').forEach((carousel) => {
      new bootstrap.Carousel(carousel);
    });
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="#">
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616554.png"
              width="40"
              height="40"
              className="me-2"
              alt="White Fox Logo"
            />
            Apply Smart
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/applicationtracker">
                  Application Tracker
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features">
                  Resume Tools
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#testimonials">
                  Reviews
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#working">
                  How it Works!
                </a>
              </li>
              <li className="nav-item">
  <Link
    className="btn btn-primary rounded-pill px-4"
    to="/login-signup"
  >
    Login / Sign Up
  </Link>
</li>

            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <div>
            <h1 className="display-4">Click, Apply, Get Hired</h1>
            <p className="lead">
              Maximize your chances of getting hired by applying to more jobs
              with personalized <br /> precision and speed.
            </p>
            <a
              href="#"
              className="btn btn-lg mt-4 px-4 rounded-pill"
              style={{ background: "linear-gradient(45deg, #007bff, #00c6ff)" }}
            >
              Activate Extension
            </a>
          </div>
          <div className="vidcontainer me-4">
            <video controls>
              <source src="your-video-file.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Modal */}
      <div
        className="modal fade"
        id="authModal"
        tabIndex="-1"
        aria-labelledby="authModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="authModalLabel">
                Login / Sign Up
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <iframe
                src="login-signup"
                frameBorder="0"
                style={{ width: "100%", height: "500px" }}
                title="Login or Sign Up"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Section */}
      <section className="slider my-5 py-5" id="sliderCarousel">
        <div
          id="sliderCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="2000"
        >
          {/* Carousel Content */}
          <div className="carousel-inner text-center">
            <div className="carousel-item active">
              <h1 className="mb-4">
                Effortless Job <span style={{ color: "yellow" }}>Applications</span>, Seamless Career <span style={{ color: "yellow" }}>Growth</span>
              </h1>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#authModal"
                className="btn btn-sm mt-4 rounded-pill d-flex align-items-center justify-content-center gap-2"
                style={{
                  padding: "8px 16px",
                  width: "fit-content",
                  margin: "0 auto",
                  fontSize: "14px",
                  backgroundColor: "#007bff",
                  border: "none",
                  color: "white",
                }}
              >
                <img src="https://www.iconpacks.net/icons/2/free-rocket-icon-3431-thumb.png" alt="Rocket Icon" width="20" height="20" />
                Get Started
              </a>
            </div>
            <div className="carousel-item">
              <h1 className="mb-4">
                Craft Perfect <span style={{ color: "yellow" }}>Resumes</span> That Land <span style={{ color: "yellow" }}>Interviews</span>.
              </h1>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#authModal"
                className="btn btn-sm mt-4 rounded-pill d-flex align-items-center justify-content-center gap-2"
                style={{
                  padding: "8px 16px",
                  width: "fit-content",
                  margin: "0 auto",
                  fontSize: "14px",
                  backgroundColor: "#007bff",
                  border: "none",
                  color: "white",
                }}
              >
                <img src="https://www.iconpacks.net/icons/2/free-rocket-icon-3431-thumb.png" alt="Rocket Icon" width="20" height="20" />
                Get Started
              </a>
            </div>
          </div>
          {/* Carousel Controls */}
         <button
  className="carousel-control-prev"
  type="button"
  data-bs-target="#sliderCarousel"
  data-bs-slide="prev"
>
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Previous</span>
</button>
<button
  className="carousel-control-next"
  type="button"
  data-bs-target="#sliderCarousel"
  data-bs-slide="next"
>
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 features" id="features">
        <div className="container inner text-center">
          <h1>What We Do!</h1>
          {/* Add your features */}
          
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        {/* Footer content */}
      </footer>
    </>
  );
};

export default Landing;
