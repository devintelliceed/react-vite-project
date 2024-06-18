import { memo } from 'react';
import SideBar from "./side-bar.jsx";

const ToDoListPage = memo(function HomePage() {
    return <>
        <header className="flex justify-center p-5">
            <h2 className="text-6xl text-gray-500 font-bold truncate"><strong> To-Do List! </strong></h2>
        </header>
        <SideBar />

    </>
});

export default ToDoListPage;
