import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  CookingRequestGetQueryResponse,
  CookingRequestStatus,
} from "../service/kitchen/kitchen.interface";
import KitchenService from "../service/kitchen/kitchen.service";
import {
  OrderFindQueryResponse,
  OrderFindSingle,
  OrderStatus,
} from "../service/order.interface";
import OrderService from "../service/order.service";

const CookingRequestItem = (props: {
  request: OrderFindSingle;
  updateRequests: () => void;
}) => {
  const { request, updateRequests } = props;

  return (
    <Grid item xs={12} key={request.id}>
      <Card>
        <CardContent>
          <Box
            marginTop="5px"
            marginBottom="5px"
            display="flex"
            justifyContent={"space-between"}
          >
            <Typography variant="h6" textAlign={"start"}>
              Заказ № {request.id}
            </Typography>
            {request.status === OrderStatus.PAYED && (
              <Button
                onClick={() => {
                  OrderService.updateOrder({
                    id: request.id,
                    status: OrderStatus.WAITING_FOR_PICKUP,
                  }).then(updateRequests);
                }}
                variant="contained"
              >
                Собрать
              </Button>
            )}
            {request.status === OrderStatus.WAITING_FOR_PICKUP && (
              <Button
                onClick={() => {
                  OrderService.updateOrder({
                    id: request.id,
                    status: OrderStatus.COMPLETED,
                  }).then(updateRequests);
                }}
                variant="contained"
              >
                Выдать
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default function OrderPackagePage() {
  const [readyOrders, setReadyOrders] = useState<OrderFindSingle[]>([]);
  const [payedOrders, setPayedOrders] = useState<OrderFindSingle[]>([]);
  const [category, setCategory] = useState("package");

  const getReadyRequests = () => {
    OrderService.findOrders({ status: OrderStatus.PAYED }).then((response) => {
      setPayedOrders(response.data.orders);
    });
  };

  const getPendingRequests = () => {
    OrderService.findOrders({ status: OrderStatus.WAITING_FOR_PICKUP }).then(
      (response) => {
        setReadyOrders(response.data.orders);
      }
    );
  };

  useEffect(() => {
    updateRequests();
  }, []);

  const updateRequests = () => {
    getReadyRequests();
    getPendingRequests();
  };

  const readyRequestItems = readyOrders.map((item) => {
    return (
      <CookingRequestItem updateRequests={updateRequests} request={item} />
    );
  });

  const pendingRequestItems = payedOrders.map((item) => {
    return (
      <CookingRequestItem updateRequests={updateRequests} request={item} />
    );
  });

  return (
    <Container maxWidth="lg">
      <Box marginTop={"10px"}>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item xs={12}>
            <Box display={"flex"}>
              <Button
                style={{
                  backgroundColor: category === "package" ? "blue" : "gray",
                  marginRight: "5px",
                }}
                onClick={() => {
                  setCategory("package");
                }}
                variant="contained"
              >
                К сборке
              </Button>
              <Button
                style={{
                  backgroundColor: category === "pickup" ? "blue" : "gray",
                }}
                onClick={() => {
                  setCategory("pickup");
                }}
                variant="contained"
              >
                К выдаче
              </Button>
            </Box>
          </Grid>
          {category === "package" ? pendingRequestItems : readyRequestItems}
        </Grid>
      </Box>
    </Container>
  );
}
