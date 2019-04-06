import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { Movie } from '../models/movie';
import * as _ from 'lodash';
import axios from 'axios';

let Cart = [];

const fetchCart = () => {
    let cartString = localStorage.getItem('cart');
    if (cartString) {
        Cart = JSON.parse(cartString);
    }
    renderCart();
}

const renderCart = () => {
    let content = '';
    for (let item of Cart) {
        let { TenPhim, Quantity, MaPhim } = item;
        content +=
            `<li style="box-shadow:0 0 3px rgba(0,0,0,0.5)" class="d-flex align-items-center p-3 mt-3">
            <h3 class="lead m-0" style="width:50%; font-size:25px;">
                ${TenPhim}
            </h3>
            <h3 class="lead m-0" style="width:30%; font-size:25px;">Quantity:
                <button class="btn btn-outline-danger btn-add" data-maphim="${MaPhim}">
                    <i class="fa fa-plus"></i>
                </button>
                <span>${Quantity}</span>
                <button class="btn btn-outline-danger btn-minus" data-maphim="${MaPhim}">
                    <i class="fa fa-minus"></i>
                </button>
            </h3>
            <div style="width:20%;text-align: center">
                <button class="btn btn-outline-danger">Delete</button>
            </div>
        </li>
        `
    }
    document.getElementById('cartList').innerHTML = content;
    addEventToAddBtn();
    addEventToMinBtn();
}

const addEventToAddBtn = () => {
    let btnAdds: any = document.getElementsByClassName('btn-add');
    for (let i = 0; i < btnAdds.length; i++) {
        btnAdds[i].addEventListener('click', function () {
            const maPhim = this.getAttribute('data-maphim')
            adjustQuantity(1, maPhim);
        })
    }
}

const addEventToMinBtn = () => {
    let btnMins: any = document.getElementsByClassName('btn-minus');
    for (let i = 0; i < btnMins.length; i++) {
        btnMins[i].addEventListener('click', function () {
            const maPhim = this.getAttribute('data-maphim')
            adjustQuantity(-1, maPhim);
        })
    }
}

const adjustQuantity = (num: number, maPhim: string) => {
    const index = _.findIndex(Cart, (item) => item.MaPhim == maPhim);
    if (index !== -1) {
        Cart[index].Quantity += num;
        if (Cart[index].Quantity < 0) {
            Cart[index].Quantity = 0;
        }
        localStorage.setItem('cart', JSON.stringify(Cart));
        renderCart();
    }
}
// const btnDestroy = (maPhim:string) => {
//     const index = _.findIndex(Cart, (item) => item.MaPhim == maPhim);

// }

axios({
    method: 'DELETE',
    url: 'http://sv2.myclass.vn/api/QuanLyPhim/XoaPhim?MaPhim=1'
})
.then((res) => {
    const renderCart = res.data;
})
.catch((err) => {
    console.log(err);
})
// Gọi hàm 
document.getElementById('btnDestroy').addEventListener('click', renderCart)
fetchCart();