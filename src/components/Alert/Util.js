import React from "react";
import ReactDOM from "react-dom";
import Alert from "./Alert";

const Util = {
    alert: (status, message, okCb, reloadPage) => {
        ReactDOM.render(
            <Alert
                status={status}
                message={message}
                callback={
                    () => {
                        ReactDOM.unmountComponentAtNode(
                            document.getElementById("alertHolder")
                        );
                        if (okCb) {
                            okCb();
                        }
                    }}
                reloadPage={reloadPage}
            />,
            document.getElementById("alertHolder")
        );
    }
};

export default Util;