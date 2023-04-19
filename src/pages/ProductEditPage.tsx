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
import AddIcon from "@mui/icons-material/Add";
import { AddButton } from "../components/AddButton";
import { DisplayProduct } from "../components/ProductDisplay";

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
    <DisplayProduct
      product={item}
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
          <AddButton
            onClick={() => {
              setIsAddOpen(true);
            }}
          />
        </Grid>
      </Box>
    </Container>
  );
}
