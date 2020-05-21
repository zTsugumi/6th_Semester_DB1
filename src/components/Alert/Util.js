import React from "react";
import ReactDOM from "react-dom";
import Alert from "./Alert";

const Util = {
    alert: (status, message, reloadPage, okCb) => {
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