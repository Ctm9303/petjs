import React from 'react';
import './footer.scss';

// Các ảnh chó demo, cần đúng đường dẫn Assest/dog1.png ...
import dog1 from '../../Assest/dog1.png';
import dog2 from '../../Assest/dog2.png';
import dog3 from '../../Assest/dog3.png';
import dog4 from '../../Assest/dog4.png';
import dog5 from '../../Assest/dog5.png';
import dog6 from '../../Assest/dog6.png';
import dog7 from '../../Assest/dog7.png';

const dogList = [
  { img: dog1, name: "Bull Terrier" },
  { img: dog2, name: "Jack Russell" },
  { img: dog3, name: "Schnauzer" },
  { img: dog4, name: "French Bulldog" },
  { img: dog5, name: "Beagle" },
  { img: dog6, name: "Boston Terrier" },
  { img: dog7, name: "Pug" },
];

const Footer = () => {
    return (
        <section className='footer'>
            <div className="footer-dogs-wrap">
                <div className="footer-dogs">
                    {dogList.map((dog, idx) => (
                        <div className="footer-dog" key={idx}>
                            <img src={dog.img} alt={dog.name} />
                            <div className="footer-dog-name">{dog.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="secContent container">
                <div className="footer-info">
                    <div className="footer-contact">
                        <h4>LIÊN LẠC</h4>
                        <p><b>Địa chỉ:</b> Số 168 Thượng Đình, Thanh Xuân, Hà Nội</p>
                        <p><b>Địa chỉ:</b> 294-296 Đồng Đen, Tân Bình, Hồ Chí Minh</p>
                        <p><b>Điện thoại:</b> 0939.86.36.96</p>
                        <p><b>Email:</b> matpetfamily2011@gmail.com</p>
                    </div>
                    <div className="footer-social">
                        <h4>INSTAGRAM</h4>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">@matpetfamily</a>
                        <h4>FACEBOOK</h4>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Mặt Pet Family</a>
                        <h4>YOUTUBE</h4>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Mặt Pet Family Channel</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer;