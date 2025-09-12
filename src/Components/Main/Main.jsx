import React from 'react';
import './main.scss';
import { GoLocation } from "react-icons/go";
import { IoMdCart } from "react-icons/io";
import img from '../../Assest/2.png';
import img2 from '../../Assest/1.jpg';

const Data = [
  {
    id: 1,
    imgSrc: img,
    destTitle: 'Corgi',
    location: 'Wales',
    fees: '21.000.000₫',
    description: 'Chó Corgi không có nguồn gốc từ Hoa Kỳ. Giống chó này có nguồn gốc từ xứ Wales, thuộc Vương quốc Anh.',
  },
  {
    id: 2,
    imgSrc: img2,
    destTitle: 'Golden',
    location: 'Scotland',
    fees: '15.000.000₫',
    description: 'Chó Golden (Golden Retriever) có nguồn gốc từ Scotland, Vương quốc Anh, không phải từ Hoa Kỳ.',
  },
  {
    id: 3,
    imgSrc: img,
    destTitle: 'Poodle',
    location: 'France',
    fees: '8.000.000₫',
    description: 'Chó Poodle nổi tiếng với vẻ ngoài dễ thương và thông minh, có nguồn gốc từ Pháp.',
  },
  {
    id: 4,
    imgSrc: img2,
    destTitle: 'Shiba Inu',
    location: 'Japan',
    fees: '18.000.000₫',
    description: 'Shiba Inu là giống chó nhỏ nhưng mạnh mẽ, có nguồn gốc từ Nhật Bản.',
  },
];

const Main = () => {
  return (
    <section className='main container section'>
      <div className="secTitle">
        <h3 className="title">
          Products
        </h3>
      </div>
      <div className="secContent">
        {Data.map(({ id, imgSrc, destTitle, location, fees, description }) => (
          <div key={id} className="card">
            <div className="card__img">
              <img src={imgSrc} alt={destTitle} />
            </div>
            <div className="card__body">
              <div className="card__top">
                <h4 className="card__title">{destTitle}</h4>
                <span className="card__location">
                  <GoLocation className="icon" />
                  {location}
                </span>
              </div>
              <p className="card__desc">{description}</p>
              <div className="card__bottom">
                <span className="card__price">{fees}</span>
                <button className="card__btn">
                  <IoMdCart className="icon" /> Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Main;