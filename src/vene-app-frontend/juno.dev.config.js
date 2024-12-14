import { defineDevConfig } from "@junobuild/config";

/** @type {import('@junobuild/config').JunoDevConfig} */
export default defineDevConfig(() => ({
  satellite: {
    collections: {
      db: [
        {
          collection: "image",
          read: "managed",
          write: "managed",
          memory: "stable",
          mutablePermissions: true,
        },
      ],
    },
  },
}));
