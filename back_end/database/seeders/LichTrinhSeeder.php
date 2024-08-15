<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LichTrinhSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('lich_trinh')->insert([
            [
                'noi_dung' => 'Quý khách tập trung tại Sân bay Đà Nẵng, Ga đi Trong Nước. Hướng dẫn viên làm thủ tục cho Quý khách đáp chuyến bay đi Hà Nội. Quý khách ăn trưa tại nhà hàng địa phương và tham quan những di tích văn hóa nổi tiếng tại thủ đô: 
    
                Một vòng Hồ Hoàn Kiếm ngắm bên ngoài Tháp Rùa, Đền Ngọc Sơn, Cầu Thê Húc.
                Văn Miếu: nơi thờ Khổng Tử và các bậc hiền triết của Nho Giáo, Quốc Tử Giám - trường đại học đầu tiên của Việt Nam, tìm về cội nguồn lịch sử của các vị Nho học.
                Quý khách dùng cơm chiều và nhận phòng khách sạn nghỉ ngơi. Buổi tối, Quý khách tự do khám phá 36 phố phường Hà Nội. ',
                'thoi_gian' => '2023/12/10',
                'status'=>1,
                'id_tour' => '1'
            ],
            [
                'noi_dung' => 'Ăn sáng và trả phòng khách sạn. Xe khởi hành đưa Quý khách tham quan cụm Lăng Hồ Chủ Tịch (không viếng lăng vào thứ 2, thứ 6 hàng tuần và giai đoạn bảo trì định kỳ hàng năm 15/6 – 15/8) tham quan và tìm hiểu cuộc đời và sự nghiệp của vị cha già dân tộc tại Nhà Sàn Bác Hồ, Bảo Tàng Hồ Chí Minh, Chùa Một Cột.

                Tiếp tục hành trình, Quý khách đến với Ninh Bình - vùng đất mệnh danh là “Nơi mơ đến, chốn mong về” với nhiều di tích văn hóa, thiên nhiên vô cùng đặc sắc. Đến nơi, Quý khách tham quan: 
                
                Chùa Bái Đính - một quần thể chùa với nhiều kỷ lục Việt Nam như pho tượng phật Di Lặc bằng đồng nặng 80 tấn, hành lang với 500 tượng vị La Hán, tòa Bảo Tháp cao 99m…
                Khu Du lịch Tràng An - Quý khách lên thuyền truyền thống đi tham quan thắng cảnh hệ thống núi đá vôi hùng vĩ và các thung lũng ngập nước, thông với nhau bởi các dòng suối tạo nên các hang động ngập nước quanh năm. Điểm xuyến trong không gian hoang sơ, tĩnh lặng là hình ảnh rêu phong, cổ kính của các mái đình, đền, phủ nằm nép mình dưới chân các dãy núi cao. 
                Quý khách dùng cơm tối và nhận phòng khách sạn nghỉ ngơi. Buổi tối quý khách tự do khám phá Phố cổ Hoa Lư, một không gian check-in cổ, đẹp, trầm mặc đẹp trở nên lung linh, huyền ảo hơn với sắc màu của những chiếc đèn lồng và Bảo Tháp trên Hồ Kỳ Lân; trải nghiệm nhiều hoạt động trò chơi dân gian và nhiều loại hình văn hóa nghệ thuật từ dân tộc như múa rối nước, nhảy múa Tắc Xình, hát xẩm, ... đến những buổi trình diễn acoustic sẽ được diễn ra vào các buổi tối ngày cuối tuần.',
                'thoi_gian' => '2023/12/11',
                'status'=>1,
                'id_tour' => '1'
            ],
            [
                'noi_dung' => 'Quý khách ăn sáng và trả phòng khách sạn. Xe khởi hành đưa Quý khách đến thành phố biển Hạ Long tham quan:

                Xuống thuyền đi du ngoạn Vịnh Hạ Long - Thắng cảnh thiên nhiên tuyệt đẹp và vô cùng sống động, được UNESCO công nhận là di sản thiên nhiên Thế giới năm 1994.
                Từ trên tàu ngắm nhìn các hòn đảo lớn nhỏ trong Vịnh Hạ Long: Hòn Gà Chọi, Hòn Lư Hương.
                Động Thiên Cung là một trong những động đẹp nhất ở Hạ Long. Vẻ đẹp nguy nga và lộng lẫy bởi những lớp thạch nhũ và những luồng ánh sáng lung linh.
                Xe đón Quý khách tại bến tàu và khởi hành đi tham quan chụp hình bên ngoài Bảo tàng Quảng Ninh, Cung Cá Heo - Cung Quy Hoạch, Hội Chợ, Triển Lãm Và Văn Hóa Quảng Ninh, tham quan mua sắm đặc sản tại Hải Sản Hương Đà Hạ Long với nhiều mặt hàng hải sản tươi, khô, chả mực,.. 
                
                Quý khách dùng cơm chiều và nhận phòng khách sạn nghỉ ngơi. Buổi tối, Quý khách tự do khám phá nhiều hoạt động dịch vụ giải trí sôi nổi tại “phố cổ” Bãi Cháy - nằm cạnh công viên Sun World Hạ Long từ những ẩm thực đường phố đến các quán cà phê siêu dễ thương như Hòn Gai Coffee & Lounge hay thoải mái bung xõa tại The Mini Bar, Brothers Pub,…
                
                Nghỉ đêm tại Hạ Long.
                
                Hoặc lựa chọn một số dịch vụ khám phá Hạ Long về đêm (tự túc phương tiện và chi phí tham quan):
                
                -    Trải nghiệm dịch vụ Cáp Treo Nữ Hoàng tại Sun World Hạ Long Complex trên Núi Ba Đèo, chiêm ngưỡng cảnh đẹp về đêm của thành phố Hạ Long dưới ánh đèn lung linh (thời gian hoạt động cáp treo dự kiến từ 10h đến 18h các ngày thứ 7 và CN).',
                'thoi_gian' => '2023/12/12',
                'status'=>1,
                'id_tour' => '1'
            ], [
                'noi_dung' => 'Quý khách ăn sáng và trả phòng khách sạn. Xe đưa Quý khách đi tham quan:

                Vùng đất thiêng Yên Tử: Quý khách lên cáp treo du ngoạn thắng cảnh thiên nhiên Đông Yên Tử (chi phí cáp treo tự túc), nơi còn lưu giữ nhiều di tích lịch sử mệnh danh “Đất tổ Phật giáo Việt Nam”, chiêm bái chùa Một Mái, chùa Hoa Yên – nơi tu hành của phật hoàng Trần Nhân Tông khai sinh ra dòng mới Thiền Phái Trúc Lâm, nằm trên lưng chừng núi ở độ cao 516m. Theo dấu chân Phật Hoàng viếng Chùa Đồng có tên Thiên Trúc Tự (chùa Cõi Phật), tọa lạc ở đỉnh cao nhất dãy Yên Tử (1.068m) – ngôi chùa bằng đồng lớn nhất Việt Nam.
                Dừng tại trạm dừng chân Hải Dương mua đặc sản: bánh đậu xanh, bánh khảo
                Xe khởi hành đưa Quý khách ra sân bay Nội Bài làm thủ tục đón chuyến bay về Tp.Đà Nẵng. Chia tay Quý khách và kết thúc chương trình du lịch tại sân bay Đà Nẵng. 
                
                KẾT THÚC CHƯƠNG TRÌNH, TẠM BIỆT QUÝ KHÁCH!
                
                *Lưu ý :
                
                Hành trình có thể thay đổi thứ tự điểm đến tùy vào điều kiện thực tế. 
                Lịch trình tham quan (tắm biển, ngắm hoa, trải nghiệm,...) rất dễ bị ảnh hưởng bởi thời tiết. Đây là trường hợp bất khả kháng mong Quý khách hiểu và thông cảm.
                Khách Sạn có thể ở xa trung tâm thành phố vào các mùa Cao Điểm.
                Vì những yếu tố khách quan trong giai đoạn này, điểm tham quan có thể đóng cửa và được thay bằng điểm khác phù hợp với chương trình.',
                'thoi_gian' => '2023/12/13',
                'status'=>1,
                'id_tour' => '1'
            ]
        ]);
    }
}
