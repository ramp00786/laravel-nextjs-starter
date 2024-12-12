"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirecting
import "bootstrap/dist/css/bootstrap.min.css";

export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  // Logout function
  const logout = () => {
    // Set logging out state to true to disable button during logout process
    setIsLoggingOut(true);

    // Remove the token from localStorage
    localStorage.removeItem("auth_token");

    // Optionally, clear any other user data (session, cookies, etc.)
    // sessionStorage.removeItem("user_data"); // Example if you're using sessionStorage

    // Redirect user to the login or home page
    router.push("/login"); // Change to your login route or home page

    setIsLoggingOut(false); // Reset logging out state if needed
  };

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-end">
        {/* Button */}
        <button
          onClick={logout}
          className="btn btn-danger"
          disabled={isLoggingOut} // Disable the button while logging out
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}
