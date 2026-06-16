import Button from "../../../components/Button.jsx";
import Input from "../../../components/Input.jsx";
import Label from "../../../components/Label.jsx";

export default function CreateAcc()
{
    return(
        <div className="flex flex-col gap-4 max-w-md mx-auto mt-10 p-13 border border-gray-300 rounded-lg shadow-lg">
            <h2 className=" text-4xl text-center font-bold mb-4 ">Manage Your Own Business</h2>
            <Label>Company Name</Label>
            <Input placeholder="Company Name" type="text" />
            <Label>Company Activity</Label>
            <Input placeholder="Company Activity" type="text" />
            <Label>Company Email</Label>
            <Input placeholder="Company Email" type="email" />
            <Label>Company Website</Label>
            <Input placeholder="Company Website" type="text" />
            <Label>Company Passwword</Label>
            <Input placeholder="Company Password" type="password" />
            <Button>Create Account</Button>
        </div>
    );

}