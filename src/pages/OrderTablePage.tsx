import { Container, Grid, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { OrderFindSingle, OrderStatus } from "../service/order.interface";
import OrderService from "../service/order.service";

export default function OrderMonitorPage() {
  const [ordersPreparing, setOrdersPreparing] = useState<OrderFindSingle[]>([]);
  const [ordersReady, setOrdersReady] = useState<OrderFindSingle[]>([]);

  useEffect(() => {
    OrderService.findOrders({ status: OrderStatus.CREATED }).then((data) => {
      setOrdersPreparing(data.data.orders);
    });
    OrderService.findOrders({ status: OrderStatus.WAITING_FOR_PICKUP }).then(
      (data) => {
        setOrdersReady(data.data.orders);
      }
    );
  }, []);

  const orderPreparingElements = ordersPreparing.map((order) => {
    return (
      <Typography fontWeight={"bold"} marginBottom={"5px"}>
        {order.id}
      </Typography>
    );
  });

  const orderReadyElements = ordersReady.map((order) => {
    return <Typography>{order.id}</Typography>;
  });

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box bgcolor={"gray"} height="50px">
            <Typography color={"white"} lineHeight="50px" fontWeight={"bold"}>
              Готовятся
            </Typography>
          </Box>
          {orderPreparingElements}
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor={"green"}>
            <Typography color={"white"} lineHeight="50px" fontWeight={"bold"}>
              Готовы к выдаче
            </Typography>
          </Box>
          {orderReadyElements}
        </Grid>
      </Grid>
    </Container>
  );
}
