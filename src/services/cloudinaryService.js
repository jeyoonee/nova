import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: { cloudName: "ds3yde7ji" },
});

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "nova_unsigned"); // 실제

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/ds3yde7ji/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url;
};

export default cld;
