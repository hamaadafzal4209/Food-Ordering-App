import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPopup({ onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleCloseModal() {
    onClose();
    setName("");
    setEmail("");
    setPassword("");
  }

  function toggleForm() {
    setIsSignUp((prev) => !prev);
    setName("");
    setEmail("");
    setPassword("");
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <Modal show={true} size="sm" onClose={handleCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {isSignUp ? "Sign up for an account" : "Sign in to our platform"}
          </h3>
          {isSignUp && (
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your name" />
              </div>
              <TextInput
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <div className="relative">
              <TextInput
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="w-full">
            <Button className="w-full">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
            {isSignUp ? "Already have an account?" : "Not registered?"}&nbsp;
            <p
              href=""
              className="text-cyan-700 hover:underline dark:text-cyan-500 cursor-pointer"
              onClick={toggleForm}
            >
              {isSignUp ? "Sign In" : "Create account"}
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoginPopup;
