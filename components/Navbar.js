import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SettingsIcon from "@mui/icons-material/Settings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <div>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          top: "50%",
          left: open ? 240 : 0,
          transform: "translateY(-50%)",
          zIndex: 1300,
          backgroundColor: "white",
          borderRadius: "0 4px 4px 0",
        }}
      >
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>

      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ width: 240 }}>
          <Typography
            variant="h6"
            sx={{ padding: 2, textAlign: "center", alignItems: "center" }}
          >
            PAKCS - Gestion des stocks
          </Typography>

          <Divider orientation="horizontal" variant="middle">
            <Typography variant="body1">Fonctions</Typography>
          </Divider>

          <List>
            <Link
              href="/"
              passHref
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Accueil" />
              </ListItem>
            </Link>
            <Link
              href="/references"
              passHref
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <DirectionsCarIcon />
                </ListItemIcon>
                <ListItemText primary="Références" />
              </ListItem>
            </Link>
            <Link
              href="/mouvements"
              passHref
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Mouvements" />
              </ListItem>
            </Link>
            <Link
              href="/inventaire"
              passHref
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <CreditCardIcon />
                </ListItemIcon>
                <ListItemText primary="Inventaire" />
              </ListItem>
            </Link>
          </List>

          <Divider orientation="horizontal" variant="middle" sx={{ mt: 2 }} />

          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Déconnexion
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignText: "center",
            }}
          >
            <Typography sx={{ mt: 2, color: "#555" }} variant="body1">
              @ PAKCS - 2024
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default Navbar;
