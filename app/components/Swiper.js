import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

const ImageCarousel = ({carousels}) => {
     const [emblaRef] = useEmblaCarousel({
     loop: true,
     align: 'center',
     skipSnaps: false,
     }, [ Autoplay({ playOnInit: true, delay: 3000 })]);
    
      return (
         <div className="embla" ref={emblaRef}>
           <div className="embla__container  ">
           {carousels.map((image, index) => (
             <div key={index} className="embla__slide ">
               <Image 
               src={image.src} 
               alt={image.title} 
               width={500}
               height={500}
               className="embla__slide__img w-fit mx-auto" 
               />
             </div>
           ))}
           </div>
         </div>
       );
};
export default ImageCarousel;