import React, { useEffect, useRef } from "react"; // ✅ include useRef here
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "./landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null); // ✅ this line fixes your error

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });

    const bootstrap = require("bootstrap");
    if (carouselRef.current) {
      new bootstrap.Carousel(carouselRef.current, {
        interval: 2000,
        ride: "carousel",
        pause: false,
        wrap: true,
      });
    }
  }, []);
   const handleGetStarted = () => {
    navigate("/login-signup"); // Navigates to the login/signup page
  };

  const handlePrev = () => {
    const bootstrap = require("bootstrap");
    const carousel = bootstrap.Carousel.getInstance(carouselRef.current);
    if (carousel) carousel.prev();
  };

  const handleNext = () => {
    const bootstrap = require("bootstrap");
    const carousel = bootstrap.Carousel.getInstance(carouselRef.current);
    if (carousel) carousel.next();
  };

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
            <h1 className="display-4">Track your job search,<br/> Get hired faster.</h1>
            <p className="lead">
              Simplify automatically saves job applications you submit to help you<br/> manage your
job search and follow up at the right time, every time.
            </p>
            <button
              onClick={handleGetStarted}
              className="btn btn-lg mt-4 px-4 rounded-pill"
              style={{ background: "linear-gradient(45deg, #007bff, #00c6ff)" }}
            >
              Activate Extension
            </button>
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

     {/* Slider Section – Keep Only This One */}
<section className="slider my-5 py-5" id="sliderCarousel">
  <div ref={carouselRef} className="carousel slide" id="sliderCarouselInner">
    <div className="carousel-inner text-center">
      <div className="carousel-item active">
        <h1 className="mb-4">
          Effortless Job <span style={{ color: "yellow" }}>Applications</span>, Seamless
          Career <span style={{ color: "yellow" }}>Growth</span>
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
          <img
            src="https://www.iconpacks.net/icons/2/free-rocket-icon-3431-thumb.png"
            alt="Rocket Icon"
            width="20"
            height="20"
          />
          Get Started
        </a>
      </div>

      <div className="carousel-item">
        <h1 className="mb-4">
          Craft Perfect <span style={{ color: "yellow" }}>Resumes</span>{" "}
          That Land <span style={{ color: "yellow" }}>Interviews</span>.
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
          <img
            src="https://www.iconpacks.net/icons/2/free-rocket-icon-3431-thumb.png"
            alt="Rocket Icon"
            width="20"
            height="20"
          />
          Get Started
        </a>
      </div>
    </div>

    {/* Working Prev/Next Buttons */}
    <button className="carousel-control-prev" type="button" onClick={handlePrev}>
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" onClick={handleNext}>
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</section>


      {/* Features Section */}
      <section className="py-5 features" id="features">
  <div className="container inner text-center">
    <h1 className="mb-5">What We Do!</h1>

    <div className="row justify-content-center" data-aos="fade-up">
      <div className="col-md-4 mb-4">
        <div className="feature-card">
          <img
            src="https://img.icons8.com/fluency/48/rocket.png"
            alt="One Click Apply"
          />
          <h5 className="mt-3">One-Click Apply</h5>
          <p>Apply faster with pre-filled applications across companies.</p>
        </div>
      </div>

      <div className="col-md-4 mb-4">
        <div className="feature-card">
          <img
            src="https://img.icons8.com/fluency/48/resume.png"
            alt="Smart Resume Builder"
          />
          <h5 className="mt-3">Smart Resume Builder</h5>
          <p>Auto-fill your resume using AI and enhance your profile.</p>
        </div>
      </div>

      <div className="col-md-4 mb-4">
        <div className="feature-card">
          <img
            src="https://img.icons8.com/fluency/48/filter.png"
            alt="Intelligent Filters"
          />
          <h5 className="mt-3">Intelligent Filters</h5>
          <p>Let the platform recommend jobs tailored to your profile.</p>
        </div>
      </div>
    </div>

    <div className="text-center mt-3" data-aos="fade-in">
      <p>
        <span role="img" aria-label="star">⭐</span> 3+ reviews from happy users
      </p>
    </div>
  </div>
</section>

