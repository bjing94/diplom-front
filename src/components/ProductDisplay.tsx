import {
  Grid,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
} from "@mui/material";
import { ProductResponseDto } from "../service/menu/menu.interface";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export function DisplayProduct(props: {
  product: ProductResponseDto;
  onClickEdit: () => void;
  onClickDelete?: () => void;
}) {
  const { product, onClickEdit, onClickDelete } = props;
  return (
    <Grid item xs={6}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={product.name} />
        <CardMedia
          component="img"
          height="194"
          image={product.imgLink}
          alt="Paella dish"
        />
        <CardActions>
          <Button
            size="small"
            style={{
              height: "30px",
              width: "30px",
            }}
            variant="contained"
            onClick={onClickEdit}
          >
            <EditIcon fontSize="small" />
          </Button>
          {onClickDelete && (
            <Button
              size="small"
              style={{
                height: "30px",
                width: "30px",
              }}
              variant="contained"
              color="error"
              onClick={onClickDelete}
            >
              <DeleteIcon fontSize="small" />
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
