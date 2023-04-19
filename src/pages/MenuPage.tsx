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
  MenuResponseDto,
} from "../service/menu/menu.interface";
import MenuService from "../service/menu/menu.service";
import { MenuItemResponseDto } from "../service/menu/menu.interface";
import { OrderItem, PaymentType } from "../service/order.interface";
import OrderService from "../service/order.service";
import { Link } from "react-router-dom";

interface BasketItem extends OrderItem {
  name: string;
}
function MenuItem(props: {
  item: MenuItemResponseDto;
  onAdd: () => any;
  onRemove: () => any;
}) {
  const { item, onAdd, onRemove } = props;
  const [count, setCount] = useState(0);

  return (
    <Grid item xs={6}>
      <img
        width="200px"
        height="200px"
        src={item.product.imgLink}
        alt={"menu-item"}
      />
      <Typography>{item.product.name}</Typography>
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
        <Box display={"flex"} alignItems="center" justifyContent={"center"}>
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
    </Grid>
  );
}

function CheckoutItem(props: {
  item: BasketItem;
  remove: (id: string) => void;
  add: (id: string) => void;
}) {
  const { item, remove, add } = props;

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h5">{item.name}</Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              remove(item.menuItemId);
            }}
            variant="contained"
          >
            -
          </Button>
          <Typography margin={"10px"}>{item.count}</Typography>
          <Button
            onClick={() => {
              add(item.menuItemId);
            }}
            variant="contained"
          >
            +
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuResponseDto | undefined>(undefined);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [checkout, setCheckout] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string | undefined>(undefined);
  const [paymentId, setPaymentId] = useState<string | undefined>(undefined);

  useEffect(() => {
    MenuService.getMenu().then((response) => {
      setMenu(response.data.menu);
    });
  }, []);

  const addItemToBasket = (id: string) => {
    const newBasket = [...basket];

    const existingItem = basket.find((item) => item.menuItemId === id);
    if (existingItem) {
      existingItem.count += 1;
      setBasket(newBasket);
      setTotal(total + 1);
      return;
    }
    if (!menu) {
      return;
    }

    const itemFromMenu = menu.items.find((item) => item.id === id);
    if (!itemFromMenu) return;

    setBasket([
      ...newBasket,
      {
        menuItemId: id,
        count: 1,
        name: itemFromMenu.product.name,
      },
    ]);
    setTotal(total + 1);
  };

  const removeItemFromBasket = (id: string) => {
    const newBasket = [...basket];

    const existingItem = basket.find((item) => item.menuItemId === id);
    if (existingItem) {
      setTotal(total - 1);
      existingItem.count -= 1;
      if (existingItem.count === 0) {
        setBasket(newBasket.filter((item) => item.menuItemId !== id));
        return;
      }
      setBasket(newBasket);
      return;
    }
  };

  const handlerCreateOrder = async () => {
    const response = await OrderService.createOrder({
      orderItems: basket,
      paymentInfo: {
        type: PaymentType.CARD,
      },
    });
    if (!response.data.orderId) return;
    setOrderId(response.data.orderId);
    setPaymentId(response.data.paymentId);
  };

  const menuItems = menu
    ? menu.items.map((item) => (
        <MenuItem
          onAdd={() => addItemToBasket(item.id)}
          onRemove={() => removeItemFromBasket(item.id)}
          item={item}
        />
      ))
    : [];

  if (orderId) {
    return (
      <Container maxWidth={"sm"}>
        <Box height={"100vh"} display="flex" flexDirection={"column"}>
          <Typography>Номер вашего заказа:</Typography>
          <Typography> {orderId}</Typography>
          <Link to={`pay/${paymentId}`}>
            <Button>Перейти к оплате</Button>
          </Link>
        </Box>
      </Container>
    );
  }

  if (!checkout) {
    return (
      <Container maxWidth={"sm"}>
        <Box height={"100vh"} display="flex" flexDirection={"column"}>
          <Grid container spacing={2} paddingTop={2}>
            {menuItems}
          </Grid>
          <Grid container xs={12} alignContent="flex-end">
            <Grid item xs={12} height="fit-content">
              <Box display={"flex"} justifyContent={"flex-end"}>
                <Typography width={"fit-content"}>Всего: 0</Typography>
                <Typography width={"fit-content"}>
                  Количество: {total}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} height="fit-content">
              <Box display={"flex"} justifyContent={"center"}>
                <Box margin={"5px"}>
                  <Button variant={"contained"} color={"secondary"}>
                    Назад
                  </Button>
                </Box>
                <Box margin={"5px"}>
                  <Button
                    variant={"contained"}
                    onClick={() => {
                      setCheckout(true);
                    }}
                  >
                    Оформить заказ
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }

  const checkoutItems = basket.map((item) => {
    return (
      <CheckoutItem
        item={item}
        add={addItemToBasket}
        remove={removeItemFromBasket}
      />
    );
  });

  return (
    <Container maxWidth={"sm"}>
      <Box height={"100vh"} display="flex" flexDirection={"column"}>
        <Typography>Ваш заказ:</Typography>
        <Grid container spacing={2} paddingTop={2}>
          {checkoutItems}
        </Grid>
        <Grid container xs={12} alignContent="flex-end">
          <Grid item xs={12} height="fit-content">
            <Box display={"flex"} justifyContent={"flex-end"}>
              <Typography width={"fit-content"}>Всего: 0</Typography>
              <Typography width={"fit-content"}>Количество: {total}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} height="fit-content">
            <Box display={"flex"} justifyContent={"center"}>
              <Box margin={"5px"}>
                <Button
                  variant={"contained"}
                  onClick={() => {
                    setCheckout(false);
                  }}
                  color={"secondary"}
                >
                  Назад
                </Button>
              </Box>
              <Box margin={"5px"}>
                <Button
                  variant={"contained"}
                  onClick={() => {
                    handlerCreateOrder();
                  }}
                >
                  Оплатить
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