{/* How It Works Section */}
<section className="how-it-works py-5" id="working">
  <div className="container">
    <h2 className="text-center mb-5">How it Works?</h2>
    <div className="row align-items-center">
      <div className="col-md-6 text-center mb-4 mb-md-0">
        <h4 className="animated-text">
          Automate Job <span className="highlight">Applications</span>
          <i className="fas fa-cogs ms-2 text-primary spin-icon"></i>
        </h4>
      </div>
      <div className="col-md-6 text-center">
        <video controls className="how-video">
          <source src="your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
</section>
{/* Testimonials Section */}
<section className="testimonials py-5" id="testimonials" data-aos="fade-up">
  <div className="container text-center">
    <h1 className="mb-5">What Our Users Say</h1>

    <div className="row justify-content-center">
      <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="100">
        <div className="testimonial-card p-4 bg-light shadow rounded">
          <p>"Apply Smart helped me get my dream job in just two weeks!"</p>
          <strong>- Himanshu Chaudhary</strong>
        </div>
      </div>

      <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="200">
        <div className="testimonial-card p-4 bg-light shadow rounded">
          <p>"The resume builder is a life-saver. Loved the simplicity."</p>
          <strong>- Alankrit Agrawal</strong>
        </div>
      </div>

      <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="300">
        <div className="testimonial-card p-4 bg-light shadow rounded">
          <p>"I applied to 30 jobs with one click. Super fast and effective."</p>
          <strong>- Daksh Meetha</strong>
        </div>
      </div>

      <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="400">
        <div className="testimonial-card p-4 bg-light shadow rounded">
          <p>"Helped me to secure interviews for my dream jobs!"</p>
          <strong>- Harsh Gupta</strong>
        </div>
      </div>

      <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="500">
        <div className="testimonial-card p-4 bg-light shadow rounded">
          <p>"Best feature this site provides is resume building!"</p>
          <strong>- Satvik Duddu</strong>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Ready To Get Started Section */}
<section className="ready-start py-5" data-aos="fade-up">
  <div className="container text-center">
    <h2 className="mb-4">Ready to get started?</h2>
    <p className="mb-4">
      Join Apply Smart today and fast-track your job applications!
    </p>
    <a
      href="#"
      data-bs-toggle="modal"
      data-bs-target="#authModal"
      className="btn btn-primary rounded-pill px-4"
    >
      Get Started
    </a>
  </div>
</section>



      <footer className="footer-section py-5 text-white">
  <div className="container">
    <div className="row">

      {/* Logo & Description */}
      <div className="col-md-4 mb-4">
        <h5 className="fw-bold d-flex align-items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/616/616554.png"
            width="30"
            height="30"
            alt="Apply Smart"
          />
          Apply Smart
        </h5>
        <p className="mt-2 small">
          Automated job applications to help you land your dream job faster.
        </p>
      </div>

      {/* Tools */}
      <div className="col-md-2 mb-4">
        <h6 className="fw-bold">Tools</h6>
        <ul className="list-unstyled small">
          <li>Resume Builder</li>
          <li>Application Tracker</li>
          <li>Job Suggestions</li>
        </ul>
      </div>

      {/* Features */}
      <div className="col-md-2 mb-4">
        <h6 className="fw-bold">Features</h6>
        <ul className="list-unstyled small">
          <li>One-Click Apply</li>
          <li>AI Recommendations</li>
          <li>Custom Filters</li>
        </ul>
      </div>

      {/* Support */}
      <div className="col-md-2 mb-4">
        <h6 className="fw-bold">Support</h6>
        <ul className="list-unstyled small">
          <li>FAQs</li>
          <li>Help Center</li>
          <li>Guides</li>
        </ul>
      </div>

      {/* Contact */}
      <div className="col-md-2 mb-4">
        <h6 className="fw-bold">Contact</h6>
        <ul className="list-unstyled small">
          <li>Email: applysmart@gmail.com</li>
        </ul>
      </div>

    </div>

    <hr className="border-light" />
    <p className="text-center small mb-0">
      © {new Date().getFullYear()} Apply Smart. All rights reserved.
    </p>
  </div>
</footer>

    </>
  );
};

export default Landing;