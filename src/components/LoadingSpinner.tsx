// Import React Bootstrap components for styling
import { Spinner } from "react-bootstrap";

// Define the props interface for TypeScript
interface LoadingSpinnerProps {
  size?: "sm" | undefined; // Optional size prop
  className?: string; // Optional CSS classes
}

// LoadingSpinner component for showing loading states
function LoadingSpinner({ size, className = "" }: LoadingSpinnerProps) {
  return (
    // Container with centered spinner
    <div
      className={`d-flex justify-content-center align-items-center p-4 ${className}`}
    >
      {/* Bootstrap spinner component */}
      <Spinner animation="border" role="status" size={size} variant="primary">
        {/* Screen reader text for accessibility */}
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default LoadingSpinner;
