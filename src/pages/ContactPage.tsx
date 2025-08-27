// Import React Bootstrap components for styling
import { Card, Col, Container, Row } from "react-bootstrap";
// Import icons from react-icons
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

// ContactPage component - displays contact information
function ContactPage() {
  return (
    // Main container for the contact page
    <Container>
      {/* Page header */}
      <Row className="mb-5">
        <Col>
          <h1 className="mb-3">Contact Us</h1>
          <p className="lead text-muted">
            Have questions about Recipe Manager? We'd love to hear from you!
          </p>
        </Col>
      </Row>

      {/* Contact information cards */}
      <Row xs={1} md={2} lg={3} className="g-4 mb-5">
        {/* Email contact */}
        <Col>
          <Card className="h-100 text-center">
            <Card.Body>
              <div className="mb-3">
                <FaEnvelope size={48} className="text-primary" />
              </div>
              <h3 className="h5">Email</h3>
              <p className="text-muted mb-2">Get in touch with us</p>
              <a
                href="mailto:contact@recipemanager.com"
                className="text-decoration-none"
              >
                contact@recipemanager.com
              </a>
            </Card.Body>
          </Card>
        </Col>

        {/* Phone contact */}
        <Col>
          <Card className="h-100 text-center">
            <Card.Body>
              <div className="mb-3">
                <FaPhone size={48} className="text-success" />
              </div>
              <h3 className="h5">Phone</h3>
              <p className="text-muted mb-2">Call us directly</p>
              <a href="tel:+1-555-123-4567" className="text-decoration-none">
                +1 (555) 123-4567
              </a>
            </Card.Body>
          </Card>
        </Col>

        {/* Location */}
        <Col>
          <Card className="h-100 text-center">
            <Card.Body>
              <div className="mb-3">
                <FaMapMarkerAlt size={48} className="text-danger" />
              </div>
              <h3 className="h5">Location</h3>
              <p className="text-muted mb-2">Visit our office</p>
              <p className="mb-0">
                123 Recipe Street
                <br />
                Cooking City, CC 12345
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* About section */}
      <Row className="mb-5">
        <Col lg={8}>
          <Card>
            <Card.Body>
              <h2 className="mb-4">About Recipe Manager</h2>
              <p>
                Recipe Manager is a modern web application designed to help you
                organize, create, and discover delicious recipes. Whether you're
                a seasoned chef or just starting your culinary journey, our
                platform provides the tools you need to manage your recipe
                collection effectively.
              </p>
              <p>
                Built with React, TypeScript, and modern web technologies,
                Recipe Manager offers a responsive design that works seamlessly
                across all devices. Our intuitive interface makes it easy to add
                new recipes, mark favorites, and share your culinary creations
                with others.
              </p>
              <p>
                This project was created as a learning tool for beginner
                developers, demonstrating key concepts like component-based
                architecture, state management, API integration, and responsive
                design.
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* Features sidebar */}
        <Col lg={4}>
          <Card>
            <Card.Body>
              <h3 className="h5 mb-3">Key Features</h3>
              <ul className="list-unstyled">
                <li className="mb-2">✅ Create and edit recipes</li>
                <li className="mb-2">✅ Mark favorite recipes</li>
                <li className="mb-2">✅ Responsive design</li>
                <li className="mb-2">✅ Search and filter</li>
                <li className="mb-2">✅ Modern UI/UX</li>
                <li className="mb-2">✅ RESTful API integration</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Social links */}
      <Row>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <h3 className="h5 mb-3">Connect With Us</h3>
              <div className="d-flex justify-content-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <FaGithub size={24} className="text-dark" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <FaLinkedin size={24} className="text-primary" />
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactPage;
