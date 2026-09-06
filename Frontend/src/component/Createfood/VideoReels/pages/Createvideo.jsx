import React, { useState, useRef } from "react";
import styles from "./Createvideo.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formdata, setformdata] = useState({
    foodname: "",
    description: "",
    category: "",
    typeOfFood: "",
    preprationTime: "",
    foodprice: "",
    foodpriceHalf: "",
    calories: "",
  });

  const navigate = useNavigate();

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList);
    // only accept video types
    const videos = arr.filter((f) => f.type.startsWith("video/"));
    setFiles((prev) => [...prev, ...videos]);
  };

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
    // reset input so same file can be selected again
    e.target.value = null;
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("foodname", formdata.foodname);
      form.append("description", formdata.description);
      form.append("category", formdata.category);
      form.append("typeOfFood", formdata.typeOfFood);
      form.append("preprationTime", formdata.preprationTime);
      form.append("foodprice", formdata.foodprice);
      form.append("foodpriceHalf", formdata.foodpriceHalf);
      form.append("calories", formdata.calories);

      // append first video file as main; if multiple, append with same field name
      files.forEach((f, i) => form.append("file", f));

      const res = await axios.post(
        "http://localhost:3000/api/food/upload",
        form,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      navigate("/home");

      console.log("upload response", res.data);
      // reset
      setformdata("");
      setFiles([]);
      if (inputRef.current) inputRef.current.value = null;
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <h2>Food video</h2>
      {error && <div className={styles.error}>{error}</div>}

      <label className={styles.field}>
        <span className={styles.label}>Food Name</span>
        <input
          value={formdata.foodname}
          onChange={(e) =>
            setformdata({
              ...formdata,
              foodname: e.target.value,
            })
          }
          required
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Category</span>
        <input
          value={formdata.category}
          onChange={(e) =>
            setformdata({
              ...formdata, // Spread existing state
              category: e.target.value, // Update specific field
            })
          }
          required
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Type of Food</span>
        <input
          value={formdata.typeOfFood}
          onChange={(e) =>
            setformdata({
              ...formdata, // Spread existing state
              typeOfFood: e.target.value, // Update specific field
            })
          }
          required
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Prepration Time</span>
        <input
          value={formdata.preprationTime}
          onChange={(e) =>
            setformdata({
              ...formdata, // Spread existing state
              preprationTime: e.target.value, // Update specific field
            })
          }
          required
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Food Price</span>
        <input
          value={formdata.foodprice}
          onChange={(e) =>
            setformdata({
              ...formdata, // Spread existing state
              foodprice: e.target.value, // Update specific field
            })
          }
          required
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Food Half Price</span>
        <input
          value={formdata.foodpriceHalf}
          onChange={(e) =>
            setformdata({
              ...formdata, // Spread existing state
              foodpriceHalf: e.target.value, // Update specific field
            })
          }
          required
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>calories</span>
        <input
          value={formdata.calories}
          onChange={(e) =>
            setformdata({
              ...formdata, // Spread existing state
              calories: e.target.value, // Update specific field
            })
          }
          required
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Description</span>
        <textarea
          value={formdata.description}
          onChange={(e) =>
            setformdata({
              ...formdata, // Spread existing state
              description: e.target.value, // Update specific field
            })
          }
          rows={4}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Videos</span>
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          multiple
          onChange={handleInputChange}
        />
      </label>

      <div className={styles.previewGrid}>
        {files.map((f, idx) => (
          <div className={styles.previewCard} key={idx}>
            <video
              src={URL.createObjectURL(f)}
              className={styles.previewVideo}
              controls
            />
            <div className={styles.previewMeta}>
              <div className={styles.fileName}>{f.name}</div>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeFile(idx)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button
          className={styles.createbtn}
          type="submit"
          disabled={submitting || files.length === 0}
        >
          {submitting ? "Uploading..." : "Publish Video"}
        </button>
      </div>
    </form>
  );
};

export default CreateFood;
