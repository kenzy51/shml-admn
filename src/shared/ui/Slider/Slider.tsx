import { useState } from 'react';
import { Navigation, Thumbs, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/types/swiper-class';

import cls from './Slider.module.scss';

interface Picture{
  url:string
}
interface Post{
  pictures?:Picture[]
}
export const Slider:React.FC<{post:Post}> = ({ post }:any) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

  const renderSlides = (): JSX.Element[] | null =>
    post?.pictures?.map((picture:Picture, index:number) => (
      <SwiperSlide key={`${picture.url}-${index}`}>
        <img src={picture.url} className={cls.slider_img} />
      </SwiperSlide>
    )) ?? null;

  const renderThumbnails = (): JSX.Element[] | null =>
    post?.pictures?.map((picture: Picture, index: number) => (
      <SwiperSlide key={`thumb-${index}`}>
        <div className={cls.photoSlider}>
          <img
            src={picture.url}
            className={cls.slider_second_img}
            style={{ borderRadius: '8px' }}
            alt='picture'
          />
        </div>
      </SwiperSlide>
    )) ?? null;

  return (
    <>
      <Swiper
        loop
        spaceBetween={10}
        navigation={false}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={cls.mySwiper2}
      >
        <div>{renderSlides()}</div>
      </Swiper>
      <div className={cls.secondSwiperContainer}>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={2}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          className={cls.mySwiper}
        >
          {renderThumbnails()}
        </Swiper>
      </div>
    </>
  );
}

export default Slider;
