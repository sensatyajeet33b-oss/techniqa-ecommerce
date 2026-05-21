import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Snackbar,
    Alert,
    Paper,
    Breadcrumbs,
    Link,
} from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!categoryName.trim()) {
            setError("Category name is required");
            return;
        }

        if (categoryName.trim().length < 3) {
            setError("Category name must be at least 3 characters");
            return;
        }

        // Clear error
        setError("");

        // API Call / Backend Logic
        console.log("New Category:", categoryName);

        // Success Snackbar
        setOpen(true);

        // Reset Input
        setCategoryName("");
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
                    Add Category
                </Typography>

                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/admin/dashboard"
                    >
                        Dashboard
                    </Link>

                    <Link
                        underline="hover"
                        color="inherit"
                        href="/admin/category"
                    >
                        Category List
                    </Link>

                    <Typography color="text.primary">
                        Add Category
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
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight="600"
                    mb={4}
                >
                    Create New Category
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    {/* Label */}
                    <Typography
                        variant="subtitle1"
                        fontWeight="600"
                        mb={1}
                    >
                        Category Name
                    </Typography>

                    {/* Input */}
                    <TextField
                        fullWidth
                        placeholder="Enter category name"
                        value={categoryName}
                        onChange={(e) => {
                            setCategoryName(e.target.value);

                            // Remove error while typing
                            if (error) {
                                setError("");
                            }
                        }}
                        error={Boolean(error)}
                        helperText={error}
                        sx={{
                            mb: 3,
                            backgroundColor: "#fff",
                        }}
                    />

                    {/* Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            px: 4,
                            py: 1.2,
                            borderRadius: 2,
                            fontWeight: "600",
                            textTransform: "uppercase",
                            boxShadow: "none",
                        }}
                    >
                        Add Category
                    </Button>
                </Box>
            </Paper>

            {/* Success Snackbar */}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            >
                <Alert
                    severity="success"
                    variant="filled"
                >
                    Category Added Successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddCategory;