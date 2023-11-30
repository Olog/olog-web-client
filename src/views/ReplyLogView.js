import ReplyLog from "components/log/ReplyLog";
import LogContainer from "components/log/LogContainer";
import React from "react";
import { useParams } from "react-router-dom";
import useIsAuthenticated from "hooks/useIsAuthenticated";

const ReplyLogView = () => {

    const { id } = useParams();
    const [isAuthenticated] = useIsAuthenticated();

    return (
        <LogContainer 
            id={id} 
            renderLog={({log}) => <ReplyLog {...{log, isAuthenticated}} />} 
        />
    );
}
export default ReplyLogView;