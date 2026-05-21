import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Breadcrumbs,
  Link,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";

const Products = () => {

  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  // Snackbar State
  const [open, setOpen] = useState(false);

  // Pagination Change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Add Product Validation
  const handleAddProduct = () => {

    // Example Validation
    const isValid = true;

    if (!isValid) {
      setOpen(true);
      return;
    }

    navigate("/admin/addProducts");
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
      }}
    >

      {/* Top Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >

        <Typography
          variant="h5"
          fontWeight="600"
          color="#333"
        >
          Product List
        </Typography>

        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>

          <Link
            underline="hover"
            color="inherit"
            href="/admin/dashboard"
          >
            Dashboard
          </Link>

          <Typography color="text.primary">
            Product List
          </Typography>

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
            mb: 4,
          }}
        >

          <Typography
            variant="h6"
            fontWeight="600"
          >
            Best Selling Products
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddProduct}
            sx={{
              borderRadius: 2,
              px: 1,
              py: 1,
              textTransform: "uppercase",
              fontWeight: "200",
              boxShadow: "none",
            }}
          >
            Add Product
          </Button>

        </Box>

        {/* Table */}
        <TableContainer>

          <Table>

            {/* Table Header */}
            <TableHead>

              <TableRow
                sx={{
                  backgroundColor: "#1976d2",
                }}
              >

                <TableCell
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  ID
                </TableCell>

                <TableCell
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  PRODUCT
                </TableCell>

                <TableCell
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  CATEGORY
                </TableCell>

                <TableCell
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  SEO URL
                </TableCell>

                <TableCell
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  POPULAR
                </TableCell>

                <TableCell
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  BEST SELLER
                </TableCell>

                <TableCell
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  ACTION
                </TableCell>

              </TableRow>

            </TableHead>

            {/* Table Body */}
            <TableBody>

              <TableRow>

                <TableCell
                  colSpan={7}
                  align="center"
                  sx={{
                    py: 8,
                    color: "#777",
                    fontSize: "16px",
                  }}
                >
                  No products found.
                </TableCell>

              </TableRow>

            </TableBody>

          </Table>

        </TableContainer>

        {/* Pagination */}
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

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Showing 0 results
          </Typography>

          <Stack spacing={2}>

            <Pagination
              count={10}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="circular"
              showFirstButton={false}
              showLastButton={false}
            />

          </Stack>

        </Box>

      </Paper>

      {/* Validation Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >

        <Alert
          severity="error"
          variant="filled"
        >
          Something went wrong!
        </Alert>

      </Snackbar>

    </Box>
  );
};

export default Products;