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

const CookingRequestItem = (props: {
  request: CookingRequestGetQueryResponse;
}) => {
  const { request } = props;

  return (
    <Grid item xs={12} key={request.id}>
      <Container maxWidth="xs">
        <Card>
          <CardContent>
            <Box height={"40px"}>
              <Typography variant="h5">{request.product?.name}</Typography>
            </Box>
          </CardContent>

          <CardActions>
            <Box height={"40px"}>
              {request.status === CookingRequestStatus.PENDING && (
                <Button
                  onClick={() => {
                    KitchenService.updateRequest({
                      id: request.id,
                      status: CookingRequestStatus.READY,
                    });
                  }}
                  variant="contained"
                >
                  Выполнить
                </Button>
              )}
            </Box>
          </CardActions>
        </Card>
      </Container>
    </Grid>
  );
};
export default function KitchenPage() {
  const [readyRequests, setReadyRequests] = useState<
    CookingRequestGetQueryResponse[]
  >([]);
  const [pendingRequests, setPendingRequests] = useState<
    CookingRequestGetQueryResponse[]
  >([]);

  const getReadyRequests = () => {
    KitchenService.findRequests({ status: CookingRequestStatus.READY }).then(
      (response) => {
        setReadyRequests(response.data.requests);
      }
    );
  };

  const getPendingRequests = () => {
    KitchenService.findRequests({ status: CookingRequestStatus.PENDING }).then(
      (response) => {
        setPendingRequests(response.data.requests);
      }
    );
  };

  useEffect(() => {
    getReadyRequests();
    getPendingRequests();
  }, []);

  const readyRequestItems = readyRequests.map((item) => {
    return <CookingRequestItem request={item} />;
  });

  const pendingRequestItems = pendingRequests.map((item) => {
    return <CookingRequestItem request={item} />;
  });

  return (
    <Container maxWidth="md">
      <Grid container columnSpacing={2}>
        <Grid container item xs={6} rowSpacing={2} height="fit-content">
          <Grid item xs={12}>
            <Box bgcolor={"green"}>
              <Typography variant="h5" textAlign={"center"} color="white">
                Запрос
              </Typography>
            </Box>
          </Grid>
          {pendingRequestItems}
        </Grid>
        <Grid container item xs={6} rowSpacing={2} height="fit-content">
          <Grid item xs={12}>
            <Box bgcolor={"gray"}>
              <Typography variant="h5" textAlign={"center"} color="white">
                Выполнено
              </Typography>
            </Box>
          </Grid>
          {readyRequestItems}
        </Grid>
      </Grid>
    </Container>
  );
}
