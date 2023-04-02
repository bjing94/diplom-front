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
  MenuItemUpdateRequestDto,
  MenuResponseDto,
  ProductResponseDto,
} from "../service/menu/menu.interface";
import MenuService from "../service/menu/menu.service";
import { MenuItemResponseDto } from "../service/menu/menu.interface";
import { OrderItem, PaymentType } from "../service/order.interface";
import OrderService from "../service/order.service";
import MenuEditDialog from "../components/MenuEditDialog";
import PlusOneRoundedIcon from "@mui/icons-material/PlusOneRounded";
import EditIcon from "@mui/icons-material/Edit";
import MenuAddDialog from "../components/MenuAddDialog";
import ProductService from "../service/product/product.service";
import ProductEditDialog from "../components/ProductEditDialog";
import ProductAddDialog from "../components/ProductAddDialog";

function MenuEditItem(props: {
  item: ProductResponseDto;
  onClickEdit: () => void;
}) {
  const { item, onClickEdit } = props;

  return (
    <Grid item xs={6}>
      <Button
        size="small"
        style={{ position: "absolute" }}
        variant="contained"
        onClick={onClickEdit}
      >
        <EditIcon fontSize="small" />
      </Button>
      <img
        width="200px"
        height="200px"
        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80"
        alt={"menu-item"}
      />
      <Typography>{item.name}</Typography>
    </Grid>
  );
}

function MenuAddItem(props: { onClick: () => void }) {
  const { onClick } = props;

  return (
    <Grid item xs={6}>
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          onClick={onClick}
          width={"200px"}
          height={"200px"}
          fontSize={"100px"}
          border={"solid 2px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <PlusOneRoundedIcon fontSize={"inherit"} />
        </Box>
      </Box>
    </Grid>
  );
}

export default function ProductEditPage() {
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    ProductService.getAllProducts({
      take: `100`,
      skip: `0`,
    }).then((response) => {
      setProducts(response.data.products);
    });
  }, []);

  const menuItems = products.map((item) => (
    <MenuEditItem
      item={item}
      onClickEdit={() => {
        setProductId(item.id);
        setIsEditOpen(true);
      }}
    />
  ));

  return (
    <Container maxWidth={"sm"}>
      <ProductEditDialog
        isOpen={isEditOpen}
        onClose={() => {
          setProductId("");
          setIsEditOpen(false);
        }}
        id={productId}
      />
      <ProductAddDialog
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
        }}
      />
      <Box height={"100vh"} display="flex" flexDirection={"column"}>
        <Grid container spacing={2} paddingTop={2}>
          {menuItems}
          <MenuAddItem
            onClick={() => {
              setIsAddOpen(true);
            }}
          />
        </Grid>
      </Box>
    </Container>
  );
}
