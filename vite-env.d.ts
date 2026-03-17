/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_API_URL: string;
  readonly NEXT_PUBLIC_API_IMAGES: string;
  readonly NEXT_PUBLIC_DOMAIN_URL: string;
  readonly NEXT_PUBLIC_GA_ID: string;
  readonly NEXT_PUBLIC_PARTNER_1: string;
  readonly NEXT_PUBLIC_USE_MOCK_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
