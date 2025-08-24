// import React, { useState } from "react";
// import { Box, Button, Typography, Stack } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

// const EventPhotos: React.FC = () => {
//   const [photos, setPhotos] = useState<File[]>([]);

//   const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setPhotos([...photos, ...Array.from(event.target.files)]);
//     }
//   };

//   const handleDownload = (photo: File) => {
//     const url = URL.createObjectURL(photo);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = photo.name;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <Box
//       sx={{
//         p: 3,
//         borderRadius: 3,
//         boxShadow: 2,
//         bgcolor: "rgba(255,255,255,0.7)",
//         backdropFilter: "blur(8px)",
//         textAlign: "center"
//       }}
//     >
//       <Typography variant="h6" fontWeight={600} gutterBottom>
//         Event Photos
//       </Typography>

//       {/* Upload Button */}
//       <Button
//         component="label"
//         variant="contained"
//         startIcon={<CloudUploadIcon />}
//         sx={{ mb: 2 }}
//       >
//         Upload Photos
//         <input
//           type="file"
//           hidden
//           multiple
//           accept="image/*"
//           onChange={handleUpload}
//         />
//       </Button>

//       {/* Uploaded Photos List */}
//       <Stack spacing={1} alignItems="center">
//         {photos.length === 0 && (
//           <Typography variant="body2" color="text.secondary">
//             No photos uploaded yet.
//           </Typography>
//         )}
//         {photos.map((photo, index) => (
//           <Stack
//             key={index}
//             direction="row"
//             spacing={1}
//             alignItems="center"
//             sx={{ width: "100%", justifyContent: "space-between" }}
//           >
//             <Typography variant="body2">{photo.name}</Typography>
//             <Button
//               variant="outlined"
//               size="small"
//               startIcon={<CloudDownloadIcon />}
//               onClick={() => handleDownload(photo)}
//             >
//               Download
//             </Button>
//           </Stack>
//         ))}
//       </Stack>
//     </Box>
//   );
// };

// export default EventPhotos;


import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const EventPhotos: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const urls = files.map((file) => URL.createObjectURL(file));
      setPhotos((prev) => [...prev, ...urls]);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: 2,
        bgcolor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(8px)",
        textAlign: "center"
      }}
    >
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Event Photos
      </Typography>

      {/* Upload Button */}
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{ mb: 3 }}
      >
        Upload Photos
        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={handleUpload}
        />
      </Button>

      {/* Show Slideshow if photos exist */}
      {photos.length > 0 ? (
        <Swiper spaceBetween={20} slidesPerView={1} loop={true}>
          {photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <motion.img
                src={photo}
                alt={`uploaded-${index}`}
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No photos uploaded yet.
        </Typography>
      )}
    </Box>
  );
};

export default EventPhotos;
