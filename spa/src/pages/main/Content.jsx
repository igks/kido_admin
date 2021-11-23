import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Typography, Box, Button, Card, Divider } from "@mui/material";
import { Edit } from "@mui/icons-material";
import Spacer from "../../components/shared/commons/Spacer";
import * as Colors from "../../constants/colors";
import { getByTitle } from "../../services/content-service";

const Content = () => {
  const history = useHistory();
  const [contents, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadContent = async () => {
    let titleId = history.location.state?.titleId;
    if (titleId != null) {
      let response = await getByTitle(titleId);
      if (response?.success) {
        setContent(response.data.data.content);
        setIsLoading(false);
      }
    }
  };

  const addContent = () => {
    history.push("/form-content", {
      titleId: history.location.state?.titleId,
      categoryId: history.location.state?.categoryId,
    });
  };

  const editContent = (id) => {
    history.push("/form-content", {
      id: id,
      titleId: history.location.state?.titleId,
      categoryId: history.location.state?.categoryId,
    });
  };

  useEffect(() => {
    loadContent();
    // eslint-disable-next-line
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
                  history.push("/titles", {
                    id: history.location.state?.categoryId,
                  })
                }
                sx={{ marginRight: 3 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  addContent();
                }}
              >
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
                  <h3>{content.description}</h3>
                  <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                  {content.content}
                  <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                  {content.meaning}
                  <Spacer height={20} />
                  <Button
                    variant="contained"
                    size="small"
                    color="warning"
                    onClick={() => editContent(content.id)}
                    sx={{ width: 5 }}
                  >
                    <Edit />
                  </Button>
                </Card>
              </Box>
            ))}
        </>
      )}
    </>
  );
};

export default Content;
