import { Button, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { OrderStatus, PaymentStatus } from "../service/order.interface";
import OrderService from "../service/order.service";

export default function PayPage() {
  const { id } = useParams();
  return (
    <Container maxWidth="sm">
      <Typography>Нажмите, чтобы оплатить заказ {id}</Typography>
      <Button
        variant="contained"
        onClick={() => {
          if (id)
            OrderService.payOrder({ id, status: PaymentStatus.FULFILLED });
        }}
      >
        Успешная оплата
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          if (id) OrderService.payOrder({ id, status: PaymentStatus.REJECTED });
        }}
      >
        Не успешная оплата
      </Button>
    </Container>
  );
}
