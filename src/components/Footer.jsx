export default function Footer() {
  const items = [
    "COOKIES SETTINGS",
    "PRIVACY AND COOKIES POLICY",
    "TERMS OF USE",
  ];

  const sns = [
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

  const followUs = [
    "NEWSLETTER",
    "TIKTOK",
    "INSTAGRAM",
    "FACEBOOK",
    "X",
    "PINTEREST",
    "YOUTUBE",
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
    <footer className="my-50 px-28 text-[10px] font-light tracking-[0.05rem] flex ">
      <div className="flex flex-col mr-5 max-w-[150px]">
        <h2 className="font-normal mb-3">HELP</h2>
        {help.map((el) => (
          <span className="cursor-pointer mb-1">{el}</span>
        ))}
      </div>

      <div className="flex flex-col mx-5 max-w-[150px]">
        <h2 className="font-normal mb-3">FOLLOW US</h2>
        {followUs.map((el) => (
          <span className="cursor-pointer mb-1">{el}</span>
        ))}
      </div>

      <div className="flex flex-col mx-5 max-w-[150px]">
        <h2 className="font-normal mb-3">COMPANY</h2>
        {company.map((el) => (
          <span className="cursor-pointer mb-1">{el}</span>
        ))}
      </div>

      <div className="flex flex-col mx-5 max-w-[150px]">
        <h2 className="font-normal mb-3">POLICIES</h2>
        {policies.map((el) => (
          <span className="cursor-pointer mb-1">{el}</span>
        ))}
      </div>
    </footer>
  );
}
