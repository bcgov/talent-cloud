/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_KEYCLOAK_CLIENT: string;
  readonly VITE_KEYCLOAK_AUTH_URL: string;
  readonly VITE_KEYCLOAK_REALM: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
