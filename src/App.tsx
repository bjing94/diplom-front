import "./App.css";
import MenuPage from "./pages/MenuPage";
import OrderMonitorPage from "./pages/OrderTablePage";
import {
  BrowserRouter,
  createBrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import KitchenPage from "./pages/KitchenPage";
import OrderPackagePage from "./pages/OrderPage";
import PayPage from "./pages/PayPage";
import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MonitorIcon from "@mui/icons-material/Monitor";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WidgetsIcon from "@mui/icons-material/Widgets";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import LoopIcon from "@mui/icons-material/Loop";

import MenuEditPage from "./pages/MenuEditPage";
import EventsPage from "./pages/EventsPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ProductEditPage from "./pages/ProductEditPage";
import ObjectEventsPage from "./pages/ObjectLifecyclePage";

const drawerWidth = 240;
function PermanentDrawerLeft() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Link to="/">
          <Typography fontWeight={"bold"} variant="h5">
            Администратор
          </Typography>
        </Link>
      </Toolbar>
      <Divider />
      <List>
        <ListItem key={"orders-manage"} disablePadding>
          <Link to="/orders/package">
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Сборка заказов"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key={"orders-monitor"} disablePadding>
          <Link to="/orders/monitor">
            <ListItemButton>
              <ListItemIcon>
                <MonitorIcon />
              </ListItemIcon>
              <ListItemText primary={"Монитор заказов"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key={"kitchen"} disablePadding>
          <Link to="/kitchen">
            <ListItemButton>
              <ListItemIcon>
                <WhatshotIcon />
              </ListItemIcon>
              <ListItemText primary={"Кухня"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key={"menu-edit"} disablePadding>
          <Link to="/menu-edit">
            <ListItemButton>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary={"Редактировать меню"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key={"events"} disablePadding>
          <Link to="/events">
            <ListItemButton>
              <ListItemIcon>
                <WidgetsIcon />
              </ListItemIcon>
              <ListItemText primary={"Хранилище событий"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key={"product"} disablePadding>
          <Link to="/product">
            <ListItemButton>
              <ListItemIcon>
                <WarehouseIcon />
              </ListItemIcon>
              <ListItemText primary={"Товары"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key={"lifecycle"} disablePadding>
          <Link to="/lifecycle">
            <ListItemButton>
              <ListItemIcon>
                <LoopIcon />
              </ListItemIcon>
              <ListItemText primary={"Жизненный цикл объекта"} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Drawer>
  );
}

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MenuPage />}></Route>
            <Route path="orders/package" element={<OrderPackagePage />} />
            <Route path="orders/monitor" element={<OrderMonitorPage />} />
            <Route path="kitchen" element={<KitchenPage />} />
            <Route path="pay/:id" element={<PayPage />} />
            <Route path="menu-edit" element={<MenuEditPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="product" element={<ProductEditPage />} />
            <Route path="lifecycle" element={<ObjectEventsPage />} />
          </Routes>
          <PermanentDrawerLeft />
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;
