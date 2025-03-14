"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
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

  // Update the checkApiHealth function to handle fetch errors properly

  const checkApiHealth = useCallback(
    async (e?: React.MouseEvent) => {
      if (e) e.preventDefault();

      try {
        setApiStatus("checking");
        if (e) setApiMessage("Checking API connection..."); // Only show message on manual check

        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch("/api/healthcheck", {
          signal: controller.signal,
          // Add cache-busting query parameter
          headers: { "Cache-Control": "no-cache" },
        });

        clearTimeout(timeoutId);

        const data = await response.json();

        if (response.ok && data.status === "ok") {
          setApiStatus("success");
          if (e) setApiMessage("Database connected successfully!");
        } else {
          setApiStatus("error");
          setApiMessage(data.message || "API check failed");
        }
      } catch (error) {
        setApiStatus("error");

        // More detailed error messages
        if (error instanceof DOMException && error.name === "AbortError") {
          setApiMessage("API check timed out. Server may be slow.");
        } else {
          setApiMessage("Failed to connect to API");
          console.error("API check error:", error);
        }
      }

      // Hide toast message after 2 seconds, but only if it was set
      if (apiMessage) {
        setTimeout(() => {
          setApiMessage("");
        }, 2000);
      }
    },
    [apiMessage]
  ); // Empty dependency array since we don't use any external values

  // Check API status on component mount and periodically
  useEffect(() => {
    checkApiHealth();

    // Check API every 30 seconds
    const interval = setInterval(() => {
      checkApiHealth();
    }, 60000);

    return () => clearInterval(interval);
  }, [checkApiHealth]);

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

  return (
    <>
      <header className="bg-black max-w-4xl md:max-w-10/12 mx-auto text-white h-16 flex items-center justify-between px-6">
        <div id="header" className="hover:underline md:text-4xl font-bold">
          <Link href="/">NGOANE</Link>
        </div>

        <div className="col-span-1 grid grid-cols-1 gap-4">
          {/* Status Indicator Circle */}
          <div className="hidden sm:flex items-center justify-center absolute top-5 right-28">
            <div
              className="relative group cursor-pointer"
              onClick={checkApiHealth}
            >
              {apiStatus === "checking" ? (
                <div className="w-5 h-5 rounded-full bg-blue-400 animate-pulse" />
              ) : apiStatus === "success" ? (
                <div className="w-5 h-5 rounded-full bg-green-500" />
              ) : apiStatus === "error" ? (
                <div className="w-5 h-5 rounded-full bg-red-500" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-gray-400" />
              )}

              {/* Tooltip */}
              <div className="absolute hidden group-hover:block top-6 right-0 w-48 bg-gray-900 text-white text-xs rounded py-1 px-2">
                {apiStatus === "checking"
                  ? "Checking API connection..."
                  : apiStatus === "success"
                  ? "API connected successfully"
                  : apiStatus === "error"
                  ? "API connection failed"
                  : "Click to check API status"}
              </div>
            </div>
          </div>

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

            {/* Mobile-only status indicator */}
            <div
              className="sm:hidden flex items-center gap-2 py-4"
              onClick={checkApiHealth}
            >
              {apiStatus === "checking" ? (
                <>
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                  <span>Checking API...</span>
                </>
              ) : apiStatus === "success" ? (
                <>
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>API Connected</span>
                </>
              ) : apiStatus === "error" ? (
                <>
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>API Error</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 rounded-full bg-gray-400" />
                  <span>Check API</span>
                </>
              )}
            </div>

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

      {/* API Status Toast - only show when explicitly checking or on error */}
      {apiMessage && (
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
