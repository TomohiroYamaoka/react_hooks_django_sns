import React, { useState, useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { Button } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { RiMailAddLine } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(3),
  },
}));

export const Ask = () => {
  const classes = useStyles();
  Modal;
  return <div></div>;
};
