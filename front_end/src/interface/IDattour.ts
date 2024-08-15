export interface IDattour {
    id: number;
    ten_tour: string;
    diem_di: string;
    diem_den: string;
    lich_khoi_hanh: Date;
    ngay_ket_thuc: Date;
    diem_khoi_hanh: string;
    gia_nguoilon: number;
    gia_treem: number;
    mo_ta: string;
    soluong: number;
    trang_thai: number;
    ma_loai_tour: number;
    data: any;
    sdt: string;
    images:string,
    image_path:string
}

export interface IUserdat {
    id: number;
    name: string;
    image: string;
    dia_chi: string;
    email: string;
    sdt: string;
    cccd: string;
    email_verified_at: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;

}
