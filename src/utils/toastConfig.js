import { toast } from "react-hot-toast";

const commonStyle = {
  border: "1px solid #aaa",
  background: "#fff",
  color: "#000",
  fontSize: "12px",
  fontWeight: 300,
  borderRadius: "0px",
  padding: "10px 20px",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  boxShadow: "none",
};

// 성공 토스트
export const showSuccess = (message = "SAVED CHANGE") =>
  toast.success(message, {
    icon: "✓",
    duration: 1500,
    style: commonStyle,
    position: "top-center", // ↓ 아래 커스텀 위치로 덮어씌움
  });

// 에러 토스트
export const showError = (message = "에러가 발생했어요") =>
  toast.error(message, {
    duration: 2000,
    style: commonStyle,
    position: "top-center",
  });

// 일반 메시지
export const showToast = (message) =>
  toast(message, {
    duration: 1500,
    style: commonStyle,
    position: "top-center",
  });
