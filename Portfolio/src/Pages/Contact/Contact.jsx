import { useState } from "react";
import "./Contact.css";

function Contact() {

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
  };

  return (
    <section className="contact-section" id="contact">

      <div className="contact-header">

        <span className="contact-label">
          GET IN TOUCH
        </span>

        <h2>Let's Work Together</h2>

        <div className="contact-line"></div>

        <p>
          Have a project in mind or want to discuss an opportunity?
          I'd love to hear from you.
        </p>

      </div>



      <div className="contact-container">

        <div className="contact-info">
          <div className="contact-profile-icon">
            🧑‍💻
          </div>

          <h3>Let's Connect</h3>

          <p className="contact-description">
            I'm always open to discussing new projects, creative ideas,
            or opportunities to be part of your vision.
          </p>


          <div className="info-item">

            <div className="info-icon">
              📍
            </div>

            <div>
              <span>Location</span>
              <strong>Damanhour, Beheira , Egypt</strong>
            </div>

          </div>


          <div className="info-item">

            <div className="info-icon">
              ✉
            </div>

            <div>
              <span>Email</span>
              <strong>abadawy955@gmail.com</strong>
            </div>

          </div>

          <div className="info-item">

            <div className="info-icon">
              💼
            </div>

            <div>
              <span>Focus</span>
              <strong>Front-End Development</strong>
            </div>

          </div>

        </div>


        <div className="contact-form-box">

          {submitted ? (


            <div className="success-message">

              <div className="success-icon">
                ✓
              </div>

              <h3>
                Message sent successfully!
              </h3>

              <p>
                I'll get back to you soon.
              </p>

            </div>

          ) : (

            <>
              <h3 className="form-title">
                Send a Message
              </h3>


              <form onSubmit={handleSubmit}>

                <div className="form-row">

                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                  />

                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                  />

                </div>

                <div className="form-row">

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone No. (optional)"
                  />

                </div>

                <textarea
                  name="message"
                  placeholder="Your message..."
                  required
                ></textarea>

                <button type="submit">
                  Send Message
                  <span>→</span>
                </button>

              </form>
            </>

          )}

        </div>

      </div>

    </section>
  );
}

export default Contact;