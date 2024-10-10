import WebPageTitle from "@/components/webpage-title";
import Link from "next/link";

const Custom404 = () => {
  return (
    <>
      <WebPageTitle title="Page Not Found | DOT FE TEST" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">Page not found</p>
        <Link href="/" legacyBehavior>
          <a className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-blue-600 transition duration-300">
            Go back to Product
          </a>
        </Link>
      </div>
    </>
  );
};

export default Custom404;
