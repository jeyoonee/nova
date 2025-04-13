import { useState } from "react";
import { uploadImageToCloudinary } from "../services/cloudinaryService";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useUser } from "../context/UserContext";

export default function Edit() {
  const { user } = useUser();
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    options: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("이미지를 먼저 업로드해주세요");

    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      setImageUrl(uploadedUrl);

      console.log("현재 유저:", user); // context든 auth().currentUser든
      console.log("이미지 URL:", imageUrl);

      await addDoc(collection(db, "products"), {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        description: form.description,
        options: form.options.split(",").map((opt) => opt.trim()),
        imageUrl: uploadedUrl,
        createdAt: serverTimestamp(),
      });

      alert("상품 등록 완료");
      setForm({
        name: "",
        price: "",
        category: "",
        description: "",
        options: "",
      });
      setImageUrl("");
      setFile(null);
    } catch (err) {
      console.error("상품 등록 에러:", err);
      alert("상품 등록에 실패했습니다.");
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-4">새로운 제품 등록</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {imageUrl && (
          <img
            src={imageUrl}
            alt="preview"
            className="w-40 h-40 object-cover"
          />
        )}

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="제품명"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="가격"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="카테고리"
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="제품 설명"
        />
        <input
          type="text"
          name="options"
          value={form.options}
          onChange={handleChange}
          placeholder="옵션들(콤마로 구분)"
        />

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          상품 등록
        </button>
      </form>
    </>
  );
}
