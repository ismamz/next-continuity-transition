import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Continuity Transition",
  description:
    "An example of how to implement a continuity transition in Next.js using next-transition-router.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>

        <div className="fixed bottom-6 text-center w-full">
          <a
            href="https://github.com/ismamz/next-continuity-transition"
            className="inline-flex items-center gap-3 uppercase font-semibold"
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7153 0.181885C6.08533 0.181885 0.715332 5.55188 0.715332 12.1819C0.715332 17.4919 4.15033 21.9769 8.92033 23.5669C9.52033 23.6719 9.74533 23.3119 9.74533 22.9969C9.74533 22.7119 9.73033 21.7669 9.73033 20.7619C6.71533 21.3169 5.93533 20.0269 5.69533 19.3519C5.56033 19.0069 4.97533 17.9419 4.46533 17.6569C4.04533 17.4319 3.44533 16.8769 4.45033 16.8619C5.39533 16.8469 6.07033 17.7319 6.29533 18.0919C7.37533 19.9069 9.10033 19.3969 9.79033 19.0819C9.89533 18.3019 10.2103 17.7769 10.5553 17.4769C7.88533 17.1769 5.09533 16.1419 5.09533 11.5519C5.09533 10.2469 5.56033 9.16688 6.32533 8.32688C6.20533 8.02688 5.78533 6.79688 6.44533 5.14688C6.44533 5.14688 7.45033 4.83188 9.74533 6.37688C10.7053 6.10688 11.7253 5.97188 12.7453 5.97188C13.7653 5.97188 14.7853 6.10688 15.7453 6.37688C18.0403 4.81688 19.0453 5.14688 19.0453 5.14688C19.7053 6.79688 19.2853 8.02688 19.1653 8.32688C19.9303 9.16688 20.3953 10.2319 20.3953 11.5519C20.3953 16.1569 17.5903 17.1769 14.9203 17.4769C15.3553 17.8519 15.7303 18.5719 15.7303 19.6969C15.7303 21.3019 15.7153 22.5919 15.7153 22.9969C15.7153 23.3119 15.9403 23.6869 16.5403 23.5669C18.9229 22.7633 20.9933 21.2324 22.4599 19.1899C23.9265 17.1475 24.7154 14.6964 24.7153 12.1819C24.7153 5.55188 19.3453 0.181885 12.7153 0.181885Z"
                fill="currentColor"
              ></path>
            </svg>
            <span>GitHub</span>
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>
      </body>
    </html>
  );
}
