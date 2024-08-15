export interface TourDiemDen {
    id: number;
    ten_tour: string;
    image_path: string;
    diem_di: string;
    diem_den: string;
    lich_khoi_hanh: string;
    ngay_ket_thuc: string;
    diem_khoi_hanh: string;
    gia_nguoilon: number;
    gia_treem: number;
    mo_ta: string;
    soluong: number;
    trang_thai: number;
    ma_loai_tour: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    images: any[]; // Loại này có thể được sửa chữa tùy theo dữ liệu thực tế
  }
  
export interface TourDiemDenResponse {
    tourdiemden: TourDiemDen[];
    tourdiemdencout: number;
  }