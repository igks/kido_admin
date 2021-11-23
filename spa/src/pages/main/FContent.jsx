import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Box, TextField, Typography, TextareaAutosize } from "@mui/material";
import { List } from "@mui/icons-material";
import IconLabelButton from "../../components/shared/commons/IconLabelButton";
import ErrorMessage from "../../components/shared/commons/ErrorMessage";
import Spacer from "../../components/shared/commons/Spacer";
import * as Colors from "../../constants/colors";
import { showAlert } from "../../redux/actions/alert";
import { getOne, create, update } from "../../services/content-service";

const FTitle = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  const loadContent = async () => {
    let id = history.location.state?.id;
    const response = await getOne(id);
    if (response.success) {
      setValue("sequence", response.data.data.sequence);
      setValue("content", response.data.data.content);
      setValue("meaning", response.data.data.meaning);
      setValue("description", response.data.data.description);
    }
  };

  const createNewRecord = async (formData) => {
    formData.title_id = history.location.state?.titleId;

    let response = await create(formData);
    if (response.success) {
      dispatch(showAlert("success", "New record added successfully."));
      history.push("/contents", {
        titleId: history.location.state?.titleId,
        categoryId: history.location.state?.categoryId,
      });
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
    formData.title_id = history.location.state?.titleId;

    let response = await update(currentId, formData);
    if (response.success) {
      dispatch(showAlert("success", "Record updated successfully."));
      history.push("/contents", {
        titleId: history.location.state?.titleId,
        categoryId: history.location.state?.categoryId,
      });
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
      loadContent();
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
          {currentId != null ? "Update Content" : "Add New Content"}
        </Typography>

        <Box>
          <TextField
            fullWidth
            type="number"
            label={"Sequence"}
            variant="standard"
            {...register("sequence", {
              required: {
                value: true,
                message: "Field is required!",
              },
            })}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.sequence && (
            <ErrorMessage message={errors.sequence.message} />
          )}
        </Box>

        <Spacer height={15} />
        <Box>
          <TextareaAutosize
            minRows={3}
            placeholder="Mantra..."
            style={{ width: "100%" }}
            {...register("content", {
              required: {
                value: true,
                message: "Field is required!",
              },
            })}
          />
          {errors.content && <ErrorMessage message={errors.content.message} />}
        </Box>

        <Spacer height={15} />
        <Box>
          <TextareaAutosize
            minRows={3}
            placeholder="Arti..."
            style={{ width: "100%" }}
            {...register("meaning", {
              required: {
                value: true,
                message: "Field is required!",
              },
            })}
          />
          {errors.meaning && <ErrorMessage message={errors.meaning.message} />}
        </Box>

        <Spacer height={15} />
        <Box>
          <TextareaAutosize
            minRows={3}
            placeholder="Deskripsi..."
            style={{ width: "100%" }}
            {...register("description", {
              required: {
                value: true,
                message: "Field is required!",
              },
            })}
          />
          {errors.description && (
            <ErrorMessage message={errors.description.message} />
          )}
        </Box>

        <Spacer height={10} />
        <Box display="flex">
          <Box sx={{ width: 100 }}>
            <IconLabelButton
              icon={<List />}
              text="Back"
              color="warning"
              action={() =>
                history.push("/contents", {
                  titleId: history.location.state?.titleId,
                  categoryId: history.location.state?.categoryId,
                })
              }
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

export default FTitle;
