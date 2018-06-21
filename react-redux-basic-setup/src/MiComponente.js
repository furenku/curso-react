import React, {Component} from 'react';

import { connect } from 'react-redux';




class MiComponente extends Component {
   
    sendTestValue = () => {

        this.props.dispatch({
            type: 'ADD_VALUE',
            payload: {
                value: `un nuevo valor: ${Math.random()}`
            } 
        })

    }

    render() {
        return(
            <div>
                <div>
                    {this.props.test}          
                </div>
                <button onClick={ () => this.sendTestValue() }>
                    Cambiar el Estado
                </button>
                    
            </div>
        )
    }
    
}

const mapStateToProps = (state, props) => {
    return {
        test: state.test
    }
}

export default connect(mapStateToProps)(MiComponente);