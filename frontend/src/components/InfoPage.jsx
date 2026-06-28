import { Link } from "react-router-dom";
import "./FirstPage.css";
import "./InfoPage.css";
import Header from "./Header";
import Footer from "./Footer";

function InfoPage({ title, content }) {
  return (
    <div className="info-page">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="info-content">
        <h1 className="info-title">{title}</h1>

        <div className="info-text">{content}</div>

        <Link to="/" className="back-button">
          Back to Home
        </Link>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default InfoPage;