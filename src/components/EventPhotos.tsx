
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";

const CLOUD_NAME = "dkl2tbuee";
const UPLOAD_PRESET = "react_event_photos";

const EventPhotosPage: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"grid" | "slider">("grid");

  const navigate = useNavigate();

  const handleUpload = async (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);

    setUploading(true);

    for (const file of fileArray) {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
          formData,
          {
            onUploadProgress: (e) => {
              const percent = Math.round((e.loaded * 100) / (e.total || 1));
              setProgress(percent);
            },
          }
        );
        const url = res.data.secure_url;
        setPhotos((prev) => [url, ...prev]);
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    setUploading(false);
    setProgress(0);
  };

  const handleDelete = (url: string) => {
    setPhotos((prev) => prev.filter((photo) => photo !== url));
  };

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `event-photo-${Date.now()}.jpg`;
    link.click();
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Controls */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        {/* Upload Button */}
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={(e) => handleUpload(e.target.files)}
          />
        </Button>
      </Box>

      {/* Upload Progress */}
      {uploading && <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />}

      {/* Title */}
      <Typography variant="h5" fontWeight={600} gutterBottom textAlign="center">
        🎉 Event Photos Gallery
      </Typography>

      {/* View Options */}
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={(_, value) => value && setViewMode(value)}
        sx={{ mb: 3, display: "flex", justifyContent: "center" }}
      >
        <ToggleButton value="grid">Grid View</ToggleButton>
        <ToggleButton value="slider">Slider View</ToggleButton>
      </ToggleButtonGroup>

      {/* Grid View */}
      {viewMode === "grid" && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 2,
          }}
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{ position: "relative" }}
            >
              <img
                src={photo}
                alt={`uploaded-${index}`}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
              />
              {/* Delete Button */}
              <IconButton
                onClick={() => handleDelete(photo)}
                sx={{ position: "absolute", top: 8, right: 8, bgcolor: "white" }}
              >
                <DeleteIcon color="error" />
              </IconButton>

              {/* Download Button */}
              <IconButton
                onClick={() => handleDownload(photo)}
                sx={{ position: "absolute", bottom: 8, right: 8, bgcolor: "white" }}
              >
                <DownloadIcon color="primary" />
              </IconButton>
            </motion.div>
          ))}
        </Box>
      )}

      {/* Slider View */}
      {viewMode === "slider" && (
        <Swiper spaceBetween={20} slidesPerView={1} loop={true}>
          {photos.map((photo, index) => (
            <SwiperSlide key={photo}>
              <Box sx={{ position: "relative" }}>
                <motion.img
                  src={photo}
                  alt={`uploaded-${index}`}
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Download Button in slider */}
                <IconButton
                  onClick={() => handleDownload(photo)}
                  sx={{ position: "absolute", top: 8, right: 8, bgcolor: "white" }}
                >
                  <DownloadIcon color="primary" />
                </IconButton>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
};

export default EventPhotosPage;
