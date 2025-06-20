import React, { useState } from "react";
import axios from "axios";

export const UploadCardForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    // Добавить другие поля, если нужно
    await axios.post("/api/cards/upload/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Карточка загружена");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files?.[0] || null)}
        className="file-input"
      />
      <button type="submit" className="btn btn-primary">
        Загрузить карточку
      </button>
    </form>
  );
};