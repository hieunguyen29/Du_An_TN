import TourApi, { tourRedeucer } from "../api/TourApi";
import LoaiTourApi, { LoaiTourRedeucer } from "../api/LoaiTourApi";

import LoaiPhuongTienApi, { LoaiPhuongTienRedeucer } from "../api/LoaiPhuongTienApi";

import HuongDanVienApi, { HuongDanVienRedeucer } from "../api/HuongDanVienApi";

import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Cấu hình persist ( lưu localStorage )
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}
const rootReducer = combineReducers({
    [TourApi.reducerPath]: tourRedeucer,
    [LoaiTourApi.reducerPath]: LoaiTourRedeucer,

    [LoaiPhuongTienApi.reducerPath]: LoaiPhuongTienRedeucer,

    [HuongDanVienApi.reducerPath]: HuongDanVienRedeucer,

})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(TourApi.middleware, LoaiTourApi.middleware, HuongDanVienApi.middleware),
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
export default persistStore(store)


