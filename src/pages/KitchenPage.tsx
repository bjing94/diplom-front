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

const CookingRequestItem = (props: {
  request: CookingRequestGetQueryResponse;
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
              {request.product.name}
            </Typography>
            {request.status === CookingRequestStatus.PENDING && (
              <Button
                onClick={() => {
                  KitchenService.updateRequest({
                    id: request.id,
                    status: CookingRequestStatus.READY,
                  }).then(updateRequests);
                }}
                variant="contained"
              >
                Готово
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default function KitchenPage() {
  const [pendingRequests, setPendingRequests] = useState<
    CookingRequestGetQueryResponse[]
  >([]);

  const getPendingRequests = () => {
    KitchenService.findRequests({ status: CookingRequestStatus.PENDING }).then(
      (response) => {
        setPendingRequests(response.data.requests);
      }
    );
  };

  useEffect(() => {
    updateRequests();
  }, []);

  const updateRequests = () => {
    getPendingRequests();
  };

  const pendingRequestItems = pendingRequests.map((item) => {
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
              <Typography fontWeight={"bold"} variant="h5">
                Требуется приготовить
              </Typography>
            </Box>
          </Grid>
          <Divider variant="fullWidth" />
          {pendingRequestItems}
        </Grid>
      </Box>
    </Container>
  );
}
