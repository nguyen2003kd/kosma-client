// import Footer from "@/components/common/footer";
// import Header from "@/components/common/header";
// import { LoadingSpinner } from "@/components/common/loading";
// import Providers from "@/components/providers";
'use client';
import { FallbackSpinner } from "@/components/ui/fallbackspinner";
import AuthGuard from "@auth/AuthGuard"; // Changed from GuestGuard to AuthGuard
// import { Toaster } from "@components/ui/toaster";
// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "../globals.css";

import { AbilityProvider } from "@/components/providers/ability-provider";
import { RouteGuard } from "@/auth/RouteGuard";
import { Toaster } from "@/components/ui/toaster";
import useSyncUserProfile from "@/hooks/use-sync-user-profile";
// NESTED LAYOUTS không được có <html>, <body>, Providers, Header, Footer, Toaster
// Những thứ này chỉ có trong ROOT LAYOUT (app/layout.tsx)

// const geistSans = localFont({
//   src: "../fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "../fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "SMEQ - Hỗ trợ doanh nghiệp",
//   description: "Nền tảng hỗ trợ doanh nghiệp vừa và nhỏ",
// };

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useSyncUserProfile();
  return (
    <AuthGuard fallback={<FallbackSpinner fullScreen={true} />}>
      <AbilityProvider>
        <RouteGuard fallback={<FallbackSpinner fullScreen={true} />}>
          {children}
        </RouteGuard>
      </AbilityProvider>
      <Toaster
        richColors
        closeButton
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          className: "p-3 gap-2",
          classNames: {
            closeButton:
              "left-auto right-0 top-0 -translate-y-2.5 translate-x-0",
          },
        }}
      />
    </AuthGuard>
  );
}

// CODE CŨ (gây lỗi duplicate html/body):
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="vi">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <Providers>
//           <GuestGuard fallback={<LoadingSpinner />}>
//             <Header className="fixed top-0 left-0 w-full overflow-visible" />
//             <main className="min-h-screen">{children}</main>
//             <Footer />
//           </GuestGuard>
//         </Providers>
//         <Toaster
//           richColors
//           closeButton
//           position="bottom-right"
//           toastOptions={{
//             duration: 3000,
//             className: "p-3 gap-2",
//             classNames: {
//               closeButton:
//                 "left-auto right-0 top-0 -translate-y-2.5 translate-x-0",
//             },
//           }}
//         />
//       </body>
//     </html>
//   );
// }
