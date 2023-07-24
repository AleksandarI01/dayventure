import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ImageTrip from '../ImageTrip/ImageTrip';

const SwiperContainer = ({trips}) => {
  return (
    <div className="flex justify-center items-center w-full">
      <Swiper
  style={{height: '450px'}}
  modules={[Navigation, Autoplay]}
  centeredSlides
  slidesPerView={3}
  autoplay={{ delay: 3000 }}
  loop={true}
  spaceBetween={20} // Default space between slides
  breakpoints={{
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 10, // Space between slides at this breakpoint
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 1,
      spaceBetween: 10, // Space between slides at this breakpoint
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
      spaceBetween: 20, // Space between slides at this breakpoint
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 3,
      spaceBetween: 30, // Space between slides at this breakpoint
    },
  }}
>
  {trips.map((trip) => (
    <SwiperSlide key={trip.id} className="flex justify-center items-center">
      <ImageTrip trip={trip}/>
    </SwiperSlide>
  ))}
</Swiper>


    </div>
  );
};

export default SwiperContainer;

