import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import ListCounter from './ListCounter';
import Counter from './Counter';
import ConfirmBox from './ConfirmBox';
import _ from 'lodash';
import axios from 'axios';
import { createRewpa, getPath } from '../../../rewpa/src/index';

// Component
import TopMap from './LocationDetail/TopMap';
import LocationInfoAndSunrise from './LocationDetail/LocationInfoAndSunrise';

class LocationDetail extends React.Component {
    constructor(){
        super();
    }

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({ type: '/INIT' });
    }

    render(){
        const { data } = this.props;
        if(data.isLoading) return <div>loading...</div>;
    	return (
    		<div>
                <TopMap path={{ location: 'location', pinInput: 'pinInput' }}/>
                <LocationInfoAndSunrise
                    path={{ ui: 'ui.locationInfoAndSunrise', location: 'location', pinInput: 'pinInput' }}
                />
    		</div>
        );
    }
}

// Data
const mapStateToProps = (state, { path }) => {
	return { data: getPath(state, path) };
}

// Actions, Effects
const mapDispatchToProps = (dispatch, { path }) => {
	return { dispatch };
}

// Reducer
const container = connect(mapStateToProps, mapDispatchToProps)(LocationDetail);
container.rewpa = createRewpa({
    schema:{
        locationInfoAndSunrise: LocationInfoAndSunrise.rewpa
    }
});
export default container;
