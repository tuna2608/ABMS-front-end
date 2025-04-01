import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from "./authSlice"
import productReducer from "./productSlice"
import usersReducer from "./userSlice"
import orderReducer from "./orderSlice"
import counterReducer from "./slices/counterSlices"
import postReducer from './postSlice'
import chatReducer from './chatSlice'
import apartmentReducer from './apartmentSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({ 
  user: userReducer, 
  post: postReducer, 
  cart: cartReducer,
  product: productReducer, 
  users: usersReducer, 
  order: orderReducer,
  counter: counterReducer,
  chat: chatReducer,
  apartment: apartmentReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

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
          'chat/sendMessageStart',
          'chat/sendMessageSuccess',
          'chat/receiveMessage'
        ],
        ignoredPaths: ['chat.messages']
      },
    }),
});

export let persistor = persistStore(store)