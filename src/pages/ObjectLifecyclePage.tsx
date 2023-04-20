import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventResponse } from "../service/event/event.interface";
import EventService from "../service/event/event.service";
import { translateEvents } from "../service/event/event-translate";
import { CategoryType } from "./EventsPage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const titleText: Record<any, string> = {
  order: "Заказ",
  product: "Товар",
  payment: "Платеж",
  "cooking-request": "Заявка на приготовление блюда",
  "cooking-stock": "Запас",
  menu: "Меню",
};

function syntaxHighlight(json: string) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match: any) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}

export default function ObjectEventsPage() {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [category, setCategory] = useState<string>("order");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    if (id === "") return;
    if (category === CategoryType.order) {
      EventService.getOrderEvents({ id }).then((response) => {
        setEvents(response.data);
      });
    }
    if (category === CategoryType.product) {
      EventService.getProductEvents({ id }).then((response) => {
        setEvents(response.data);
      });
    }
    if (category === CategoryType.cookingRequest) {
      EventService.getCookingRequest({ id }).then((response) => {
        setEvents(response.data);
      });
    }
    if (category === CategoryType.cookingStock) {
      EventService.getCookingStockEvents({ id }).then((response) => {
        setEvents(response.data);
      });
    }

    if (category === CategoryType.payment) {
      EventService.getPaymentEvents({ id }).then((response) => {
        setEvents(response.data);
      });
    }

    if (category === CategoryType.menu) {
      EventService.getMenuEvents({ id }).then((response) => {
        setEvents(response.data);
      });
    }
  }, [category, id]);

  const eventElements = events.map((item) => {
    return (
      <Grid item xs={12}>
        <Card style={{ width: "100%", padding: "5px" }}>
          <Typography fontWeight={"bold"}>
            {translateEvents[item.name]}
          </Typography>
          <Typography>
            {new Date(item.createdAt).toLocaleDateString("RU", {
              minute: "numeric",
              hour: "numeric",
              second: "numeric",
            })}
          </Typography>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Подробнее</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <pre
                dangerouslySetInnerHTML={{
                  __html: syntaxHighlight(
                    JSON.stringify(JSON.parse(item.payload), undefined, 4)
                  ),
                }}
              />
            </AccordionDetails>
          </Accordion>
        </Card>
      </Grid>
    );
  });
  return (
    <Container maxWidth={"sm"}>
      <Grid container spacing={"20px"}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Категория</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Категория"
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              <MenuItem value={"order"}>Заказы</MenuItem>
              <MenuItem value={"product"}>Товары</MenuItem>
              <MenuItem value={"menu"}>Меню</MenuItem>
              <MenuItem value={"payment"}>Платежи</MenuItem>
              <MenuItem value={"cooking-request"}>
                Заявки на приготовление блюда
              </MenuItem>
              <MenuItem value={"cooking-stock"}>Запасы</MenuItem>
            </Select>

            <TextField
              label="ID объекта"
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
              margin="normal"
            />
          </FormControl>
        </Grid>
        {eventElements.length > 0 ? (
          (
            <Grid item xs={12}>
              <Typography fontWeight={"bold"} variant="h4">
                {titleText[category]} {id}
              </Typography>
            </Grid>
          ) && eventElements
        ) : (
          <Box display={"flex"} justifyContent={"center"} width="100%">
            <Box
              bgcolor={"#ff3333"}
              color="#eaeaea"
              padding={"10px 25px"}
              borderRadius={"10px"}
            >
              <Typography variant="h5">Объект не найден</Typography>
            </Box>
          </Box>
        )}
      </Grid>
    </Container>
  );
}
