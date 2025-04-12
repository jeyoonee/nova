export default function Footer() {
  const items = [
    "COOKIES SETTINGS",
    "PRIVACY AND COOKIES POLICY",
    "TERMS OF USE",
  ];

  return (
    <footer className="text-[0.6875rem] font-light tracking-[0.05rem] flex justify-center">
      {items.map((item, idx) => (
        <span key={idx} className={idx === items.length - 1 ? "" : "mr-[1rem]"}>
          {item}
        </span>
      ))}
    </footer>
  );
}
