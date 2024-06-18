import {memo} from "react";
import Button from "../components/button.jsx";
import userImg from "../assets/user-icon.png";

const UserInfo = memo(function UserInfo() {

    return <Button className="flex m-2 bg-gray-200 hover:bg-gray-300 hover:border-gray-400 rounded-md shadow-2xl">
        <span className="font-bold text-2xl text-gray-500 mr-2 truncate">Unknown User</span>
        <img className="rounded-b-full h-8" src={userImg} alt="user logo" />
    </Button>;
});
export default UserInfo;
