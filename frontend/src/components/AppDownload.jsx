import { assets } from "../assets/assets";

function AppDownload() {
  return (
    <div className="m-auto mt-10 mb-10 md:mb-20 pt-10 text-center" id="mobile-app">
      <p
        style={{ fontSize: "max(3vw, 20px)" }}
        className="capitalize font-semibold"
      >
        For a better experience, download <br /> the Tomato app
      </p>
      <div
        style={{ gap: "max(2vw,10px)" }}
        className="flex justify-center mt-10 "
      >
        <img
          style={{ width: "max(30vw,120px)", maxWidth: "180px" }}
          src={assets.play_store}
          alt="Google Play Store"
          className="cursor-pointer transition duration-300 hover:scale-105"
        />
        <img
          style={{ width: "max(30vw,120px)", maxWidth: "180px" }}
          src={assets.app_store}
          alt="Apple Play Store"
          className="cursor-pointer transition duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
}

export default AppDownload;
