import React, { useState, useEffect } from 'react';
import SliderCard from './SliderCard';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { useCheckApp } from '../../../CheckAppContext';


export default function Slider() {
    const { showCheckApp } = useCheckApp();
    const items = [
        { id: 1, bg: 'https://cdn6.aptoide.com/imgs/e/a/0/ea06b0aea58b936c6f54ba4206a51189_fgraphic.jpg?w=404&h=228', title: 'RAND: Shadow Legends', icon: 'https://cdn6.aptoide.com/imgs/e/a/0/ea06b0aea58b936c6f54ba4206a51189_fgraphic.jpg?w=404&h=228', rating: 4.1, downloads: '4.0' },
        { id: 2, bg: 'https://cdn6.aptoide.com/imgs/e/b/b/ebb8583bf3c86995977e987b2ed29e04_fgraphic.png?w=404&h=228', title: 'Moto Bike X3M Racing Game', icon: 'https://cdn6.aptoide.com/imgs/e/b/b/ebb8583bf3c86995977e987b2ed29e04_fgraphic.png?w=404&h=228', rating: 3.9, downloads: '4.0' },
        { id: 3, bg: 'https://cdn6.aptoide.com/imgs/b/a/2/ba2a872452df0308ddb1b3c52dd4a1a1_fgraphic.png?w=404&h=228', title: 'Infinity Kingdom', icon: 'https://cdn6.aptoide.com/imgs/b/a/2/ba2a872452df0308ddb1b3c52dd4a1a1_fgraphic.png?w=404&h=228', rating: 4, downloads: '3.6' },
        {
            id: 4,
            bg: 'https://cdn6.aptoide.com/imgs/5/3/3/5330fad1603638fa28781b08659f16b7_fgraphic.jpg?w=404&h=228',
            title: 'Age of Apes',
            icon: 'https://cdn6.aptoide.com/imgs/5/3/3/5330fad1603638fa28781b08659f16b7_fgraphic.jpg?w=404&h=228',
            rating: 2.6,
            downloads: '3.55',
        },
        {
            id: 5,
            bg: 'https://cdn6.aptoide.com/imgs/0/7/9/07978aab90e81a17e256f454d2b6f217_fgraphic.jpg?w=404&h=228',
            title: 'Mobile Legends: Adventure',
            icon: 'https://cdn6.aptoide.com/imgs/0/7/9/07978aab90e81a17e256f454d2b6f217_fgraphic.jpg?w=404&h=228',
            rating: 3.5,
            downloads: '4.21',
        },
        {
            id: 6,
            bg: 'https://cdn6.aptoide.com/imgs/2/8/e/28e5c069f1c3581f84e9bfac07205c61_fgraphic.png?w=404&h=228',
            title: 'Cut the Rope FULL FREE',
            icon: 'https://cdn6.aptoide.com/imgs/2/8/e/28e5c069f1c3581f84e9bfac07205c61_fgraphic.png?w=404&h=228',
            rating: 'star-icon.png',
            downloads: '4.3',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideWidth, setSlideWidth] = useState(33.333); 

    useEffect(() => {
      const handleResize = () => {
          const isMobile = window.innerWidth < 768;
          setSlideWidth(isMobile ? 100 : 33.333);
      };

      handleResize(); // Initialize
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
      setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 60000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className='carousel-container'>
            <div className='carousel-container-inner'>
                <div className='carousel-track' style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}>
                    {items.map((item, index) => (
                        <div className='carousel-slide' key={item.id} onClick={() => showCheckApp(app)}>
                            <img src={item.bg} alt={item.title} className='carousel-image' />
                            <SliderCard o={item} key={index}/>
                        </div>
                    ))}
                </div>
                <button className='showPrevSlidebtn' onClick={prevSlide}>
                    <GrFormPreviousLink />
                </button>
                <button className='showNextSlidebtn' onClick={nextSlide}>
                    <GrFormNextLink />
                </button>
            </div>
        </div>
    );
}