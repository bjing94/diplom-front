import { Box, Card, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventResponse } from "../service/event/event.interface";
import EventService from "../service/event/event.service";

export default function ObjectEventsPage() {
  const { id } = useParams();

  const [events, setEvents] = useState<EventResponse[]>([]);

  useEffect(() => {
    EventService.getOrderEvents({ id: "643bd7dbf8b8429c64737a6e" }).then(
      (response) => {
        console.log(response);
        setEvents(response.data);
      }
    );
  }, []);

  const eventElements = events.map((item) => {
    return (
      <Grid item xs={12}>
        <Card style={{ width: "100%", padding: "5px" }}>
          <Typography fontWeight={"bold"}>{item.name}</Typography>
          <Typography>{item.createdAt.toString()}</Typography>
        </Card>
      </Grid>
    );
  });
  return (
    <Container maxWidth={"sm"}>
      <Grid container spacing={"20px"}>
        <Grid item xs={12}>
          <Typography fontWeight={"bold"} variant="h4">
            Заказ номер 643bd7dbf8b8429c64737a6e
          </Typography>
        </Grid>
        {eventElements}
      </Grid>
    </Container>
  );
}
