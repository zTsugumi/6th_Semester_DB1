import React from 'react';
import useSticky from '../hooks/useSticky.js';
import Header from './Header/Header';
import Welcome from './Header/Welcome';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

function Main(props) {
    const { isSticky, element } = useSticky();

    // ?? Sticky animation is still a little bit buggy, Navbar need more modification ??
    return (
        <div>            
            <Header sticky={isSticky} />
            <Welcome element={element} />
        </div>
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));