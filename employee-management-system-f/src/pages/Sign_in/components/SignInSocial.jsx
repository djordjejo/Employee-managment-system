import { FaGoogle, FaApple } from "react-icons/fa"; 

export default function SignInSocial() {
  return (
    <div className="flex flex-col items-center mt-8 space-y-4">
      {/* Login with */}
      <p className="text-gray-500">Or sign in with</p>

      {/* Dugmad za Google i Apple */}
      <div className="flex space-x-4">
        <button className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-gray-100 transition">
          <FaGoogle className="text-red-500" />
          <span>Google</span>
        </button>
        <button className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-gray-100 transition">
          <FaApple className="text-black" />
          <span>Apple</span>
        </button>
      </div>

      {/* Link za registraciju */}
      <p className="text-gray-600">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-500 hover:underline">
          Register now
        </a>
      </p>

      {/* Footer */}
      <footer className="text-gray-400 text-sm mt-4">
        &copy; {new Date().getFullYear()} EmployeeHub. All rights reserved.
      </footer>
    </div>
  );
}
