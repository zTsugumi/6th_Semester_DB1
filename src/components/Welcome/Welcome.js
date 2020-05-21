import React, { useEffect } from "react";
import Logo from "../../assets/images/logo.png";
import Home from "../Welcome/Home";

import "./Welcome.css"

const Welcome = (props) => {
    return (
        <>
            <section className="welcome">
                <div ref={props.element}>
                    <img src={Logo} alt="logo" className="welcome--logo" />
                    <p>Something here</p>
                </div>

            </section>
            <Home dish={props.dishFeature}
                dishesLoading={props.dishesLoading}
                dishesErrMess={props.dishesErrMess} />
        </>
    )
}

export default Welcome