export default function Footer() {
  const items = [
    "COOKIES SETTINGS",
    "PRIVACY AND COOKIES POLICY",
    "TERMS OF USE",
  ];

  const sns = [
    "NEWSLETTER",
    "TIKTOK",
    "INSTAGRAM",
    "FACEBOOK",
    "X",
    "PINTEREST",
    "YOUTUBE",
    "SPOTIFY",
  ];

  const help = [
    "MY ZARA ACCOUNT",
    "ITEMS AND SIZES",
    "GIFT OPTIONS",
    "SHIPPING",
    "PAYMENT AND INVOICES",
    "MY PURCHASES",
    "EXCHANGES, RETURNS AND REFUNDS",
    "ZARA EXPERIENCES",
  ];

  const company = [
    "ABOUT US",
    "JOIN LIFE",
    "OFFICES",
    "STORES",
    "WORK WITH US",
  ];

  const policies = [
    "PRIVACY POLICY",
    "PURCHASE CONDITIONS",
    "GIFT CARD CONDITIONS",
    "COOKIES SETTINGS",
  ];

  return (
    <footer className="mt-20 text-[0.6875rem] font-light tracking-[0.05rem] flex justify-center">
      <div>
        <p>JOIN OUR NEWSLETTER</p>
        {sns.map((el, idx) => (
          <span key={idx} className={idx === sns.length - 1 ? "" : "mr-[1rem]"}>
            {el}
          </span>
        ))}
      </div>
      <p>
        {items.map((item, idx) => (
          <span
            key={idx}
            className={idx === items.length - 1 ? "" : "mr-[1rem]"}
          >
            {item}
          </span>
        ))}
      </p>

      <p>
        <span> ENGLISH </span>
        <span>© All rights reserved</span>
      </p>
    </footer>
  );
}
