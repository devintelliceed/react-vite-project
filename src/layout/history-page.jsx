
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../components/button.jsx';
import { mainSliceActions } from '../store/main-slice.js';
import history from '../constants/history-to-do-list.jsx';

class HistoryPage extends Component {

    render () {
        return <>
            <header className="flex m-2 p-2 justify-center h-1/6">
                <h2 className="text-6xl text-gray-500 font-bold truncate"><strong> History Of To-Do List! </strong></h2>
            </header>
            <hr className="border-1 mt-3 border-gray-300 rounded-md bg-gray-100 shadow-xl"/>
            <div className="text-gray-500 text-3xl border-2 border-gray-300 m-2 p-2 overflow-y-auto max-h-[700px]">
                {!_.isEmpty(history) && history}
            </div>
            <div className="flex items-center justify-center">
                <Button
                    onClick={() => this.props.goToMainPage()}
                    className=" m-2 bg-gray-200 hover:bg-gray-300 hover:border-gray-400 rounded-md shadow-2xl">
                    <strong> Go To-Do list </strong>
                </Button>
            </div>
        </>
    }
}
const { goToMainPage } = mainSliceActions;

const mapDispatchToProps =  { goToMainPage };
HistoryPage.propTypes = {
    goToMainPage: PropTypes.func.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect (null, mapDispatchToProps )(HistoryPage);
