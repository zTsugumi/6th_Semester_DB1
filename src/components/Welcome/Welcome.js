import React from "react";
import Logo from "../../assets/images/logo.png";

import "./Welcome.css"

const Welcome = (props) => {
    return (
        <section className="welcome">
            <div ref={props.element}>
                <img src={Logo} alt="logo" className="welcome--logo" />
                <p>Something here</p>
            </div>
        </section >
    )
}

export default Welcome