import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Typography, Box, Button, Card } from "@mui/material";
import { Edit } from "@mui/icons-material";
import Spacer from "../../components/shared/commons/Spacer";
import * as Colors from "../../constants/colors";
import { getByTitle } from "../../services/content-service";

const Content = () => {
  const history = useHistory();
  const [contents, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadContent = async () => {
    let id = history.location.state?.id;
    if (id != null) {
      let response = await getByTitle(id);
      if (response?.success) {
        setContent(response.data.data);
        setIsLoading(false);
      }
    }
  };

  const addTitle = () => {
    history.push("/form-content");
  };

  const editTitle = (id) => {
    history.push("/form-content", { id: id });
  };

  useEffect(() => {
    loadContent();
  }, []);

  return (
    <>
      {isLoading ? (
        <h3>Waiting...</h3>
      ) : (
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
              Contents
            </Typography>
            <Box sx={{ heigh: 40 }}>
              <Button
                variant="contained"
                size="small"
                color="warning"
                onClick={() =>
                  history.push("/titles", { id: history.location.state?.id })
                }
                sx={{ marginRight: 3 }}
              >
                Back
              </Button>
              <Button variant="contained" size="small" onClick={() => {}}>
                Add New
              </Button>
            </Box>
          </Box>
          {contents.length > 0 &&
            contents.map((content, index) => (
              <Box
                key={`content-${index}`}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="start"
              >
                <Card
                  sx={{ padding: 2, marginBottom: 3, width: "100%" }}
                  onClick={() => {}}
                >
                  {content.mantram}
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
      )}
    </>
  );
};

export default Content;
