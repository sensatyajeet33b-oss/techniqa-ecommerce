import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Pagination,
  Stack,
  Paper,
  Breadcrumbs,
  Link,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  // 🔹 backend data will come here later
  const [options] = useState([]);

  const [searchValue, setSearchValue] = useState(null);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      {/* Top Breadcrumb */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="600" color="#333">
          Category List
        </Typography>

        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link underline="hover" color="inherit" href="/admin/dashboard">
            Dashboard
          </Link>

          <Typography color="text.primary">Category List</Typography>
        </Breadcrumbs>
      </Box>

      {/* Main Card */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: 3,
          p: 4,
          backgroundColor: "#fff",
          minHeight: "500px",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* Left Side */}
          <Typography variant="h6" fontWeight="600">
            All Categories
          </Typography>

          {/* Right Side (Search + Button) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* 🔍 Autocomplete Search */}
            <Autocomplete
              sx={{ width: 250 }}
              options={options}
              getOptionLabel={(option) => option?.name || ""}
              value={searchValue}
              onChange={(event, newValue) => {
                setSearchValue(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Category"
                  size="small"
                />
              )}
            />

            {/* ➕ Add Button */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/admin/addCategory")}
              sx={{
                borderRadius: 2,
                px: 2,
                py: 1,
                textTransform: "uppercase",
                fontWeight: "500",
                boxShadow: "none",
              }}
            >
              Add Category
            </Button>
          </Box>
        </Box>

        {/* Empty Category Area */}
        <Box
          sx={{
            height: "250px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            border: "1px dashed #dcdcdc",
            backgroundColor: "#fafafa",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No categories found.
          </Typography>
        </Box>

        {/* Pagination Section */}
        <Box
          sx={{
            mt: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            showing 0 results
          </Typography>

          <Stack spacing={2}>
            <Pagination
              count={10}
              page={page}
              onChange={handleChange}
              color="primary"
              shape="circular"
            />
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default Category;