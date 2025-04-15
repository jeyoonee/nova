import { useNavigate } from "react-router-dom";

export default function ProductCard({ id, imageUrl, name, price }) {
  const navigate = useNavigate();

  return (
    <li
      key={id}
      className="p-0 text-[11px] text-[#000000] ∂cursor-pointer"
      onClick={() => navigate(`${id}`)}
    >
      <div className="w-full aspect-[2/3] overflow-hidden">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <p className="truncate mt-2">{name}</p>
      <p>$ {price.toLocaleString()}</p>
    </li>
  );
}
