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
import { AddButton } from "../components/AddButton";
import { DisplayProduct } from "../components/ProductDisplay";

interface BasketItem extends OrderItem {
  name: string;
}

export default function MenuEditPage() {
  const [menu, setMenu] = useState<MenuResponseDto | undefined>(undefined);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<MenuItemResponseDto | undefined>(
    undefined
  );
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    handleGetMenu();
  }, []);

  const menuItems = menu
    ? menu.items.map((item) => (
        <DisplayProduct
          product={item.product}
          onClickEdit={() => {
            setEditedItem(item);
            setIsEditOpen(true);
          }}
          onClickDelete={() => {
            handleRemoveItem(item.id);
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

    MenuService.updateMenu({
      id: menu.id,
      data: {
        active: menu?.active,
        items: itemsUpdate,
      },
    })
      .then((data) => {
        console.log(data);
      })
      .then(handleGetMenu);
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
    }).then(handleGetMenu);
  };

  const handleGetMenu = () => {
    MenuService.getMenu().then((response) => {
      setMenu(response.data.menu);
    });
  };

  const handleRemoveItem = (id: string) => {
    if (!menu) return;

    const itemsUpdate = menu.items
      .filter((item) => item.id !== id)
      .map((item) => {
        return {
          productId: item.product.id,
          price: item.price,
          available: item.available,
        };
      });

    MenuService.updateMenu({
      id: menu.id,
      data: {
        active: menu?.active,
        items: itemsUpdate,
      },
    }).then(handleGetMenu);
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
        {!menu && (
          <Button
            onClick={() => {
              MenuService.createMenu({ items: [] });
            }}
          >
            Создать меню
          </Button>
        )}
        {menu && (
          <Grid container spacing={2} paddingTop={2}>
            {menuItems}
            <AddButton
              onClick={() => {
                setIsAddOpen(true);
              }}
            />
          </Grid>
        )}
      </Box>
    </Container>
  );
}
