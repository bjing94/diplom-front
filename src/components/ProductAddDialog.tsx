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
import { useState } from "react";
import ProductService from "../service/product/product.service";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductAddDialog(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isOpen, onClose } = props;
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleCreateProduct = () => {
    return ProductService.create({
      name: name,
      imgLink: link,
    }).then(() => {
      onClose();
    });
  };

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
              Добавить товар
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCreateProduct}>
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
          <ListItem>
            <TextField
              label="Ссылка на изображение товара"
              value={link}
              onChange={(event) => {
                setLink(event.target.value);
              }}
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
