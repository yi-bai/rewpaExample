import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import Counter from './Counter';

class ListCounter extends React.Component {
    constructor(){
        super();
    }

    render(){
        console.log(this.props);
        let counters = this.props.counters.map((counter, index) => {
            <Counter
                count={counter.count}
                increment={() => this.props.increment(index)}
                decrement={() => this.props.decrement(index)}
            />
        });
    	return (
            <div>
                { counters }
            </div>
        );
    }
}

export default ListCounter;
