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
    <footer className="mt-50 px-8 lg:px-28 text-[10px] font-light tracking-[0.05rem]">
      {/* 🌐 large 화면용: 전체 영역 */}
      <div className="hidden lg:flex items-start gap-12">
        <div className="flex flex-col max-w-[150px]">
          <h2 className="font-semibold text-gray-600 mb-3">HELP</h2>
          {help.map((el) => (
            <span key={el} className="cursor-pointer mb-1">
              {el}
            </span>
          ))}
        </div>

        <div className="flex flex-col mx-5 max-w-[150px]">
          <h2 className="font-semibold text-gray-600 mb-3">FOLLOW US</h2>
          {followUs.map((el) => (
            <span key={el} className="cursor-pointer mb-1">
              {el}
            </span>
          ))}
        </div>

        <div className="flex flex-col mx-5 max-w-[150px]">
          <h2 className="font-semibold text-gray-600 mb-3">COMPANY</h2>
          {company.map((el) => (
            <span key={el} className="cursor-pointer mb-1">
              {el}
            </span>
          ))}
        </div>

        <div className="flex flex-col mx-5 max-w-[150px]">
          <h2 className="font-semibold text-gray-600 mb-3">POLICIES</h2>
          {policies.map((el) => (
            <span key={el} className="cursor-pointer mb-1">
              {el}
            </span>
          ))}
        </div>
      </div>

      {/* 📱 small ~ md 화면용: SNS만 중앙 정렬 */}
      <div className="lg:hidden flex flex-wrap justify-center items-center gap-4">
        {sns.map((el) => (
          <span key={el} className="cursor-pointer">
            {el}
          </span>
        ))}
      </div>

      {/* 🌍 Always visible 하단 문구 */}
      <div className="flex justify-center text-center text-[10px] font-light tracking-wider text-gray-500 mt-50 my-30">
        <span className="mr-4">ENGLISH</span>
        <span>© ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  );
}
