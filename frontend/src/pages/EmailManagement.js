import React, { useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function EmailManagement() {

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async () => {

    try {

      await API.post("/email/send", {
        to: email,
        subject: subject,
        body: message
      });

      alert("Email Sent Successfully");

      setEmail("");
      setSubject("");
      setMessage("");

    } catch (error) {

      console.error(error);
      alert("Failed To Send Email");
    }
  };

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container-fluid p-4">

          <div className="card shadow border-0">

            <div className="card-body">

              <h3 className="mb-4">
                📧 Email Management
              </h3>

              <div className="mb-3">

                <label className="form-label">
                  Recipient Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Subject
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={subject}
                  onChange={(e) =>
                    setSubject(e.target.value)
                  }
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Message
                </label>

                <textarea
                  rows="6"
                  className="form-control"
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                />

              </div>

              <button
                className="btn btn-primary"
                onClick={sendEmail}
              >
                Send Email
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EmailManagement;