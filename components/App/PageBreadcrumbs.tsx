"use client"
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { TbArrowLeft, TbSlash } from "react-icons/tb";

const PageBreadcrumbs = () => {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <div className="flex flex-row space-x-2 text-cararra-600 items-center mb-4">
      <button onClick={() => router.back()}>
        <TbArrowLeft className="text-3xl hover:text-cararra-800" />
      </button>
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        return (
          <React.Fragment key={index}>
            <span><TbSlash className="text-2xl"/></span>
            {isLast ? (
              <span className="font-poppins items-center text-xl font-medium text-cararra-600">
                {segment}
              </span>
            ) : (
              <a
                href={`/${segments.slice(0, index + 1).join("/")}`}
                className="font-poppins items-center text-xl font-medium hover:text-cararra-800"
              >
                {segment}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PageBreadcrumbs;

