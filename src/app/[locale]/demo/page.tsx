"use client";
import DecryptedText from "@/components/animated/decrypted-text";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Demo() {
  const t = useTranslations("demo");

  return (
    <main className="min-h-screen py-32 bg-black text-white title-3">
      <div className="container">
        <section className="mb-16">
          <h2 className="display-4 font-bold text-primary">Decrypted Text</h2>
          <div className="space-y-4">
            <DecryptedText text="Decrypted Text" className="title-2 font-medium text-white/50 uppercase text-center" />
          </div>
        </section>

        {/* Components Section */}
        <section className="mb-16">
          <h2 className="display-4 font-bold text-primary">Components</h2>
          <div className="space-y-4">
            <Image
              src="/placeholder.png"
              alt="Favicon"
              width={1400}
              height={810}
              priority
            />
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <h2 className="display-4 font-bold text-primary">
            {t("typography")}
          </h2>

          <div className="space-y-4">
            <div>
              <span className="display-1">Display 1</span> - 434px/100%/August
            </div>
            <div>
              <span className="display-2">Display 2</span> -
              200px/120%/August/1%
            </div>
            <div>
              <span className="display-3">Display 3</span> -
              64px/150%/Mokoto/-0.03%
            </div>
            <div>
              <span className="display-4">Display 4</span> -
              56px/120%/SVN-Gilroy/0.02%
            </div>
            <div>
              <span className="display-5">Display 5</span> -
              48px/120%/SVN-Gilroy/0.02%
            </div>
            <div>
              <span className="display-6">Display 6</span> - 40px/150%/Mokoto
            </div>

            <div>
              <span className="headline-1">Headline 1</span> -
              32px/120%/SVN-Gilroy
            </div>
            <div>
              <span className="headline-2">Headline 2</span> -
              28px/120%/SVN-Gilroy
            </div>
            <div>
              <span className="headline-3">Headline 3</span> -
              24px/150%/SVN-Gilroy
            </div>

            <div>
              <span className="title-1">Title 1</span> - 22px/120%/SVN-Gilroy
            </div>
            <div>
              <span className="title-2">Title 2</span> - 20px/150%/SVN-Gilroy
            </div>
            <div>
              <span className="title-3">Title 3</span> - 18px/120%/SVN-Gilroy
            </div>

            <div>
              <span className="button-1">Button 1</span> - 12px/150%/SVN-Gilroy
            </div>

            <div>
              <span className="body-1">Body 1</span> - 16px/120%/SVN-Gilroy
            </div>
          </div>
        </section>

        {/* Colors Section */}
        <section className="mb-16">
          <h2 className="display-4 font-bold text-primary mb-8">
            {t("colors")}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-primary text-white">Primary</div>

            <div className="p-4 rounded-lg bg-gray-50">Gray 50</div>
            <div className="p-4 rounded-lg bg-gray-100">Gray 100</div>
            <div className="p-4 rounded-lg bg-gray-200">Gray 200</div>
            <div className="p-4 rounded-lg bg-gray-300">Gray 300</div>
            <div className="p-4 rounded-lg bg-gray-400">Gray 400</div>
            <div className="p-4 rounded-lg bg-gray-500 text-white">
              Gray 500
            </div>
            <div className="p-4 rounded-lg bg-gray-600 text-white">
              Gray 600
            </div>
            <div className="p-4 rounded-lg bg-gray-700 text-white">
              Gray 700
            </div>
            <div className="p-4 rounded-lg bg-gray-800 text-white">
              Gray 800
            </div>
            <div className="p-4 rounded-lg bg-gray-900 text-white">
              Gray 900
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="display-4 font-bold text-primary mb-8">
            {t("buttons")}
          </h2>

          <div className="space-y-8">
            <div className="space-x-4">
              <button className="btn btn-primary">
                <span className="inner">Primary Button</span>
              </button>
              {/* <button className="btn-primary" disabled>
                <span className="inner">Nội dung</span>
              </button> */}
            </div>

            <div className="space-x-4">
              <button className="btn btn-secondary">
                <span className="inner">Secondary Button</span>
              </button>
              {/* <button className="btn-secondary" disabled>
                Secondary Disabled
              </button> */}
            </div>

            <div className="space-x-4">
              <button className="btn-navigation">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="btn-navigation" disabled>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Gradient Section */}
        <section>
          <h2 className="headline-1 mb-8">{t("gradients")}</h2>

          <div className="h-32 bg-linear-blue rounded-lg text-white flex items-center justify-center">
            <span className="body-1">Linear Blue Gradient</span>
          </div>
        </section>
      </div>
    </main>
  );
}
