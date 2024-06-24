
// outsource dependencies
import { useSelector } from 'react-redux';

// local dependencies
import Header from './layout/header.jsx';
import SideMenu from './layout/side-menu.jsx';
import HistoryPage from './layout/history-page.jsx';
import AboutUSPage from './layout/about-us-page.jsx';
import { SOURCE_TYPE } from './constants/types-const.js'
import ToDoListPage from './layout/to-do-list-page/index.jsx';

function App() {
    //NOTE prepare data
    const source = useSelector(state => state.main.source);
    let activeSource ;

    switch (source) {
        // case SOURCE_TYPE.HOME_PAGE:
        //     activeSource = <HomePage />
        //     break;
        case SOURCE_TYPE.TO_DO_LIST_PAGE:
            activeSource = <ToDoListPage />
            break;
        case SOURCE_TYPE.HISTORY_PAGE:
            activeSource = <HistoryPage />
            break;
        case SOURCE_TYPE.ABOUT_US_PAGE:
            activeSource = <AboutUSPage />
            break;
        default:
            activeSource = <ToDoListPage />
    }

  return <div className="max-w-screen max-h-screen">
            <Header />
            <SideMenu />
            <div className="mt-2">
                {activeSource}
            </div>
      </div>;
}

export default App
