export default function Footer() {
  const HELP = [
    "MY ZARA ACCOUNT",
    "ITEMS AND SIZES",
    "GIFT OPTIONS",
    "SHIPPING",
    "PAYMENT AND INVOICES",
    "MY PURCHASES",
    "EXCHANGES, RETURNS AND REFUNDS",
    "ZARA EXPERIENCES",
  ];

  return (
    <footer className="text-[0.6875rem] font-light tracking-[0.05rem] flex">
      {items.map((item, idx) => (
        <span key={idx} className={idx === items.length - 1 ? "" : "mr-[1rem]"}>
          {item}
        </span>
      ))}
    </footer>
  );
}
