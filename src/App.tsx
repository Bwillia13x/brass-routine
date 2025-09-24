import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner";
import Analytics from "@/components/Analytics";
import PWAManifest from "@/components/PWAManifest";
// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Membership = lazy(() => import("./pages/Membership"));
const Contact = lazy(() => import("./pages/Contact"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const Auth = lazy(() => import("./pages/Auth"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cancellation = lazy(() => import("./pages/Cancellation"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoadingFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <LoadingSpinner size="lg" text="Loading..." />
  </div>
);

// Create QueryClient outside component to prevent recreation on every render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <PWAManifest />
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Analytics />
            <Suspense fallback={<PageLoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/reserve" element={<Membership />} />
                <Route path="/skinbar" element={<Services />} />
                <Route path="/wedding" element={<Services />} />
                <Route path="/about" element={<Index />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/book" element={<BookingPage />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cancellation" element={<Cancellation />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
