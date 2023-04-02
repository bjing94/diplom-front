import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
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
import { EventResponse } from "../service/event/event.interface";
import EventService from "../service/event/event.service";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "objectId",
    headerName: "Id объекта",
    width: 150,
  },
  {
    field: "name",
    headerName: "Название события",
    width: 150,
  },
  {
    field: "payload",
    headerName: "Данные события",
    type: "number",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Дата создания",
    width: 260,
  },
  {
    field: "updatedAt",
    headerName: "Дата обновления",
    width: 260,
  },
];

enum CategoryType {
  order = "order",
  product = "product",
  cookingStock = "cooking-stock",
  cookingRequest = "cooking-request",
  payment = "payment",
  menu = "menu",
}
export default function EventsPage() {
  const [orderEvents, setOrderEvents] = useState<EventResponse[]>([]);
  const [category, setCategory] = useState<CategoryType>(CategoryType.order);

  useEffect(() => {
    if (category === CategoryType.order) {
      EventService.getOrderEvents({
        from: new Date("2023-03-02"),
        to: new Date("2023-04-02"),
      }).then((response) => {
        setOrderEvents(response.data);
      });
    }
    if (category === CategoryType.product) {
      EventService.getProductEvents({
        from: new Date("2023-03-02"),
        to: new Date("2023-04-02"),
      }).then((response) => {
        setOrderEvents(response.data);
      });
    }
    if (category === CategoryType.cookingRequest) {
      EventService.getCookingRequest({
        from: new Date("2023-03-02"),
        to: new Date("2023-04-02"),
      }).then((response) => {
        setOrderEvents(response.data);
      });
    }
    if (category === CategoryType.cookingStock) {
      EventService.getCookingStockEvents({
        from: new Date("2023-03-02"),
        to: new Date("2023-04-02"),
      }).then((response) => {
        setOrderEvents(response.data);
      });
    }

    if (category === CategoryType.payment) {
      EventService.getPaymentEvents({
        from: new Date("2023-03-02"),
        to: new Date("2023-04-02"),
      }).then((response) => {
        setOrderEvents(response.data);
      });
    }

    if (category === CategoryType.menu) {
      EventService.getMenuEvents({
        from: new Date("2023-03-02"),
        to: new Date("2023-04-02"),
      }).then((response) => {
        setOrderEvents(response.data);
      });
    }
  }, [category]);

  return (
    <Container maxWidth="lg">
      <Box marginTop={"10px"}>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item xs={12}>
            <Box display={"flex"}>
              <Typography fontWeight={"bold"} variant="h5">
                Хранилище событий
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display={"flex"}>
              <Button
                style={{
                  backgroundColor:
                    category === CategoryType.order ? "blue" : "gray",
                  marginRight: "5px",
                }}
                onClick={() => {
                  setCategory(CategoryType.order);
                }}
                variant="contained"
              >
                Заказы
              </Button>
              <Button
                style={{
                  backgroundColor:
                    category === CategoryType.product ? "blue" : "gray",
                  marginRight: "5px",
                }}
                onClick={() => {
                  setCategory(CategoryType.product);
                }}
                variant="contained"
              >
                Товары
              </Button>
              <Button
                style={{
                  backgroundColor:
                    category === CategoryType.payment ? "blue" : "gray",
                  marginRight: "5px",
                }}
                onClick={() => {
                  setCategory(CategoryType.payment);
                }}
                variant="contained"
              >
                Оплата
              </Button>
              <Button
                style={{
                  backgroundColor:
                    category === CategoryType.menu ? "blue" : "gray",
                  marginRight: "5px",
                }}
                onClick={() => {
                  setCategory(CategoryType.menu);
                }}
                variant="contained"
              >
                Меню
              </Button>
              <Button
                style={{
                  backgroundColor:
                    category === CategoryType.cookingRequest ? "blue" : "gray",
                }}
                onClick={() => {
                  setCategory(CategoryType.cookingRequest);
                }}
                variant="contained"
              >
                Готовка
              </Button>
            </Box>
          </Grid>
          <Divider variant="fullWidth" />
          <Grid item xs={12}>
            <Box sx={{ height: 800, width: "100%" }}>
              <DataGrid
                rows={orderEvents}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 15,
                    },
                  },
                }}
                pageSizeOptions={[15]}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
