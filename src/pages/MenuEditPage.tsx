import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  MenuGetQueryResponse,
  MenuItemUpdateRequestDto,
  MenuResponseDto,
} from "../service/menu/menu.interface";
import MenuService from "../service/menu/menu.service";
import { MenuItemResponseDto } from "../service/menu/menu.interface";
import { OrderItem, PaymentType } from "../service/order.interface";
import OrderService from "../service/order.service";
import MenuEditDialog from "../components/MenuEditDialog";
import PlusOneRoundedIcon from "@mui/icons-material/PlusOneRounded";
import EditIcon from "@mui/icons-material/Edit";
import MenuAddDialog from "../components/MenuAddDialog";

interface BasketItem extends OrderItem {
  name: string;
}
function MenuEditItem(props: {
  item: MenuItemResponseDto;
  onClickEdit: () => void;
}) {
  const { item, onClickEdit } = props;

  return (
    <Grid item xs={6}>
      <Button
        size="small"
        style={{ position: "absolute" }}
        variant="contained"
        onClick={onClickEdit}
      >
        <EditIcon fontSize="small" />
      </Button>
      <img
        width="200px"
        height="200px"
        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80"
        alt={"menu-item"}
      />
      <Typography>{item.product.name}</Typography>
    </Grid>
  );
}

function MenuAddItem(props: { onClick: () => void }) {
  const { onClick } = props;

  return (
    <Grid item xs={6}>
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          onClick={onClick}
          width={"200px"}
          height={"200px"}
          fontSize={"100px"}
          border={"solid 2px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <PlusOneRoundedIcon fontSize={"inherit"} />
        </Box>
      </Box>
    </Grid>
  );
}

export default function MenuEditPage() {
  const [menu, setMenu] = useState<MenuResponseDto | undefined>(undefined);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<MenuItemResponseDto | undefined>(
    undefined
  );
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    MenuService.getMenu().then((response) => {
      setMenu(response.data.menu);
    });
  }, []);

  const menuItems = menu
    ? menu.items.map((item) => (
        <MenuEditItem
          item={item}
          onClickEdit={() => {
            setEditedItem(item);
            setIsEditOpen(true);
          }}
        />
      ))
    : [];

  const handleMenuUpdate = (data: MenuItemUpdateRequestDto) => {
    if (!menu) return;

    const itemsUpdate = menu.items.map((item) => {
      if (item.product.id === data.productId) {
        return data;
      }
      return {
        productId: item.product.id,
        price: item.price,
        available: item.available,
      };
    });
    console.log(itemsUpdate);

    MenuService.updateMenu({
      id: menu.id,
      data: {
        active: menu?.active,
        items: itemsUpdate,
      },
    }).then((data) => {
      console.log(data);
    });
  };

  const handleAddItem = (data: MenuItemUpdateRequestDto) => {
    if (!menu) return;

    const itemsUpdate = menu.items.map((item) => {
      return {
        productId: item.product.id,
        price: item.price,
        available: item.available,
      };
    });
    itemsUpdate.push(data);

    MenuService.updateMenu({
      id: menu.id,
      data: {
        active: menu?.active,
        items: itemsUpdate,
      },
    });
  };
  return (
    <Container maxWidth={"sm"}>
      <MenuEditDialog
        isOpen={isEditOpen}
        item={editedItem}
        onClose={() => {
          setEditedItem(undefined);
          setIsEditOpen(false);
        }}
        onMenuItemUpdate={handleMenuUpdate}
      />
      <MenuAddDialog
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
        }}
        onMenuItemAdd={handleAddItem}
      />
      <Box height={"100vh"} display="flex" flexDirection={"column"}>
        <Grid container spacing={2} paddingTop={2}>
          {menuItems}
          <MenuAddItem
            onClick={() => {
              setIsAddOpen(true);
            }}
          />
        </Grid>
      </Box>
    </Container>
  );
}
