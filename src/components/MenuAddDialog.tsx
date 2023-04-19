import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
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
  MenuItemUpdateRequestDto,
  ProductResponseDto,
} from "../service/menu/menu.interface";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import ProductService from "../service/product/product.service";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MenuAddDialog(props: {
  isOpen: boolean;
  onClose: () => void;
  onMenuItemAdd: (data: MenuItemUpdateRequestDto) => void;
}) {
  const { isOpen, onClose, onMenuItemAdd: onMenuItemUpdate } = props;
  const [price, setPrice] = useState(100);
  const [active, setActive] = useState(true);
  const [productId, setProductId] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductResponseDto[]>([]);

  useEffect(() => {
    ProductService.getAllProducts({
      take: `5`,
      skip: `0`,
    }).then((data) => {
      setProducts(data.data.products);
    });
  }, []);

  const menuItems = products.map((product) => {
    return <MenuItem value={product.id}>{product.name}</MenuItem>;
  });
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
              Добавить в меню
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                if (!productId) return;
                onMenuItemUpdate({
                  productId: productId,
                  price: price,
                  available: active,
                });
                onClose();
              }}
            >
              Сохранить
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <TextField
              label="Цена"
              value={price}
              onChange={(event) => {
                setPrice(+event.target.value);
              }}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <FormControlLabel
              control={<Switch checked={active} />}
              onClick={() => {
                setActive(!active);
              }}
              label="Активность"
              labelPlacement="top"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Продукт</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productId}
                label="Продукт"
                onChange={(event) => {
                  setProductId(event.target.value);
                }}
              >
                {menuItems}
              </Select>
            </FormControl>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
