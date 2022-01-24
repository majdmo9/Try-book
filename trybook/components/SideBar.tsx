import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import styles from "../styles/SideBar.module.css";
import Divider from "@mui/material/Divider";
const drawerWidth = "18%";

const users = [
  "Majd",
  "Adi",
  "Loay",
  "Ward",
  "Adnan",
  "Kareem",
  "Samer",
  "Hani",
  "Roshdi",
];
const SideBar = ({ theme }: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "sticky",
      }}
    >
      <Drawer
        sx={{
          width: drawerWidth,

          "& .MuiDrawer-paper": {
            border: "none",
            position: "absolute",
            marginTop: "-.2vh",
            height: "100vh",
            width: drawerWidth,
            boxSizing: "border-box",
            color: theme.palette.secondary.main,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {users.map((text, i) => (
            <div key={i.toString()}>
              <ListItem key={i.toString()} className={styles.listItem}>
                <ListItemText>{text}</ListItemText>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
