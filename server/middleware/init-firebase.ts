import { getApp, getApps, initializeApp } from "firebase/app";

export default defineEventHandler(async (event) => {
  event.context.app = getApps().length
    ? getApp()
    : initializeApp(JSON.parse(process.env.FIREBASE_CONFIG!));
});
