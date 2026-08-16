import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import usersReducer from "./userSlice";
import orderReducer from "./orderSlice";
import postReducer from "./postSlice";
import chatReducer from "./chatSlice";
import apartmentReducer from "./apartmentSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storageLib from "redux-persist/lib/storage";

// redux-persist/lib/storage là CommonJS; dưới Vite/ESM default export có thể
// nằm ở `.default`, nên lấy fallback để tránh "storage.getItem is not a function".
const storage = storageLib.default || storageLib;

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  users: usersReducer,
  order: orderReducer,
  chat: chatReducer,
  apartment: apartmentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "chat/sendMessageStart",
          "chat/sendMessageSuccess",
          "chat/receiveMessage",
        ],
        ignoredPaths: ["chat.messages"],
      },
    }),
});

export let persistor = persistStore(store);
