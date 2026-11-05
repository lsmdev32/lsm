import { getApp, getApps, initializeApp } from "firebase/app";
import { z } from "zod";

const FIREBASE_CONFIG_ERROR =
  "FIREBASE_CONFIG environment variable must hold Firebase options.";

const firebaseOptionsSchema = z
  .object({
    apiKey: z.string().optional(),
    appId: z.string().optional(),
    authDomain: z.string().optional(),
    databaseURL: z.string().optional(),
    measurementId: z.string().optional(),
    messagingSenderId: z.string().optional(),
    projectId: z.string().optional(),
    storageBucket: z.string().optional(),
  })
  .passthrough();

function readFirebaseOptions() {
  const rawConfig = process.env.FIREBASE_CONFIG;

  if (rawConfig === undefined || rawConfig === "") {
    throw new Error(FIREBASE_CONFIG_ERROR);
  }

  const parsedConfig = firebaseOptionsSchema.safeParse(JSON.parse(rawConfig));

  if (!parsedConfig.success) {
    throw new Error(FIREBASE_CONFIG_ERROR);
  }

  return parsedConfig.data;
}

export default defineEventHandler(async (event) => {
  event.context.app =
    getApps().length > 0 ? getApp() : initializeApp(readFirebaseOptions());
});
