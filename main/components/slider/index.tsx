import { ReactNode, useEffect, useRef, useState } from 'react'
import './index.scss'

type Props = {
   children: ReactNode;
   controls?: boolean;
   count: number;
}

let scrollNum = 0;
function Slider(props: Props) {
   const { children, controls, count } = props
   const [isActiveCarousel, setisActiveCarousel] = useState(0)
   const [pos, setPos] = useState({ top: 0, left: 0, x: 0, y: 0 });
   const scrollRef: any = useRef();

   useEffect(() => {
      const element = scrollRef.current;
      element?.addEventListener('mousemove', handleMouseMove);
      element?.addEventListener('mouseup', handleMouseDown);
      return () => {
         element?.removeEventListener('mousemove', handleMouseMove)
         element?.removeEventListener('mouseup', handleMouseDown)
      }
   })

   const handleMouseDown = (e: any) => {
      const element = scrollRef.current;
      setPos({
         // The current scroll
         left: element.scrollLeft,
         top: element.scrollTop,
         // Get the current mouse position 
         x: e.clientX,
         y: e.clientY,
      });

   }

   const handleMouseMove = (e: any) => {
      const element = scrollRef.current;
      // How far the mouse has been moved 
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      element.scrollTop = pos.top - dy;
      element.scrollLeft = pos.left - dx;
   }
   const changeActiveCarouselPrev = () => {
      const element = scrollRef.current;
      if (isActiveCarousel < 1) {
         scrollNum = 0;
         setisActiveCarousel(0);
         element.scrollTo({
            left: 0,
            behavior: "smooth",
         });
      } else {
         scrollNum -= 400;
         setisActiveCarousel((current) => current - 1);
         element.scrollTo({
            left: scrollNum,
            behavior: "smooth",
         });
      }
   };

   const changeActiveCarouselNext = () => {
      const element = scrollRef.current;
      if (isActiveCarousel > count - 2) {
         scrollNum = 0;
         setisActiveCarousel(0);
         element.scrollTo({
            left: 0,
            behavior: "smooth",
         });
      } else {
         scrollNum += 400;
         setisActiveCarousel((current) => current + 1);
         element.scrollTo({
            left: scrollNum,
            behavior: "smooth",
         });
      }
   };
   return (
      <div id='slider-con'>
         <div id='slider' ref={scrollRef}>
            <div className='slider'>
               {children}
            </div>
         </div>
         {
            controls &&
            <div className='slider-controls'>
               <button className='slider-controls_prev' onClick={changeActiveCarouselPrev}>←</button>
               <button className='slider-controls_next' onClick={changeActiveCarouselNext}>→</button>
            </div>
         }
      </div>

   )
}

export default Slider