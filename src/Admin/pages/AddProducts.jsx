import React, { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const AddProducts = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        productsName: "",
        category: null,
        shortDescription: "",
        description: "",
        highlights: "",
        mrp: "",
        salePrice: "",
        discount: "",
        brand: "",
        availability: "",
        warranty: "",
        metaTitle: "",
        metaDescription: "",
        seoUrl: "",
        image1: null,
        image2: null,
        image3: null,
    });

    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const categories = [""];

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    // Handle file upload with validation
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        let error = "";

        if (file) {
            const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

            if (!allowedTypes.includes(file.type)) {
                error = "Only JPG, PNG, WEBP allowed";
            }

            if (file.size > 2 * 1024 * 1024) {
                error = "Max file size is 2MB";
            }
        }

        setFormData({ ...formData, [name]: file });
        setErrors({ ...errors, [name]: error });
    };

    // Full validation
    const validate = () => {
        let temp = {};

        // PRODUCT NAME
        if (!formData.productsName.trim()) {
            temp.productsName = "Product name is required";
        } else if (formData.productsName.trim().length < 3) {
            temp.productsName = "Minimum 3 characters required";
        } else if (!/^[A-Za-z0-9\s\-&,().]+$/.test(formData.productsName)) {
            temp.productsName =
                "Invalid product name";
        }

        // CATEGORY
        if (!formData.category) {
            temp.category = "Category is required";
        }

        // SHORT DESCRIPTION
        if (!formData.shortDescription.trim()) {
            temp.shortDescription =
                "Short description is required";
        } else if (formData.shortDescription.trim().length < 10) {
            temp.shortDescription =
                "Minimum 10 characters required";
        }

        // DESCRIPTION
        const plainDescription = formData.description
            .replace(/<(.|\n)*?>/g, "")
            .trim();

        if (!plainDescription) {
            temp.description = "Description is required";
        } else if (plainDescription.length < 20) {
            temp.description =
                "Minimum 20 characters required";
        }

        // MRP
        if (!formData.mrp.trim()) {
            temp.mrp = "MRP is required";
        } else if (!/^\d+(\.\d{1,2})?$/.test(formData.mrp)) {
            temp.mrp = "Enter valid price";
        }

        // SALE PRICE
        if (!formData.salePrice.trim()) {
            temp.salePrice = "Sale price is required";
        } else if (!/^\d+(\.\d{1,2})?$/.test(formData.salePrice)) {
            temp.salePrice = "Enter valid sale price";
        } else if (
            Number(formData.salePrice) >
            Number(formData.mrp)
        ) {
            temp.salePrice =
                "Sale price cannot exceed MRP";
        }

        // DISCOUNT
        if (!formData.discount.trim()) {
            temp.discount = "Discount is required";
        } else if (!/^\d+$/.test(formData.discount)) {
            temp.discount = "Only numbers allowed";
        } else if (
            Number(formData.discount) < 0 ||
            Number(formData.discount) > 100
        ) {
            temp.discount =
                "Discount must be between 0-100";
        }

        // HIGHLIGHTS
        const plainHighlights = formData.highlights
            .replace(/<(.|\n)*?>/g, "")
            .trim();

        if (!plainHighlights) {
            temp.highlights = "Highlights are required";
        } else if (plainHighlights.length < 10) {
            temp.highlights =
                "Minimum 10 characters required";
        }

        // BRAND
        if (!formData.brand.trim()) {
            temp.brand = "Brand is required";
        } else if (!/^[A-Za-z\s&.-]+$/.test(formData.brand)) {
            temp.brand = "Invalid brand name";
        }

        // AVAILABILITY
        if (!formData.availability.trim()) {
            temp.availability =
                "Availability is required";
        } else if (
            !/^(in stock|out of stock|limited stock)$/i.test(
                formData.availability.trim()
            )
        ) {
            temp.availability =
                "Use: In stock / Out of stock / Limited stock";
        }

        // WARRANTY
        if (!formData.warranty.trim()) {
            temp.warranty = "Warranty is required";
        } else if (
            !/^[A-Za-z0-9\s]+$/.test(formData.warranty)
        ) {
            temp.warranty =
                "Invalid warranty format";
        }

        // META TITLE
        if (!formData.metaTitle.trim()) {
            temp.metaTitle = "Meta title is required";
        } else if (formData.metaTitle.length > 60) {
            temp.metaTitle =
                "Maximum 60 characters allowed";
        }

        // META DESCRIPTION
        if (!formData.metaDescription.trim()) {
            temp.metaDescription =
                "Meta description is required";
        } else if (formData.metaDescription.length > 160) {
            temp.metaDescription =
                "Maximum 160 characters allowed";
        }

        // SEO URL
        if (!formData.seoUrl.trim()) {
            temp.seoUrl = "SEO URL is required";
        } else if (
            !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
                formData.seoUrl
            )
        ) {
            temp.seoUrl =
                "Use lowercase letters, numbers and hyphens only";
        }

        // IMAGES
        ["image1", "image2", "image3"].forEach(
            (img, index) => {
                if (!formData[img]) {
                    temp[img] =
                        `Image ${index + 1} is required`;
                }
            }
        );

        setErrors(temp);

        return Object.keys(temp).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        console.log(formData);
        setOpen(true);
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],

            [{ color: [] }, { background: [] }],

            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],

            ["link", "image"],

            ["clean"],
        ],
    };

    return (
        <Box sx={{ p: 3, background: "#f4f6fb", minHeight: "100%" }}>
            <Box sx={{ mx: "auto" }}>

                {/* Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        color="#333"
                    >
                        Add Products
                    </Typography>

                    <Button onClick={() => navigate("/admin/products")}>
                        BACK TO LIST
                    </Button>
                </Box>

                {/* Card */}
                <Paper
                    sx={{
                        p: 5,
                        borderRadius: 3,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit}>

                        {/* Row 1 */}
                        <Box sx={{ display: "flex", gap: 3, mb: 3, flexWrap: "wrap" }}>
                            <Box sx={{ flex: 1, minWidth: "300px" }}>
                                <TextField
                                    fullWidth
                                    label="Product Name *"
                                    name="productsName"
                                    value={formData.productsName}
                                    onChange={handleChange}
                                    size="small"
                                    error={!!errors.productsName}
                                    helperText={errors.productsName}
                                />
                            </Box>

                            <Box sx={{ flex: 1, minWidth: "300px" }}>
                                <Autocomplete
                                    options={categories}
                                    getOptionLabel={(option) => option?.name || ""}
                                    value={formData.category}
                                    onChange={(event, newValue) => {
                                        setFormData({ ...formData, category: newValue });
                                        setErrors({ ...errors, category: "" });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Category *"
                                            size="small"
                                            error={!!errors.category}
                                            helperText={errors.category}
                                        />
                                    )}
                                />
                            </Box>
                        </Box>

                        {/* Short Description */}
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Short Description *"
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleChange}
                                rows={2}
                                error={!!errors.shortDescription}
                                helperText={errors.shortDescription}
                            />
                        </Box>

                        {/* Description */}
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 600,
                                    mb: 1,
                                    color: "#222",
                                }}
                            >
                                Description
                            </Typography>

                            <Box
                                sx={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    backgroundColor: "#fff",

                                    "& .ql-toolbar": {
                                        border: "none",
                                        borderBottom: "1px solid #eee",
                                        backgroundColor: "#fafafa",
                                        padding: "6px",
                                    },

                                    "& .ql-container": {
                                        border: "none",
                                        height: "180px",
                                    },

                                    "& .ql-editor": {
                                        height: "180px",
                                        fontSize: "14px",
                                        padding: "12px",
                                        overflowY: "auto",
                                    },
                                }}
                            >
                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    value={formData.description}
                                    onChange={(value) => {
                                        setFormData({
                                            ...formData,
                                            description: value,
                                        });

                                        setErrors({
                                            ...errors,
                                            description: "",
                                        });
                                    }}
                                />
                            </Box>

                            {errors.description && (
                                <Typography
                                    variant="caption"
                                    color="error"
                                    sx={{ mt: 1, display: "block" }}
                                >
                                    {errors.description}
                                </Typography>
                            )}
                        </Box>

                        {/* PRICE SECTION */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 3,
                                mb: 4,
                                flexWrap: "wrap",
                            }}
                        >
                            {/* MRP */}
                            <Box sx={{ flex: 1, minWidth: "250px" }}>
                                <TextField
                                    fullWidth
                                    label="MRP *"
                                    name="mrp"
                                    value={formData.mrp || ""}
                                    onChange={handleChange}
                                    size="small"
                                    error={!!errors.mrp}
                                    helperText={errors.mrp}
                                />
                            </Box>

                            {/* SALE PRICE */}
                            <Box sx={{ flex: 1, minWidth: "250px" }}>
                                <TextField
                                    fullWidth
                                    label="Sale Price *"
                                    name="salePrice"
                                    value={formData.salePrice || ""}
                                    onChange={handleChange}
                                    size="small"
                                    error={!!errors.salePrice}
                                    helperText={errors.salePrice}
                                />
                            </Box>

                            {/* DISCOUNT */}
                            <Box sx={{ flex: 1, minWidth: "250px" }}>
                                <TextField
                                    fullWidth
                                    label="Discount (%) *"
                                    name="discount"
                                    value={formData.discount || ""}
                                    onChange={handleChange}
                                    size="small"
                                    error={!!errors.discount}
                                    helperText={errors.discount}
                                />
                            </Box>
                        </Box>

                        {/* HIGHLIGHTS */}
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 600,
                                    mb: 1,
                                    color: "#222",
                                }}
                            >
                                Highlights
                            </Typography>

                            <Box
                                sx={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    backgroundColor: "#fff",

                                    "& .ql-toolbar": {
                                        border: "none",
                                        borderBottom: "1px solid #eee",
                                        backgroundColor: "#fafafa",
                                        padding: "6px",
                                    },

                                    "& .ql-container": {
                                        border: "none",
                                        height: "150px",
                                    },

                                    "& .ql-editor": {
                                        height: "150px",
                                        fontSize: "14px",
                                        padding: "12px",
                                        overflowY: "auto",
                                    },
                                }}
                            >
                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    value={formData.highlights || ""}
                                    onChange={(value) => {
                                        setFormData({
                                            ...formData,
                                            highlights: value,
                                        });

                                        setErrors({
                                            ...errors,
                                            highlights: "",
                                        });
                                    }}
                                />
                            </Box>

                            {errors.highlights && (
                                <Typography
                                    variant="caption"
                                    color="error"
                                    sx={{ mt: 1, display: "block" }}
                                >
                                    {errors.highlights}
                                </Typography>
                            )}
                        </Box>

                        {/* PRODUCT DETAILS */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 3,
                                mb: 4,
                                flexWrap: "wrap",
                            }}
                        >
                            {/* BRAND */}
                            <Box sx={{ flex: 1, minWidth: "250px" }}>
                                <TextField
                                    fullWidth
                                    label="Brand *"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    size="small"
                                    error={!!errors.brand}
                                    helperText={errors.brand}
                                />
                            </Box>

                            {/* AVAILABILITY */}
                            <Box sx={{ flex: 1, minWidth: "250px" }}>
                                <TextField
                                    fullWidth
                                    label="Availability *"
                                    name="availability"
                                    value={formData.availability}
                                    onChange={handleChange}
                                    size="small"
                                    error={!!errors.availability}
                                    helperText={errors.availability}
                                />
                            </Box>

                            {/* WARRANTY */}
                            <Box sx={{ flex: 1, minWidth: "250px" }}>
                                <TextField
                                    fullWidth
                                    label="Warranty *"
                                    name="warranty"
                                    value={formData.warranty}
                                    onChange={handleChange}
                                    size="small"
                                    error={!!errors.warranty}
                                    helperText={errors.warranty}
                                />
                            </Box>
                        </Box>

                        {/* Meta */}
                        <Box sx={{ display: "flex", gap: 4, mb: 4, flexWrap: "wrap" }}>
                            <Box sx={{ flex: 1, minWidth: "300px" }}>
                                <TextField
                                    fullWidth
                                    label="Meta Title *"
                                    name="metaTitle"
                                    value={formData.metaTitle}
                                    onChange={handleChange}
                                    size="small"
                                    error={!!errors.metaTitle}
                                    helperText={errors.metaTitle}
                                />
                            </Box>

                            <Box sx={{ flex: 1, minWidth: "300px" }}>
                                <TextField
                                    fullWidth
                                    label="Meta Description *"
                                    name="metaDescription"
                                    value={formData.metaDescription}
                                    onChange={handleChange}
                                    size="small"
                                    error={!!errors.metaDescription}
                                    helperText={errors.metaDescription}
                                />
                            </Box>
                        </Box>

                        {/* SEO + Image 1 */}
                        <Box sx={{ display: "flex", gap: 3, mb: 3, flexWrap: "wrap" }}>

                            {/* SEO URL */}
                            <Box sx={{ flex: 1, minWidth: "300px" }}>
                                <TextField
                                    fullWidth
                                    label="SEO URL *"
                                    name="seoUrl"
                                    value={formData.seoUrl}
                                    onChange={handleChange}
                                    size="small"
                                    error={!!errors.seoUrl}
                                    helperText={errors.seoUrl}
                                />
                            </Box>

                            {/* Image 1 */}
                            <Box sx={{ flex: 1, minWidth: "300px" }}>
                                <Typography mb={1}>Image 1 *</Typography>

                                <input
                                    type="file"
                                    name="image1"
                                    onChange={handleFileChange}
                                    style={{ width: "100%" }}
                                />

                                {errors.image1 && (
                                    <Typography variant="caption" color="error">
                                        {errors.image1}
                                    </Typography>
                                )}
                            </Box>
                        </Box>

                        {/* Image 2 & 3 */}
                        <Box sx={{ display: "flex", gap: 3, mb: 3, flexWrap: "wrap" }}>

                            {/* Image 2 */}
                            <Box sx={{ flex: 1, minWidth: "300px" }}>
                                <Typography mb={1}>Image 2 *</Typography>

                                <input
                                    type="file"
                                    name="image2"
                                    onChange={handleFileChange}
                                    style={{ width: "100%" }}
                                />

                                {errors.image2 && (
                                    <Typography variant="caption" color="error">
                                        {errors.image2}
                                    </Typography>
                                )}
                            </Box>

                            {/* Image 3 */}
                            <Box sx={{ flex: 1, minWidth: "300px" }}>
                                <Typography mb={1}>Image 3 *</Typography>

                                <input
                                    type="file"
                                    name="image3"
                                    onChange={handleFileChange}
                                    style={{ width: "100%" }}
                                />

                                {errors.image3 && (
                                    <Typography variant="caption" color="error">
                                        {errors.image3}
                                    </Typography>
                                )}
                            </Box>
                        </Box>

                        {/* Submit */}
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    px: 5,
                                    py: 1.2,
                                    borderRadius: 2,
                                    textTransform: "none",
                                }}
                            >
                                CREATE PRODUCT
                            </Button>
                        </Box>

                    </Box>
                </Paper>

                {/* Snackbar */}
                <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                    <Alert severity="success" variant="filled">
                        Product Created Successfully!
                    </Alert>
                </Snackbar>

            </Box>
        </Box>
    );
};

export default AddProducts;