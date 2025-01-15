import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Chip } from "@mui/material";

export const TagChip = ({ value, ...props }) => {
  return (
    <Chip
      label={value}
      aria-label={`has tag ${value}`}
      icon={<LocalOfferIcon sx={{ padding: "1px 0 1px 3px", width: "15px" }} />}
      size="small"
      variant="outlined"
      color="ologOrange"
      {...props}
    />
  );
};
