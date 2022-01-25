import React, { useEffect, useState, FunctionComponent } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import styles from "../styles/SideBar.module.css";
import Divider from "@mui/material/Divider";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IUser } from "../pages/_app";
import Image from "next/image";
import { Typography } from "@mui/material";
import { width } from "@mui/system";

interface IProps {
  token: string | null;
  theme: any;
}
const drawerWidth = "22%";

const url = "http://localhost:4000/";
const SideBar: FunctionComponent<IProps> = ({ theme, token }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const getUsers = async () => {
    const Users = await axios.get(url + "getallusers", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    if (Users) setUsers(Users.data);
  };
  useEffect(() => {
    getUsers();
  }, [users]);
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Drawer
        sx={{
          width: "100%",
          position: "fixed",
          top: "0",
          "& .MuiDrawer-paper": {
            backgroundColor: "#79b4b7",
            border: "none",
            position: "absolute",
            height: "100vh",
            width: drawerWidth,
            boxSizing: "border-box",
            color: theme.palette.secondary.contrastText,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List sx={{ marginTop: "30%", position: "sticky" }}>
          <Typography variant="h6" className={styles.sidebarTitle}>
            People
          </Typography>
          <Divider />
          {users?.map((user, i) => (
            <div key={i.toString()}>
              <ListItem key={i.toString()} className={styles.listItem}>
                <Image
                  src={user.picture}
                  alt="user-image"
                  width={25}
                  height={25}
                  className={styles.userImage}
                />
                <ListItemText className={styles.userName}>
                  {user.name}
                  <ArrowForwardIosIcon />
                </ListItemText>
              </ListItem>
            </div>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
