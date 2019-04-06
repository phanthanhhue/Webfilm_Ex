// Import bootstrap library
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {registerUser} from '../controllers/auth'
import "bootstrap";

import * as _ from 'lodash'

// Import CSS
import "../../assets/css/index.css";

// Import Class Movie
import { Movie } from "../models/movie";

// Import Axios
import axios from "axios";


let danhSachPhim: Array<any> = [];
let gioHang : Movie[] = [];
let totalAmount = 0;

const fetchCart = () => {
    let cartString = localStorage.getItem('cart');
    if (cartString) {
        gioHang = JSON.parse(cartString);

        for (let item of gioHang) {
            totalAmount += item.Quantity;
        }
        document.getElementById('totalAmount').innerHTML = totalAmount.toString();
    }
}

fetchCart();

axios({
    method: "GET",
    url: 'http://sv2.myclass.vn/api/QuanLyPhim/LayDanhSachPhim?MaNhom=GP01'
})
    .then((res) => {
        danhSachPhim = res.data;
        renderPhim(danhSachPhim);
    }).catch((err) => {
        console.log(err.message);
    });

// var demo = (a) => a;
// console.log(demo(2));

const renderPhim = (danhSach: Array<any>) => {
    let content = "";

    // for (let i in danhSach) {

    // }
    for (let phim of danhSach) {
        // destructuring ES6
        let {HinhAnh, NgayKhoiChieu, TenPhim, DanhGia, MaPhim} = phim;

        content +=
        `<div class="col-sm-6 col-md-3 text-center mb-4">
            <div class="movie__item">
                <img src="${HinhAnh}" onerror="this.onerror=null;this.src='https://doc.louisiana.gov/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'" class="img-fluid w-100" style = "height: 300px; ">
                <div class="movie__overlay"></div>
                <div class="movie__detail w-100 text-center text-white">
                    <i class="fa fa-play d-block mx-auto mb-3 video-playvenobox  vbox-item" href="https://youtu.be/aOXvyd9v1cg" data-vbtype="video"></i>
                    <a class="d-block text-white mb-2">READ MORE</a>
                    <span>Released: ${NgayKhoiChieu ? NgayKhoiChieu.split('T')[0]: ''}</span>
                    <div class="mt-3">
                        <button class="btn btn-outline-light">Detail</button>
                        <button class="btn btn-outline-light btnCart" data-maphim="${MaPhim}">Cart</button>
                    </div>
                </div>
            </div>
            <p class="movie__name text-center my-3">${TenPhim}</p>
            ${renderStar(DanhGia)}
        </div>
        `
    }
    (<HTMLDivElement>document.getElementById('danhSachPhim')).innerHTML = content;
    addToCart();
}
let renderStar = (star: number) => {
    let content = '';
    for (let i = 0; i < star; i++){
        content += '<i class="fa fa-star movie__star"></i>';
    }
    for (let i = 0; i < 5 - star; i++){
        content += '<i class="fa fa-star-o movie__star"></i>';
    }
    return content;
}

// Goi ham Dang ky

document.getElementById('btnDangKy').addEventListener('click', registerUser);


let addToCart = () => {
    let btnAdds: HTMLCollectionOf<any> = document.getElementsByClassName('btnCart');
    // for of chi duoc duyet mang
    // for in cho phep duyet collection va duyet object
    for ( let i in btnAdds ){
        btnAdds[i].addEventListener('click', function(){
            let maPhim = this.getAttribute('data-maphim');
            // tim sp muon them vao gio hang bang ID
            const index = _.findIndex(danhSachPhim, function(e){return e.MaPhim == maPhim});
            //Kiem tra ton tai trong gio hang
            const cartItemIndex = _.findIndex(gioHang, (e) => e.MaPhim == maPhim );
            if (cartItemIndex !== -1){
                gioHang[cartItemIndex].Quantity += 1;
            }
            else {
                 // spread oprater
                let cartItem = {...danhSachPhim[index],Quantity: 1}//... copy tat ca cac thuoc tinh 
                gioHang.push(cartItem);
            }         
            totalAmount += 1;  

            localStorage.setItem('cart', JSON.stringify(gioHang));
            document.getElementById('totalAmount').innerHTML = totalAmount.toString();
        })
    }
}

// let addToCart = (phim: Movie) => {
//     gioHang.push(phim);
// }