import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Link
        to="products"
        className="w-full flex items-center justify-center bg-white px-20"
        style={{ height: "calc(100vh - 245px - 100px)" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="max-w-full max-h-full object-contain"
          src="https://res.cloudinary.com/ds3yde7ji/video/upload/v1744630860/nova_video_aqyavm.mp4"
        />
      </Link>
    </>
  );
}
