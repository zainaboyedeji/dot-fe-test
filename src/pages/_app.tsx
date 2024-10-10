import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/cart-context";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Layout>
          <Toaster position="top-center" richColors />
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </QueryClientProvider>
  );
}
