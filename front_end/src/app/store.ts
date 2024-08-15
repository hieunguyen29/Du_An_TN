import TourApi, { tourRedeucer } from "../api/TourApi";
import LoaiTourApi, { LoaiTourRedeucer } from "../api/LoaiTourApi";
import LoaiPhuongTienApi, {
  LoaiPhuongTienRedeucer,
} from "../api/LoaiPhuongTienApi";
import DiaDiemApi, { DiaDiemRedeucer } from "../api/DiaDiemApi";
// import ImagesApi, { imagesRedeucer } from "../api/ImagesApi";
import TourImagesApi, { TourImagesRedeucer } from "../api/TourImagesApi";
import HuongDanVienApi, { HuongDanVienRedeucer } from "../api/HuongDanVienApi";
import LichTrinhApi, { LichTrinhRedeucer } from "../api/LichTrinhApi";
import KhachSanApi, { KhachSanRedeucer } from "../api/KhachSanApi";
import UserApi, { UserReducer } from "../api/UserApi";
import DatourApi, { DattourReducer } from "../api/dattour";
import DiscountApi, { DiscountRedeucer } from "../api/discountApi";
import TourDiscountApi, { TourDiscountRedeucer } from "../api/TourDiscountApi";
import CheckingApi, { CheckingReducer } from "../api/Check";
import MenuApi, { MenuReducer } from "../api/menu";
import Tourdiadiem, { TourDiadiemReducer } from "../api/tourdiadiem";
import PostDmApi, { postdmRedeucer } from "../api/postdm";
import PostApi, { postRedeucer } from "../api/post";
import BannerApi, {BannerReducer} from "../api/Slider";

import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import DangNhapApi, { DangNhapReducer } from "../api/dangnhap";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import QuanlydattoutApi, { QuanlydattourReducer } from "../api/qlydattour";
import HuongDanVienTourApi from "../api/hdvTourApi";
import NotificationApi, { NotificationReducer } from "../api/notification";

// Cấu hình persist ( lưu localStorage )
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
const rootReducer = combineReducers({
  [TourApi.reducerPath]: tourRedeucer,
  [LoaiTourApi.reducerPath]: LoaiTourRedeucer,
  [LoaiPhuongTienApi.reducerPath]: LoaiPhuongTienRedeucer,
  [DiaDiemApi.reducerPath]: DiaDiemRedeucer,
  [HuongDanVienApi.reducerPath]: HuongDanVienRedeucer,
  // [ImagesApi.reducerPath]: imagesRedeucer,
  [DangNhapApi.reducerPath]: DangNhapReducer,
  [TourImagesApi.reducerPath]: TourImagesRedeucer,
  [UserApi.reducerPath]: UserReducer,
  [LichTrinhApi.reducerPath]: LichTrinhRedeucer,
  [KhachSanApi.reducerPath]: KhachSanRedeucer,
  [DatourApi.reducerPath]: DattourReducer,
  [DiscountApi.reducerPath]: DiscountRedeucer,
  [TourDiscountApi.reducerPath]: TourDiscountRedeucer,
  [CheckingApi.reducerPath]: CheckingReducer,
  [QuanlydattoutApi.reducerPath]: QuanlydattourReducer,
  [MenuApi.reducerPath]: MenuReducer,
  [Tourdiadiem.reducerPath]: TourDiadiemReducer,
  [HuongDanVienTourApi.reducerPath]: HuongDanVienRedeucer,
  [PostDmApi.reducerPath]: postdmRedeucer,
  [PostApi.reducerPath]: postRedeucer,
  [NotificationApi.reducerPath]: NotificationReducer,
  [BannerApi.reducerPath] : BannerReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      TourApi.middleware,
      LoaiTourApi.middleware,

      LoaiPhuongTienApi.middleware, DiaDiemApi.middleware,
      HuongDanVienApi.middleware,
      TourImagesApi.middleware, LichTrinhApi.middleware, DangNhapApi.middleware,
      LoaiPhuongTienApi.middleware, DiaDiemApi.middleware,
      HuongDanVienApi.middleware, KhachSanApi.middleware,
      UserApi.middleware, DatourApi.middleware, DiscountApi.middleware, TourDiscountApi.middleware
      , CheckingApi.middleware, QuanlydattoutApi.middleware, MenuApi.middleware, Tourdiadiem.middleware, HuongDanVienTourApi.middleware, PostDmApi.middleware, PostApi.middleware, NotificationApi.middleware, BannerApi.middleware),


})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default persistStore(store);
