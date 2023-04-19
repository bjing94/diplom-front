import { Grid, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export function AddButton(props: { onClick: () => void }) {
  const { onClick } = props;

  return (
    <Grid item xs={6}>
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          onClick={onClick}
          width={"200px"}
          height={"200px"}
          fontSize={"100px"}
          border={"solid 2px lightgray"}
          borderRadius={"50%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <AddIcon fontSize={"inherit"} htmlColor="lightgray" />
        </Box>
      </Box>
    </Grid>
  );
}
