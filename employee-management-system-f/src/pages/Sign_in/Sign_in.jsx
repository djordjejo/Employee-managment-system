import SignInHeader from "./components/Sign_in_header";
import SignInHero from "./components/Sign_in_hero";
import SignInSocial from "./components/SignInSocial";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx"; 
export default function SignIn() {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-white flex flex-col justify-between p-8">
        <SignInHeader />
        <div className="flex-1 flex items-center justify-center">
          <SignInHero />
        </div>
        <div>
          <form className="flex flex-col space-y-4">
           
            <Input 
            type="email"
            placeholder="Enter your email"
            />
            <Input
              type="password"
              placeholder="Password"
            />
            <Button type="submit"> Sign In </Button>
          </form>
          <SignInSocial />
        </div>
      </div>

      <div className="w-1/2 bg-blue-500 flex items-center justify-center">
        
        <img
          src="../../../public/images/SignInIlustration.png"
          alt="Illustration"
          className="w-3/4 h-auto"
        />
      </div>
    </div>
  );
}
