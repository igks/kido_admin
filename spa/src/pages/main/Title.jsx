import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Box, Button, Card } from "@mui/material";
import { Edit } from "@mui/icons-material";
import Spacer from "../../components/shared/commons/Spacer";
import * as Colors from "../../constants/colors";

const Title = () => {
  const history = useHistory();
  const titles = ["Title 1", "Title 2"];

  const addTitle = () => {
    history.push("/form-title");
  };

  const editTitle = (id) => {
    history.push("/form-title", { id: id });
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: 5 }}
      >
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: "bold",
            color: Colors.textPrimary,
          }}
        >
          Titles
        </Typography>
        <Box sx={{ heigh: 40 }}>
          <Button variant="contained" size="small" onClick={addTitle}>
            Add New
          </Button>
        </Box>
      </Box>
      {titles.map((title, index) => (
        <Box
          key={`title-${index}`}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <Card
            sx={{ padding: 2, marginBottom: 3, width: "100%" }}
            onClick={() => {}}
          >
            {title}
          </Card>
          <Spacer width={10} />
          <Button
            variant="contained"
            size="small"
            color="warning"
            onClick={() => editTitle(1)}
            sx={{ width: 5 }}
          >
            <Edit />
          </Button>
        </Box>
      ))}
    </>
  );
};

export default Title;
