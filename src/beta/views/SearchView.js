import { Box, styled } from "@mui/material";
import LogDetailsContainer from "beta/components/log/LogDetails/LogDetailsContainer";
import { SearchResultList } from "beta/components/search";
import React from "react";
import { useParams } from "react-router-dom";

const SearchView = styled(({className}) => {

    const { id } = useParams();

    return (
        <Box 
            sx={{
                height: "100%",
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gridTemplateRows: "1fr"
            }} 
            className={`SearchView ${className}`} 
        >
            <SearchResultList />
            <LogDetailsContainer id={id} />
        </Box>
    )

})({
    "& > *": {
        minWidth: 0
    },
    "& .SearchResultList": {
        flex: 1,
        minHeight: 0
    },
    "& .LogDetailsContainer": {
        flex: 2
    },
})

export default SearchView;