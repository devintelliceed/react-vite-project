//Outsource dependencies

//NOTE ToDoSlice
import uniqid from 'uniqid';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedProject: undefined,
    projects: [
        {
            title: 'Morning Routine',
            description: 'Set of activities performed after waking up to start the day positively and efficiently. It often includes personal hygiene, having breakfast, planning the day, and engaging in light exercise or mindfulness practices',
            id: 1,
            tasks: [
                {
                    id: 1,
                    task: 'Wake up',
                    description: 'Get out of bed and start the day',
                    done: false
                },
                {
                    id: 2,
                    task: 'Brush teeth and wash face',
                    description: 'Freshen up and maintain hygiene',
                    done: false
                },
                {
                    id: 3,
                    task: 'Prepare and eat breakfast',
                    description: 'Fuel the body with a nutritious meal',
                    done: false
                },
                {
                    id: 4,
                    task: 'Read or listen to news',
                    description: 'Stay updated with current events',
                    done: false
                },
                {
                    id: 5,
                    task: 'Review daily schedule and tasks',
                    description: 'Plan and organize activities for the day',
                    done: false
                },
                {
                    id: 6,
                    task: 'Exercise or stretch',
                    description: 'Stay active and maintain physical health',
                    done: false
                },
                {
                    id: 7,
                    task: 'Prepare for work or start daily activities',
                    description: 'Get ready for the day\'s responsibilities',
                    done: false
                },
                {
                    id: 8,
                    task: 'Check and respond to emails/messages',
                    description: 'Address important communications',
                    done: false
                },
                {
                    id: 9,
                    task: 'Practice mindfulness or meditation',
                    description: 'Promote mental clarity and relaxation',
                    done: false
                },
                {
                    id: 10,
                    task: 'Pack lunch or snacks',
                    description: 'Prepare food to take along for the day',
                    done: false
                }
            ] },
        {
            title: 'Work ToDo',
            id: 2,
            description: 'Curated set of tasks and objectives that need to be completed during a specified period, helping individuals stay organized and focused on their professional responsibilities',
            tasks: [
                {
                    id: 1,
                    task: 'Check email and respond to messages',
                    description: '30 minutes',
                    done: false
                },
                {
                    id: 2,
                    task: 'Plan tasks for the day',
                    description: '1 hour',
                    done: false
                },
                {
                    id: 3,
                    task: 'Attend meetings or conferences',
                    description: 'Varies',
                    done: false
                },
                {
                    id: 4,
                    task: 'Complete ongoing tasks and projects',
                    description: 'Throughout the day',
                    done: false
                },
                {
                    id: 5,
                    task: 'Collaborate with colleagues and management',
                    description: 'As needed',
                    done: false
                },
                {
                    id: 6,
                    task: 'Plan next work day',
                    description: 'As possible',
                    done: false
                }
            ], },
        {
            title: 'Dietary Pattern',
            id: 3,
            description: 'A dietary pattern refers to the overall structure and composition of food consumed over time, reflecting habitual eating habits that contribute to nutritional intake and health outcomes',
            tasks: [
                {
                    id: 1,
                    task: 'Breakfast',
                    description: 'Oatmeal with fruits and nuts',
                    done: false
                },
                {
                    id: 2,
                    task: 'Morning Snack',
                    description: 'Greek yogurt with honey and berries',
                    done: false
                },
                {
                    id: 3,
                    task: 'Lunch',
                    description: 'Grilled chicken salad with avocado and vinaigrette',
                    done: false
                },
                {
                    id: 4,
                    task: 'Afternoon Snack',
                    description: 'Apple slices with almond butter',
                    done: false
                },
                {
                    id: 5,
                    task: 'Dinner',
                    description: 'Salmon with quinoa and steamed vegetables',
                    done: false
                },
                {
                    id: 6,
                    task: 'Evening Snack',
                    description: 'Mixed nuts and dried fruits',
                    done: false
                }
            ], },
        {
            title: 'Free Time',
            id: 4,
            description: 'Personalized schedule or set of activities that individuals engage in during their leisure or unoccupied periods. It typically includes hobbies, relaxation, entertainment, and activities that promote personal well-being and enjoyment',
            tasks: [
                {
                    id: 1,
                    task: 'Sleep in',
                    description: 'Relax and catch up on sleep',
                    done: false
                },
                {
                    id: 2,
                    task: 'Prepare a leisurely breakfast',
                    description: 'Cook a special breakfast at home',
                    done: false
                },
                {
                    id: 3,
                    task: 'Go for a morning walk or jog',
                    description: 'Enjoy some outdoor exercise',
                    done: false
                },
                {
                    id: 4,
                    task: 'Read a book or watch a movie',
                    description: 'Spend some time relaxing with entertainment',
                    done: false
                },
                {
                    id: 5,
                    task: 'Have a picnic in the park',
                    description: 'Enjoy a meal outdoors',
                    done: false
                },
                {
                    id: 6,
                    task: 'Visit friends or family',
                    description: 'Spend quality time with loved ones',
                    done: false
                },
                {
                    id: 7,
                    task: 'Do household chores',
                    description: 'Catch up on cleaning and organizing',
                    done: false
                },
                {
                    id: 8,
                    task: 'Try out a new recipe',
                    description: 'Cook something new and delicious',
                    done: false
                },
                {
                    id: 9,
                    task: 'Go for a hike or outdoor adventure',
                    description: 'Explore nature and enjoy outdoor activities',
                    done: false
                },
                {
                    id: 10,
                    task: 'Relax and unwind',
                    description: 'Take time to rest and recharge',
                    done: false
                }
            ] },
    ],
};
const reducers = {
    // PROJECTS actions
    cancelEditing: (state) => {
        const confirm = window.confirm('Are you sure?');
        if (!confirm) {
            return { ...state };
        }
        return { ...state, selectedProject: undefined };
    },

    viewProject: (state, action) => {
        return { ...state, selectedProject: { id: action.payload, state: 'view' } };
    },
    editProject: (state, action) => {
        return { ...state, selectedProject: { id:action.payload, state: 'edit' } };
    },
    removeProject: (state, action) => {
        const confirm = window.confirm('Are you sure?');
        if (!confirm) { return { ...state }}
        const index = state.projects.findIndex(project => project.id === action.payload);
        let updatedProjects = state.projects.slice();
        if (index === -1) { return }
        updatedProjects.splice(index, 1);
        return { ...state, selectedProject: undefined, projects: [...updatedProjects] };
    },
    submitProject: (state, action) => {
        let projectData = {};
        let updatedProjects = state.projects.slice()
        if (action.payload.id) {
            projectData = { ...action.payload };
        } else {
            projectData = { ...action.payload, id: uniqid() };
        }
        const index = state.projects.findIndex(project => project.id === projectData.id);
        if (index === -1) {
            updatedProjects.push(projectData);
        } else {
            updatedProjects[index] = projectData;
        }
        return { ...state, selectedProject: { id: projectData.id, state: 'view' }, projects: [...updatedProjects] };
    },
    // TASKS actions
    checkTaskToggle: (state, action) => {
        const projectId = state.selectedProject.id;
        const updatedProjects = state.projects.slice();
        const index = updatedProjects.findIndex(project => project.id === projectId);
        const taskIndex = updatedProjects[index].tasks.findIndex(task => task.id === action.payload);
        if (index === -1 && taskIndex === -1) { return }
        updatedProjects[index].tasks[taskIndex].done = !updatedProjects[index].tasks[taskIndex].done;
    },
};
const toDoListSlice = createSlice({
    name: 'toDoListSlice',
    initialState,
    reducers,
});

export const toDoSliceActions = toDoListSlice.actions;
export default toDoListSlice.reducer;
