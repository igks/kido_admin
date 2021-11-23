import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Typography, Box, Button, Card } from "@mui/material";
import { Edit } from "@mui/icons-material";
import Spacer from "../../components/shared/commons/Spacer";
import * as Colors from "../../constants/colors";
import { getAll } from "../../services/category-service";

const Dashboard = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCategories = async () => {
    const response = await getAll();
    if (response?.success) {
      setCategories(response.data.data);
      setIsLoading(false);
    }
  };

  const addCategory = () => {
    history.push("/form-category");
  };

  const editCategory = (id) => {
    history.push("/form-category", { id: id });
  };

  const toTitle = () => {
    history.push("/titles");
  };

  useEffect(() => {
    loadCategories();
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
              Categories
            </Typography>
            <Box sx={{ heigh: 40 }}>
              <Button variant="contained" size="small" onClick={addCategory}>
                Add New
              </Button>
            </Box>
          </Box>
          {categories.length > 0 &&
            categories.map((category, index) => (
              <Box
                key={`category-${index}`}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="start"
              >
                <Card
                  sx={{ padding: 2, marginBottom: 3, width: "100%" }}
                  onClick={toTitle}
                >
                  {category.name}
                </Card>
                <Spacer width={10} />
                <Button
                  variant="contained"
                  size="small"
                  color="warning"
                  onClick={() => editCategory(category.id)}
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

export default Dashboard;
