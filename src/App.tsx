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
import MailIcon from "@mui/icons-material/Mail";
import MenuEditPage from "./pages/MenuEditPage";
import EventsPage from "./pages/EventsPage";

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
        <Typography fontWeight={"bold"} variant="h5">
          Администратор
        </Typography>
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
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Монитор заказов"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key={"kitchen"} disablePadding>
          <Link to="/kitchen">
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Кухня"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key={"menu-edit"} disablePadding>
          <Link to="/menu-edit">
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Редактировать меню"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key={"events"} disablePadding>
          <Link to="/events">
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Хранилище событий"} />
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MenuPage />}></Route>
          <Route path="orders/package" element={<OrderPackagePage />} />
          <Route path="orders/monitor" element={<OrderMonitorPage />} />
          <Route path="kitchen" element={<KitchenPage />} />
          <Route path="pay/:id" element={<PayPage />} />
          <Route path="menu-edit" element={<MenuEditPage />} />
          <Route path="events" element={<EventsPage />} />
        </Routes>
        <PermanentDrawerLeft />
      </BrowserRouter>
    </div>
  );
}

export default App;
