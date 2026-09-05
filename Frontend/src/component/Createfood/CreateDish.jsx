import React from "react";
import styles from "./createDish.module.css";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/ApiInstance";

const max_image = 4;

const CreateDish = () => {
  const [preview, setPreview] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formdata, setformdata] = useState({
    dishName: "",
    foodImage: [],
    description: "",
    category: "",
    typeOfFood: "",
    preprationTime: "",
    distance: "",
    dishPrice: "",
    dishHalfPrice: "",
    calories: "",
  });

  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setformdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const totalImages = formdata.foodImage.length + selectedFiles.length;

    if (totalImages > max_image) {
      setError(`Maximum ${max_image} images allowed`);
      return;
    }

    setError("");

    // ✅ purani images ke saath naye add karo
    const updatedImages = [...formdata.foodImage, ...selectedFiles];
    setformdata((prev) => ({ ...prev, foodImage: updatedImages }));

    // ✅ preview banao
    const newPreviews = selectedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setPreview((prev) => [...prev, ...newPreviews]);

    // ✅ same input se dobara select kar sako
    e.target.value = "";
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formdata.foodImage.filter((_, i) => i !== index);
    const updatedPreviews = preview.filter((_, i) => i !== index);

    // ✅ memory leak se bachne ke liye URL revoke karo
    URL.revokeObjectURL(preview[index].url);

    setformdata((prev) => ({ ...prev, foodImage: updatedImages }));
    setPreview(updatedPreviews);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (formdata.foodImage.length === 0) {
      setError("Please select at least one image");
      return;
    }

    const dish = new FormData();
    dish.append("dishNmae", formdata.dishNmae);
    dish.append("description", formdata.description);
    dish.append("category", formdata.category);
    dish.append("typeOfFood", formdata.typeOfFood);
    dish.append("preprationTime", formdata.preprationTime);
    dish.append("foodprice", formdata.distance);
    dish.append("foodpriceHalf", formdata.dishPrice);
    dish.append("dishHalfPrice", formdata.dishHalfPrice);
    dish.append("calories", formdata.calories);
    formdata.foodImage.forEach((image) => {
      dish.append("foodImage", image);
    });

    try {
      const res = await axiosInstance.post("/createFood/saveFood", dish, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/food/create-dish");

      console.log("upload response", res.data);
      // reset
      setformdata("");
      setPreview([]);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Create Dish</h2>
        {error && <div className={styles.error}>{error}</div>}

        <label className={styles.field}>
          <span className={styles.label}>Dish Name</span>
          <input
            type="text"
            name="dishName"
            value={formdata.dishName}
            onChange={handleTextChange}
            required
          />
        </label>

        {/* <label className={styles.field}>
          <span className={styles.label}>description</span>
          <input
            value={formdata.description}
            onChange={(e) =>
              setformdata({
                ...formdata, // Spread existing state
                description: e.target.value, // Update specific field
              })
            }
            required
          />
        </label> */}

        <label className={styles.field}>
          <span className={styles.label}>Category</span>
          <input
            type="text"
            name="category"
            value={formdata.category}
            onChange={handleTextChange}
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Type of Food</span>
          <input
            type="text"
            name="typeOfFood"
            value={formdata.typeOfFood}
            onChange={handleTextChange}
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Prepration Time</span>
          <input
            type="text"
            name="preprationTime"
            value={formdata.preprationTime}
            onChange={handleTextChange}
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Distance</span>
          <input
            type="text"
            name="distance"
            value={formdata.distance}
            onChange={handleTextChange}
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Dish Price</span>
          <input
            type="text"
            name="dishPrice"
            value={formdata.dishPrice}
            onChange={handleTextChange}
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Food Half Price</span>
          <input
            type="text"
            name="dishHalfPrice"
            value={formdata.dishHalfPrice}
            onChange={handleTextChange}
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>calories</span>
          <input
            type="text"
            name="calories"
            value={formdata.calories}
            onChange={handleTextChange}
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Description</span>
          <textarea
            type="text"
            name="description"
            value={formdata.description}
            onChange={handleTextChange}
            rows={4}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>
            {" "}
            Images ({formdata.foodImage.length}/{max_image})
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            disabled={formdata.foodImage.length >= max_image}
          />
        </label>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className={styles.previewGrid}>
          {preview.map((preview, index) => (
            <div key={index} className={styles.previewItem}>
              <img
                src={preview.url}
                alt={preview.name}
                className={styles.previewImg}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className={styles.removeBtn}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
          <div className={styles.actions}>
            <button className={styles.createbtn} type="submit">
              {submitting ? "Uploading..." : "Upload Dish"}
            </button>
          </div>
      </form>
    </div>
  );
};

export default CreateDish;
