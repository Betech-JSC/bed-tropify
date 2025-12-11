"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type I18nParamsType = {
  vi?: Record<string, string | number | boolean | null>;
  en?: Record<string, string | number | boolean | null>;
};

interface I18nParamsContextType {
  i18nParams: I18nParamsType;
  setI18nParams: (params: I18nParamsType) => void;
}

const I18nParamsContext = createContext<I18nParamsContextType | undefined>(
  undefined
);

export const I18nParamsProvider = ({
  children,
  initialParams = {},
}: {
  children: ReactNode;
  initialParams?: I18nParamsType;
}) => {
  const [i18nParams, setI18nParamsState] =
    useState<I18nParamsType>(initialParams);

  const handleSetI18nParams = (params: I18nParamsType) => {
    setI18nParamsState(params);
  };

  return (
    <I18nParamsContext.Provider
      value={{
        i18nParams,
        setI18nParams: handleSetI18nParams,
      }}
    >
      {children}
    </I18nParamsContext.Provider>
  );
};

export const useI18nParams = () => {
  const context = useContext(I18nParamsContext);
  if (context === undefined) {
    throw new Error("useI18nParams phải được sử dụng trong I18nParamsProvider");
  }
  return context;
};
