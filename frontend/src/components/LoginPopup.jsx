import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

function LoginPopup({ onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const url = isSignUp
      ? "http://localhost:8000/api/user/register"
      : "http://localhost:8000/api/user/login";

    try {
      const response = await axios.post(url, data);
      console.log(response.data); // Assuming you want to log the response

      // Handle success
      toast.success(response.data.message);

      // Close modal after successful operation
      handleCloseModal();
    } catch (error) {
      console.error("Error:", error.response.data);
      toast.error(error.response.data.message);
      // Handle error, e.g., display error message
    }
  };

  function handleCloseModal() {
    onClose();
    setData({
      name: "",
      email: "",
      password: "",
    });
  }

  function toggleForm() {
    setIsSignUp((prev) => !prev);
    setData({
      name: "",
      email: "",
      password: "",
    });
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <Modal show={true} size="sm" onClose={handleCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <form onSubmit={handleFormSubmit}>
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
                  name="name"
                  placeholder="John Doe"
                  value={data.name}
                  onChange={handleChange}
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
                name="email"
                placeholder="name@company.com"
                value={data.email}
                onChange={handleChange}
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={data.password}
                  onChange={handleChange}
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
              <Button type="submit" className="w-full">
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
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginPopup;