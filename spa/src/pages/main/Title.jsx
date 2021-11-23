import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Typography, Box, Button, Card } from "@mui/material";
import { Edit } from "@mui/icons-material";
import Spacer from "../../components/shared/commons/Spacer";
import * as Colors from "../../constants/colors";
import { getByCategory } from "../../services/title-service";

const Title = () => {
  const history = useHistory();
  const [titles, setTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTitles = async () => {
    let id = history.location.state?.id;
    if (id != null) {
      let response = await getByCategory(id);
      if (response?.success) {
        setTitle(response.data.data);
        setIsLoading(false);
      }
    }
  };

  const addTitle = () => {
    history.push("/form-title", { categoryId: history.location.state?.id });
  };

  const editTitle = (id) => {
    history.push("/form-title", {
      id: id,
      categoryId: history.location.state?.id,
    });
  };

  useEffect(() => {
    loadTitles();
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
              Titles
            </Typography>
            <Box sx={{ heigh: 40 }}>
              <Button
                variant="contained"
                size="small"
                color="warning"
                onClick={() => history.push("/dashboard")}
                sx={{ marginRight: 3 }}
              >
                Back
              </Button>
              <Button variant="contained" size="small" onClick={addTitle}>
                Add New
              </Button>
            </Box>
          </Box>
          {titles.length > 0 &&
            titles.map((title, index) => (
              <Box
                key={`title-${index}`}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="start"
              >
                <Card
                  sx={{ padding: 2, marginBottom: 3, width: "100%" }}
                  onClick={() => {
                    history.push("/contents", {
                      titleId: title.id,
                      categoryId: title.category_id,
                    });
                  }}
                >
                  {title.title}
                </Card>
                <Spacer width={10} />
                <Button
                  variant="contained"
                  size="small"
                  color="warning"
                  onClick={() => editTitle(title.id)}
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

export default Title;
