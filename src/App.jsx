import { useState } from 'react';
import './App.css';

const API_URL = "https://solitary-toad-9659pgw6wg95cx5p4-5000.app.github.dev";

function App() {
  const [reports, setReports] = useState([]);
  const [showAuth, setShowAuth] = useState("login");
  const [user, setUser] = useState(null);

  // Handle pet reports
  const handleSubmit = (event, status) => {
    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);

    const newReport = {
      id: Date.now(),
      status,
      pet: data.get("pet") || data.get("petType"),
      location: data.get("location"),
      contact: data.get("contact"),
      description: data.get("description")
    };

    setReports((previous) => [newReport, ...previous]);

    alert(status + " pet report submitted successfully! 🐾");
    form.reset();
  };

  // Handle Login and Registration
  const handleAuth = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const payload = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    if (showAuth === "register") {
      payload.name = formData.get("name");
    }

    const endpoint =
      showAuth === "register" ? "/register" : "/login";

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Authentication failed");
        return;
      }

      alert(result.message);

      if (showAuth === "register") {
        setShowAuth("login");
      } else {
        localStorage.setItem("pawfinderToken", result.token);
        setUser({
          email: payload.email,
          token: result.token
        });
      }

      event.target.reset();

    } catch (error) {
      alert("Cannot connect to server. Check your backend.");
    }
  };

  return (
    <>
      <header>
        <h1>🐾 PawFinder</h1>
        <p>Helping lost pets find their way home.</p>
      </header>

      <main>
        {user && <h2>Welcome, {user.email}!</h2>}
        {!user && (
          <section className="auth-section">
          <h2>Welcome to PawFinder</h2>

          <div className="actions">
            <button onClick={() => setShowAuth("login")}>
              Login
            </button>

            <button onClick={() => setShowAuth("register")}>
              Register
            </button>
          </div>

          <form onSubmit={handleAuth}>
            {showAuth === "register" && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />

            <button type="submit">
              {showAuth === "login" ? "Login" : "Create Account"}
            </button>
          </form>
        </section>)}

        <h2>Every Pet Deserves to Find Its Way Home</h2>
        <p>
          Report a missing pet or help reunite a lost pet with its family.
        </p>

        <div className="actions">
          <a href="#lost">Report a Lost Pet</a>
          <a href="#found">I Found a Pet</a>
        </div>

        <section id="lost">
          <h2>🐶 Report a Lost Pet</h2>

          <form onSubmit={(event) => handleSubmit(event, 'Lost')}>
            <input name="pet" placeholder="Pet Name" required />
            <input name="petType" placeholder="Pet Type" required />
            <input name="location" placeholder="Last Seen Location" required />
            <input name="contact" placeholder="Contact Number" required />
            <textarea name="description" placeholder="Description" />
            <input type="file" accept="image/*" />
            <button type="submit">Submit Lost Pet Report</button>
          </form>
        </section>

        <section id="found">
          <h2>🐱 Report a Found Pet</h2>

          <form onSubmit={(event) => handleSubmit(event, 'Found')}>
            <input name="pet" placeholder="Pet Type" required />
            <input name="location" placeholder="Found Location" required />
            <input name="contact" placeholder="Contact Number" required />
            <textarea name="description" placeholder="Describe the found pet" />
            <input type="file" accept="image/*" />
            <button type="submit">Submit Found Pet Report</button>
          </form>
        </section>

        <section>
          {reports.length === 0 ? (
            <p>No pet reports yet.</p>
          ) : (
            reports.map((report) => (
              <div className="report-card" key={report.id}>
                <h3>{report.status} Pet</h3>
                <p><b>Name/Type:</b> {report.pet}</p>
                <p><b>Location:</b> {report.location}</p>
                <p><b>Contact:</b> {report.contact}</p>
                <p><b>Description:</b> {report.description}</p>
              </div>
            ))
          )}
        </section>
      </main>

      <footer>
        © 2026 PawFinder. Made with ❤️ for pets.
      </footer>
    </>
  );
}

export default App;