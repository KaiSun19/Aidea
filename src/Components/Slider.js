import React, { useEffect } from 'react'
import '../Styles/Slider.scss';

function Slider({changeIndex, handleChange}) {

    const handleIndexChange = (idx) =>{
        changeIndex(idx)
        // handleChange()
    }

    useEffect(()=>{
        let dots          = 5;
        let sliderElem    = document.querySelector('.slider')
        let dotElems      = sliderElem.querySelectorAll('.slider__dot')
        let indicatorElem = sliderElem.querySelector('.slider__indicator')

        Array.prototype.forEach.call(dotElems, (dotElem) => {
                
            dotElem.addEventListener('click', (e) => {

                let currentPos = parseInt(sliderElem.getAttribute('data-pos'))
                let newPos     = parseInt(dotElem.getAttribute('data-pos'))
                handleIndexChange(currentPos)

                let newDirection     = (newPos > currentPos ? 'right' : 'left')
                let currentDirection = (newPos < currentPos ? 'right' : 'left')

                indicatorElem.classList.remove(`slider__indicator--${ currentDirection }`)
                indicatorElem.classList.add(`slider__indicator--${ newDirection }`)		
                sliderElem.setAttribute('data-pos', newPos)
                
            })
            
        })
    },[])

  return (
    <div className="slider" data-pos="0">
        <div className="slider__dots">
            <a href="#" className="slider__dot" data-pos="0"></a>
            <a href="#" className="slider__dot" data-pos="1"></a>
            <a href="#" className="slider__dot" data-pos="2"></a>
            <a href="#" className="slider__dot" data-pos="3"></a>
            <a href="#" className="slider__dot" data-pos="4"></a>
            <a href="#" className="slider__indicator"></a>
        </div>
    </div>
  )
}

export default Slider