import Header from "../../components/Header.jsx";
import CreateAcc from "./components/CreateAcc";
export default function GetStarted()
{
    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 bg-white flex flex-col justify-between p-5">
                <Header 
                title="EmployeeHub"
                imgSrc="../../../public/images/logo.webp"/>
                <div className="flex-1 flex items-center justify-center">
                <CreateAcc />
                </div>
            </div>
            <div className="w-1/2 bg-[#4988C4] flex items-center justify-center">
                <img src="../../../public/images/getStarted.png" alt="" />
            </div>
           
        </div>
        
    );

}