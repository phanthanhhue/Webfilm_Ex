import {User} from '../models/user';
import axios from "axios";


export const registerUser = () => {
    let taiKhoan = (<HTMLInputElement>document.getElementById('txtTaiKhoan')).value;
    let matKhau = (<HTMLInputElement>document.getElementById('txtMatKhau')).value;
    let email = (<HTMLInputElement>document.getElementById('txtEmail')).value;
    let soDT = (<HTMLInputElement>document.getElementById('txtSoDT')).value;
    let hoTen = (<HTMLInputElement>document.getElementById('txtHoTen')).value;
    let maNhom = 'GP01';
    let maLoaiNguoiDung = 'Khach Hang';

    let user = new User(taiKhoan, matKhau, email, soDT, hoTen, maNhom, maLoaiNguoiDung);
    console.log(user);
}


axios ({
    method: 'POST',
    url: 'http://sv2.myclass.vn/api/QuanLyNguoiDung/ThemNguoiDung',
    data: User,
})
.then((res) =>{
    console.log(res);
}).catch((err) => {
    console.log(err);
})
