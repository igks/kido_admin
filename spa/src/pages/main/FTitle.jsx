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
import { create, update } from "../../services/master-service";
import { showAlert } from "../../redux/actions/alert";
import { getOne } from "../../services/master-service";

const FTitle = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  // const loadMaster = async (id) => {
  //   const response = await getOne(id);
  //   if (response.success) {
  //     setValue("masterProperty1", response.data.masterProperty1);
  //     setValue("masterProperty2", response.data.masterProperty2);
  //   }
  // };

  const createNewRecord = async (formData) => {
    let response = await create(formData);
    if (response.success) {
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
      // loadMaster(id);
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
          {currentId != null ? "Update Title" : "Add New Title"}
        </Typography>

        <Box>
          <TextField
            fullWidth
            label={"Title name"}
            variant="standard"
            {...register("title", {
              required: {
                value: true,
                message: "Field is required!",
              },
            })}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.title && <ErrorMessage message={errors.title.message} />}
        </Box>
        <Spacer height={10} />
        <Box sx={{ width: 100 }}>
          <IconLabelButton
            icon={<List />}
            text="Save"
            color="primary"
            action={handleSubmit(onSubmit)}
          />
        </Box>
      </Box>
    </>
  );
};

export default FTitle;
