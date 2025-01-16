import { Box, Divider, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import LogDetailsContainer from "beta/components/log/LogDetails/LogDetailsContainer";
import { SearchResults } from "beta/components/search";

const ContentView = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1.15fr auto 2fr",
  gridTemplateRows: "1fr",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column-reverse",
    height: "100%",
    width: "auto",
    minWidth: 0,
    "& > div": {
      flex: 1
    },
    "& > hr": {
      height: "auto",
      minHeight: "auto"
    }
  }
}));

const SearchView = styled(({ className }) => {
  const { id } = useParams();

  return (
    <ContentView className={`SearchView ${className}`}>
      <SearchResults />
      <Divider
        sx={{ borderColor: "#E2E8EE" }}
        orientation="vertical"
      />
      <LogDetailsContainer id={id} />
    </ContentView>
  );
})({
  "& > *": {
    minWidth: 0
  }
});

export default SearchView;
