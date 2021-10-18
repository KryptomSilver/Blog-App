export const checkImage = (file: File) => {
  let error = "";
  if (!file) return (error = "File does not exist");
  if (file.size > 1024 * 1024) error = "The largest image size is 1mb";
  return error;
};
export const imageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    `${process.env.REACT_APP_CLOUDINARY_PRESET_UPLOAD}`
  );
  formData.append("cloud-name", `${process.env.REACT_APP_CLOUDINARY_NAME}`);
  const res = await fetch(`${process.env.REACT_APP_CLOUDINARY_URL}`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return { public_id: data.public_id, url: data.secure_url };
};
