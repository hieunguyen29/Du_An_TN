export interface IQuanlyDattour {
    data:any
      id: number;
      image_path:string;
      ten_khach_hang: string;
      email: string;
      sdt: string;
      ten_tour: string;
      dia_chi: string;
      cccd: string | null;
      ngay_dat: string;
      so_luong_khach: number;
      trang_thai: number;
      ma_khach_hang: string | null;
      id_tour: number;
      created_at: string;
      updated_at: string;
      thanh_toan: {
        id_tt: number;
        ma_giao_dich: number;
        tong_tien_tt: number;
        pttt: string;
        ma_phan_hoi: string | null;
        ghi_chu: string | null;
        ma_ngan_hang: string | null;
        ngay_thanh_toan: string;
        id_dat_tour: number;
        created_at: string;
        updated_at: string;
      };
      tours: {
        id: number;
        ten_tour: string;
        diem_di: string;
        diem_den: string;
        lich_khoi_hanh: string;
        ngay_ket_thuc: string;
        diem_khoi_hanh: string;
        gia_nguoilon: number;
        gia_treem: number;
        gia_khuyen_mai: number;
        mo_ta: string;
        soluong: number;
        trang_thai: number;
        image_path:string,
        ma_loai_tour: number;
        created_at: string | null;
        updated_at: string | null;
        deleted_at: string | null;
      };
    }