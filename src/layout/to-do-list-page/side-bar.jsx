
import { memo } from 'react';


import Button from "../../components/button.jsx";

const SideBar = memo( function SideBar() {

    return <aside className="fixed top-24 left-0 w-[310px] h-[900px] bg-gray-200 duration-300 rounded-br-[111px] shadow-2xl">
        <div className="flex justify-center m-3">
            <h2 className="font-bold text-xl text-gray-400 mr-2 truncate">
                Your Projects
            </h2>
            <ul></ul>
        </div>
            <div className="flex justify-center m-3">
                <Button
                    className="text-xl flex cursor-pointer p-2 hover:border-gray-400 hover:text-white hover:bg-gray-400">
                    + Add Project
                </Button>
            </div>
    </aside>
});
export default SideBar;
