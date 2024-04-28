import { configureStore } from '@reduxjs/toolkit';
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
import storage from "redux-persist/lib/storage";

import userReducer from "./slice/userSlice";
import { GetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: { user: rootReducer },
    middleware: (getDefaultMiddleware: GetDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export let persistor = persistStore(store);
export default store;