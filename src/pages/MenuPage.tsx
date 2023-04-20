import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
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
import { MenuItemDisplay } from "../components/MenuItemDisplay";

interface BasketItem extends OrderItem {
  name: string;
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
  const [sum, setSum] = useState<number>(0);
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
    if (!menu) return;

    const itemFromMenu = menu.items.find((item) => item.id === id);
    if (!itemFromMenu) return;

    const existingItem = basket.find((item) => item.menuItemId === id);
    if (existingItem) {
      existingItem.count += 1;
      setBasket(newBasket);
      setTotal(total + 1);
      setSum(sum + itemFromMenu.price);
      return;
    }
    if (!menu) {
      return;
    }

    setBasket([
      ...newBasket,
      {
        menuItemId: id,
        count: 1,
        name: itemFromMenu.product.name,
      },
    ]);
    setTotal(total + 1);
    setSum(sum + itemFromMenu.price);
  };

  const removeItemFromBasket = (id: string) => {
    const newBasket = [...basket];

    if (!menu) {
      return;
    }
    const itemFromMenu = menu.items.find((item) => item.id === id);
    if (!itemFromMenu) return;

    const existingItem = basket.find((item) => item.menuItemId === id);
    if (existingItem) {
      setTotal(total - 1);
      existingItem.count -= 1;
      if (existingItem.count === 0) {
        setBasket(newBasket.filter((item) => item.menuItemId !== id));
        return;
      }
      setSum(sum - itemFromMenu.price);
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
        <MenuItemDisplay
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
        <Box
          height={"100vh"}
          display="flex"
          flexDirection={"column"}
          position={"relative"}
        >
          <Grid container spacing={2} paddingTop={2}>
            {menuItems}
          </Grid>
          <Box
            paddingTop={"10px"}
            paddingBottom={"30px"}
            borderTop={"solid lightgray 1px"}
            position={"absolute"}
            bottom="0"
            left="0"
            width={"100%"}
          >
            <Grid container alignContent="flex-end" height="fit-content">
              <Divider />
              <Grid item xs={12} height="fit-content">
                <Box display={"flex"} justifyContent={"flex-end"}>
                  <Typography width={"fit-content"} fontWeight={"bold"}>
                    Итого: {sum}
                  </Typography>
                  <Typography width={"fit-content"} marginLeft={"5px"}>
                    Количество: {total}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} height="fit-content">
                <Box display={"flex"} justifyContent={"center"}>
                  <Box margin={"5px"}>
                    <Button
                      variant={"contained"}
                      onClick={() => {
                        setCheckout(true);
                      }}
                      disabled={total === 0}
                    >
                      Оформить заказ
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
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
      <Box
        height={"100vh"}
        display="flex"
        flexDirection={"column"}
        position={"relative"}
      >
        <Grid container spacing={2} paddingTop={2}>
          {checkoutItems}
        </Grid>
        <Box
          paddingTop={"10px"}
          paddingBottom={"30px"}
          borderTop={"solid lightgray 1px"}
          position={"absolute"}
          bottom="0"
          left="0"
          width={"100%"}
        >
          <Grid container alignContent="flex-end" height="fit-content">
            <Divider />
            <Grid item xs={12} height="fit-content">
              <Box display={"flex"} justifyContent={"flex-end"}>
                <Typography width={"fit-content"} fontWeight={"bold"}>
                  Итого: {sum}
                </Typography>
                <Typography width={"fit-content"} marginLeft={"5px"}>
                  Количество: {total}
                </Typography>
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
      </Box>
    </Container>
  );
}
