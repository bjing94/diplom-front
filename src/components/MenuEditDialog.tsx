import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  MenuItemResponseDto,
  MenuItemUpdateRequestDto,
} from "../service/menu/menu.interface";
import { FormControlLabel, Input, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MenuEditDialog(props: {
  isOpen: boolean;
  onClose: () => void;
  onMenuItemUpdate: (data: MenuItemUpdateRequestDto) => void;
  item?: MenuItemResponseDto;
}) {
  const { isOpen, item, onClose, onMenuItemUpdate } = props;
  const [price, setPrice] = useState(props.item?.price ?? 0);
  const [active, setActive] = useState(props.item?.available ?? false);

  useEffect(() => {
    if (!item) return;

    setPrice(item?.price);
    setActive(item?.available);
  }, [item]);

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
              {item?.product.name}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                if (item) {
                  onMenuItemUpdate({
                    productId: item.product.id,
                    price: price,
                    available: active,
                  });
                }
              }}
            >
              Сохранить
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <Divider />
          <ListItem button>
            <TextField label="Цена" value={price} />
          </ListItem>
          <Divider />
          <ListItem button>
            <FormControlLabel
              control={<Switch checked={active} />}
              onClick={() => {
                setActive(!active);
              }}
              label="Активность"
              labelPlacement="top"
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}