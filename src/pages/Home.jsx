import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Link
        to="products"
        className="w-full flex items-center justify-center bg-white px-0 sm:px-20"
        style={{ height: "calc(100vh - 245px - 100px)" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full sm:object-contain sm:max-w-full sm:max-h-full md:aspect-video aspect-[9/16]"
          src="https://res.cloudinary.com/ds3yde7ji/video/upload/v1744630860/nova_video_aqyavm.mp4"
        />
      </Link>
    </>
  );
}
