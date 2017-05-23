import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';

class App extends React.Component {
    constructor(){
        super();
    }

    render(){
    	return null;
    }
}

const mapStateToProps = (state) => {
	return {
		loading: state.loading
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {};
}

const Loading = connect(mapStateToProps)(App);
export default App;