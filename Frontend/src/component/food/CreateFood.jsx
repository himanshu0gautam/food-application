import React, { useState, useRef } from 'react'
import styles from './CreateFood.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState([])
  const inputRef = useRef(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)


  const navigate = useNavigate();

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList)
    // only accept video types
    const videos = arr.filter(f => f.type.startsWith('video/'))
    setFiles(prev => [...prev, ...videos])
  }

  const handleInputChange = (e) => {
    handleFiles(e.target.files)
    // reset input so same file can be selected again
    e.target.value = null
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const form = new FormData()
      form.append('foodname', name)
      form.append('description', description)
      // append first video file as main; if multiple, append with same field name
      files.forEach((f, i) => form.append('file', f))

      const res = await axios.post('http://localhost:3000/api/food/upload', form, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      navigate("/home")

      console.log('upload response', res.data)
      // reset
      setName('')
      setDescription('')
      setFiles([])
      if (inputRef.current) inputRef.current.value = null
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.message || err.message || 'Upload failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <h2>Create Food</h2>
      {error && <div className={styles.error}>{error}</div>}

      <label className={styles.field}>
        <span className={styles.label}>Name</span>
        <input value={name} onChange={e => setName(e.target.value)} required />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Description</span>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Videos</span>
        <input ref={inputRef} type="file" accept="video/*" multiple onChange={handleInputChange} />
      </label>

      <div className={styles.previewGrid}>
        {files.map((f, idx) => (
          <div className={styles.previewCard} key={idx}>
            <video src={URL.createObjectURL(f)} className={styles.previewVideo} controls />
            <div className={styles.previewMeta}>
              <div className={styles.fileName}>{f.name}</div>
              <button type="button" className={styles.removeBtn} onClick={() => removeFile(idx)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.createbtn} type="submit" disabled={submitting || files.length === 0}>{submitting ? 'Uploading...' : 'Save Food'}</button>
      </div>
    </form>
  )
}

export default CreateFood