import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Box, TextField, Typography } from "@mui/material";
import { List } from "@mui/icons-material";
import IconLabelButton from "../../components/shared/commons/IconLabelButton";
import ErrorMessage from "../../components/shared/commons/ErrorMessage";
import Spacer from "../../components/shared/commons/Spacer";
import * as Colors from "../../constants/colors";
import { showAlert } from "../../redux/actions/alert";
import { getOne, create, update } from "../../services/category-service";

const FCategory = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  const loadCategory = async (id) => {
    const response = await getOne(id);
    if (response.success) {
      setValue("name", response.data.data.name);
    }
  };

  const createNewRecord = async (formData) => {
    let response = await create(formData);
    if (response?.success) {
      dispatch(showAlert("success", "New record added successfully."));
      history.push("/dashboard");
    } else {
      if (response.errors != null) {
        Object.keys(response.errors).forEach((key) => {
          setError(key, {
            type: "manual",
            message: response.errors[key][0],
          });
        });
      }
    }
  };

  const updateExistingRecord = async (formData) => {
    let response = await update(currentId, formData);
    if (response.success) {
      dispatch(showAlert("success", "Record updated successfully."));
      history.push("/dashboard");
    } else {
      if (response.errors != null) {
        Object.keys(response.errors).forEach((key) => {
          setError(key, {
            type: "manual",
            message: response.errors[key][0],
          });
        });
      }
    }
  };

  const onSubmit = async (formData) => {
    if (currentId == null) {
      createNewRecord(formData);
    } else {
      formData.id = currentId;
      updateExistingRecord(formData);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  useEffect(() => {
    let id = history.location.state?.id;
    if (id !== null && id !== undefined) {
      setCurrentId(id);
      loadCategory(id);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box
        sx={{
          p: 1,
          border: "1px solid",
          borderColor: Colors.secondary,
          borderRadius: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: "bold",
            color: Colors.textPrimary,
            mb: 2,
          }}
        >
          {currentId != null ? "Update Category" : "Add New Category"}
        </Typography>

        <Box>
          <TextField
            fullWidth
            label={"Category name"}
            variant="standard"
            {...register("name", {
              required: {
                value: true,
                message: "Field is required!",
              },
            })}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.name && <ErrorMessage message={errors.name.message} />}
        </Box>
        <Spacer height={20} />
        <Box display="flex">
          <Box sx={{ width: 100 }}>
            <IconLabelButton
              icon={<List />}
              text="Back"
              color="warning"
              action={() => history.push("/dashboard")}
            />
          </Box>
          <Spacer width={20} />
          <Box sx={{ width: 100 }}>
            <IconLabelButton
              icon={<List />}
              text="Save"
              color="primary"
              action={handleSubmit(onSubmit)}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FCategory;
