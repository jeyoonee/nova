import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex w-full justify-between">
      <Link to="/">로고이미지</Link>
      <div>아이콘들</div>
    </header>
  );
}
