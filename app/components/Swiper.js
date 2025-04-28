import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'

const ImageCarousel = ({carousels}) => {
     const [emblaRef] = useEmblaCarousel({
     loop: true,
     align: 'center',
     skipSnaps: false,
     }, [ Autoplay({ playOnInit: true, delay: 5000 })]);
    
      return (
         <div className="embla" ref={emblaRef}>
           <div className="embla__container  ">
           {carousels.map((image, index) => (
             <Link href={image.link ? image.link: ""} key={index} className="embla__slide ">
               <Image 
               src={image.src} 
               alt={image.title} 
               width={500}
               height={500}
               className="embla__slide__img md:h-[400px] h-fit w-fit mx-auto" 
               />
             </Link>
           ))}
           </div>
         </div>
       );
};
export default ImageCarousel;