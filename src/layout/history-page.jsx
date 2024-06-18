
import _ from 'lodash';
import { PureComponent} from 'react';

import history from "../constants/history-to-do-list.jsx";

class HistoryPage extends PureComponent {
    render () {
        return <>
            <header className="flex m-2 p-2 justify-center h-1/6">
                <h2 className="text-6xl text-gray-500 font-bold truncate"><strong> History Of To-Do List! </strong></h2>
            </header>
            <hr className="border-1 mt-3 border-gray-300 rounded-md bg-gray-100 shadow-xl"/>
            <div className="text-gray-500 text-3xl border-2 border-gray-300 m-2 p-2 overflow-y-auto max-h-[790px]">
                {!_.isEmpty(history) && history}
            </div>
        </>
    }
}

export default HistoryPage;
