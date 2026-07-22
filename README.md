# PTR CMS (Content Management System)

CMS for managing content on the PTR/PowerDeed client website.

The cms is where editors manage services, projects, homepage
content, testimonials, contacts, company structure, and media/assets. It talks
to the backend API and prepares asset metadata before files are uploaded.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- Font Awesome
- Chart.js

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Build:

```bash
npm run build
```

Note: production builds use `next/font` Google Fonts. If the machine cannot
reach `fonts.googleapis.com`, the build can fail before application code is
compiled.

## Environment

The app talks to two backend services. CMS content requests use:

```txt
NEXT_PUBLIC_CMS_API_BASE_URL
```

Identity/session requests use:

```txt
NEXT_PUBLIC_AUTH_API_BASE_URL
```

Both Axios clients append `/api/v1`, so the values should be service origins:

```txt
NEXT_PUBLIC_CMS_API_BASE_URL=http://localhost:5500
NEXT_PUBLIC_AUTH_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_URL=http://localhost:3001/login
NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8081
NEXT_PUBLIC_KEYCLOAK_REALM=powerdeed
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=cms-app
```

## Authentication

CMS does not own a login page or forgot-password flow.

Unauthenticated API calls redirect to auth-app. Auth-app starts the Keycloak
login flow, identity-service creates the HttpOnly session cookie, and CMS calls
both backends with `withCredentials: true`.

Use these clients:

```txt
lib/api/axios.ts
  CMS content API client. Uses NEXT_PUBLIC_CMS_API_BASE_URL.

lib/api/identityAxios.ts
  Identity/session API client. Uses NEXT_PUBLIC_AUTH_API_BASE_URL.
```

Logout calls identity-service first, then redirects to Keycloak logout.

## Important Areas

```txt
features/mediaAndAssets
  Media library UI, search/filter, asset cards, delete actions.

global components/layout/fileUploader
  Shared upload/edit/linking workflow used by Media & Assets, Projects, and
  Services.

features/projects
  Project management. Project gallery media is saved as asset links.

features/servicesManagement
  Service management. Service gallery media is saved as asset links.

features/webisteContent
  Homepage and website content management.
```

## Asset Contract

The backend now treats `references` as the only reverse-link field on assets.
Do not use the old `relationships` shape.

Asset references look like:

```ts
type AssetReference = {
  id: string;
  category: string;
  usage: string;
  entityId?: string;
  field?: string;
  role?: string;
  label?: string;
};
```

Feature documents store lightweight asset links for rendering:

```ts
type AssetLink = [
  assetId: string,
  fileName: string,
  fileUrl: string,
  assetType: "image" | "video" | "document" | "diagram",
];
```

Projects and services update their local draft with asset links. The backend
rebuilds `asset.references` after the project or service is saved.

## Object Name Convention

The frontend prepares `asset.storage.objectName` before upload. The backend
respects that object name if present.

Current conventions:

```txt
projects/general/<service-name>/<project-name>/site-photos/<asset-id>/<file>
services/<service-name>/images/<asset-id>/<file>
assets/unassigned/<file-type>/<asset-id>/<file>
```

Examples:

```txt
projects/general/solar-installation/hotel-roof/site-photos/asset-123/before.jpg
services/generators/images/asset-456/generator.jpg
assets/unassigned/documents/asset-789/manual.pdf
```

## Media Management Notes

- Assets are normalized on load before rendering.
- Media search/filter uses a source list and visible list so filtering does not
  destroy the original data.
- Asset cards handle missing optional fields such as `updatedAt`, `references`,
  and `storage.publicUrl`.
- Delete defaults to `referenceAction=block`. Linked assets require unlink or
  force actions through the delete options modal.
