import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Typography, Box, Button, Card } from "@mui/material";
import { Edit } from "@mui/icons-material";
import Spacer from "../../components/shared/commons/Spacer";
import * as Colors from "../../constants/colors";
import { getAll } from "../../services/category-service";
import { getTraffic, getTop } from "../../services/report-services";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const Dashboard = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRenderChart, setIsRenderChart] = useState(false);
  const [favorites, setFavorite] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Daily Request",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Request Performance",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

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

  const toTitle = (id) => {
    history.push("/titles", { id: id });
  };

  const loadTraffic = async () => {
    const res = await getTraffic();
    if (res?.success) {
      const labels = res.data.data.map((x) => x.date);
      const values = res.data.data.map((x) => x.value);
      const datasets = [
        {
          label: "Daily Request",
          data: values,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ];
      setChartData((currentState) => ({
        ...currentState,
        labels: labels,
        datasets: datasets,
      }));
      setIsRenderChart(true);
    }
  };

  const loadFavorite = async () => {
    const res = await getTop();
    if (res?.success) {
      setFavorite(res.data.data);
    }
  };

  useEffect(() => {
    loadCategories();
    loadTraffic();
    loadFavorite();
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
                  onClick={() => toTitle(category.id)}
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
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: "bold",
              color: Colors.textPrimary,
            }}
          >
            Traffic
          </Typography>
          {isRenderChart && (
            <Box sx={{ height: 300 }}>
              <Line options={chartOptions} data={chartData} />
            </Box>
          )}

          <Typography
            sx={{
              fontSize: 24,
              fontWeight: "bold",
              color: Colors.textPrimary,
              marginTop: 5,
            }}
          >
            Favorites
          </Typography>
          {favorites.length > 0 &&
            favorites.map((i) => (
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: Colors.textPrimary,
                  marginTop: 2,
                  paddingRight: 4,
                  paddingLeft: 4,
                }}
              >
                {i.name}
              </Typography>
            ))}
        </>
      )}
    </>
  );
};

export default Dashboard;
