"use client";
import Link from "next/link";
import { useState } from "react";
import TestRecord from "@/types/TestRecord";
import CreateModal from "./modals/CreateModal";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState<
    "idle" | "checking" | "success" | "error"
  >("idle");
  const [apiMessage, setApiMessage] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleOpenCreateModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCreateModalOpen(true);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false); // Close mobile menu when modal opens
    }
  };

  const handleCreateSuccess = (newTest: TestRecord) => {
    window.location.href = `/tests/${newTest.id}`;
  };

  const checkApiHealth = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();

    try {
      setApiStatus("checking");
      setApiMessage("Checking API connection...");

      const response = await fetch("/api/healthcheck");
      const data = await response.json();

      if (response.ok && data.status === "ok") {
        setApiStatus("success");
        setApiMessage("Database connected successfully!");
      } else {
        setApiStatus("error");
        setApiMessage(data.message || "API check failed");
      }
    } catch (error) {
      setApiStatus("error");
      setApiMessage("Failed to connect to API");
      console.error("API check error:", error);
    }

    // Hide status after 5 seconds
    setTimeout(() => {
      setApiStatus("idle");
      setApiMessage("");
    }, 5000);
  };

  return (
    <>
      <header className="bg-black max-w-4xl md:max-w-10/12 mx-auto text-white h-16 flex items-center justify-between px-6">
        <div id="header" className="hover:underline md:text-4xl font-bold">
          <Link href="/">NGOANE</Link>
        </div>
        <div className="col-span-1 grid grid-cols-1 gap-4">
          <button
            id="mobile-open-button"
            className={`${
              isMobileMenuOpen
                ? "hidden"
                : "text-3xl justify-self-end sm:hidden focus:outline-none z-50"
            }`}
            onClick={toggleMobileMenu}
          >
            &#9776;
          </button>
          <button
            id="mobile-close-button"
            className={`${
              isMobileMenuOpen
                ? "text-3xl justify-self-end focus:outline-none z-50 "
                : "hidden"
            }`}
            onClick={toggleMobileMenu}
          >
            &times;
          </button>

          <nav
            className={`${
              isMobileMenuOpen
                ? "flex h-dvh w-dvw top-0 left-0 pt-16 absolute bg-black flex-col items-center text-center z-10"
                : "hidden sm:flex gap-8 items-center justify-evenly z-10"
            }`}
          >
            <Link
              href="/tests"
              className="!m-0 py-4 sm:py-0 hover:text-blue-600 hover:underline hover:underline-offset-2"
              onClick={() => isMobileMenuOpen && toggleMobileMenu()}
            >
              Tests
            </Link>

            <Link
              href="#"
              onClick={handleOpenCreateModal}
              className="!m-0 py-4 sm:py-0 hover:text-blue-600 hover:underline hover:underline-offset-2"
            >
              Create test
            </Link>

            <button
              onClick={checkApiHealth}
              className={`!m-0 py-4 sm:py-0 hover:text-blue-600 hover:underline hover:underline-offset-2 flex items-center gap-2 ${
                apiStatus === "success"
                  ? "text-green-400"
                  : apiStatus === "error"
                  ? "text-red-400"
                  : "text-white"
              }`}
            >
              {apiStatus === "checking" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : apiStatus === "success" ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  API OK
                </>
              ) : apiStatus === "error" ? (
                <>
                  <XCircle className="h-4 w-4" />
                  API Error
                </>
              ) : (
                <>API Check</>
              )}
            </button>

            <Link
              href="#"
              onClick={() => {
                alert("Feature not available");
                if (isMobileMenuOpen) toggleMobileMenu();
              }}
              className="!m-0 py-4 sm:py-0 hover:text-blue-600 hover:underline hover:underline-offset-2"
            >
              More
            </Link>
          </nav>
        </div>
      </header>

      {/* API Status Toast */}
      {apiStatus !== "idle" && apiMessage && (
        <div
          className={`fixed top-20 right-4 p-4 rounded-md shadow-lg z-50 max-w-xs transition-all duration-300 ${
            apiStatus === "checking"
              ? "bg-blue-50 text-blue-800 border border-blue-300"
              : apiStatus === "success"
              ? "bg-green-50 text-green-800 border border-green-300"
              : "bg-red-50 text-red-800 border border-red-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {apiStatus === "checking" && (
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            )}
            {apiStatus === "success" && (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
            {apiStatus === "error" && (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            <p>{apiMessage}</p>
          </div>
        </div>
      )}

      {/* Add Create Modal component */}
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </>
  );
};

export default Header;
