import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ProductService from "../service/product/product.service";
import { ProductResponseDto } from "../service/menu/menu.interface";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductEditDialog(props: {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}) {
  const { isOpen, onClose, id } = props;
  const [name, setName] = useState("");

  const handleUpdateProduct = () => {
    return ProductService.update({
      name: name,
      id,
    }).then(() => {
      onClose();
    });
  };

  useEffect(() => {
    ProductService.get(id).then((response) => {
      setName(response.data.product.name);
    });
  }, [id]);

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Изменить товар
            </Typography>
            <Button autoFocus color="inherit" onClick={handleUpdateProduct}>
              Сохранить
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <TextField
              label="Имя"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
