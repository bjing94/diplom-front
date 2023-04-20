import {
  Grid,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";
import {
  MenuItemResponseDto,
  ProductResponseDto,
} from "../service/menu/menu.interface";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export function MenuItemDisplay(props: {
  item: MenuItemResponseDto;
  onAdd: () => any;
  onRemove: () => any;
}) {
  const { item, onAdd, onRemove } = props;
  const { product } = item;
  const [count, setCount] = useState(0);
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
          <Box display={"flex"} justifyContent={"center"} width={"100%"}>
            {count === 0 && (
              <Button
                variant={"contained"}
                onClick={() => {
                  onAdd();
                  setCount(count + 1);
                }}
              >
                Добавить
              </Button>
            )}
            {count > 0 && (
              <Box
                display={"flex"}
                alignItems="center"
                justifyContent={"center"}
              >
                <Button
                  onClick={() => {
                    onRemove();
                    setCount(count - 1);
                  }}
                >
                  -
                </Button>
                <Typography>{count}</Typography>
                <Button
                  onClick={() => {
                    onAdd();
                    setCount(count + 1);
                  }}
                >
                  +
                </Button>
              </Box>
            )}
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}
