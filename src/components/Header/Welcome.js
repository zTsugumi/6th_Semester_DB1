import React from "react"
import Logo from "../../assets/images/logo.png";
import Home from '../Home/Home';

import "./Welcome.css"

const Welcome = ({ element }) => {
    return (
        <main>
            <section className='welcome'>
                <div ref={element}>
                    <img src={Logo} alt='logo' className='welcome--logo' />
                    <p>Something here</p>
                </div>
            </section>

            <section className="welcome">
                <div ref={element}>
                </div>
            </section>
            <Home />
            <Home />
            <Home />
            <Home />
            <Home />
        </main>
    )
}

export default Welcome