import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import Slider1 from '../assets/slider_1.jpg'
import Slider2 from '../assets/slider_2.jpg'


class CustomCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <Carousel showStatus={false} showIndicators={false} showThumbs={false} infiniteLoop autoPlay>
            <div>
                <img src={Slider1}  />
                {/* <p className="legend">Legend 1</p> */}
            </div>
            <div>
                <img src={Slider2} />
                {/* <p className="legend">Legend 2</p> */}
            </div>
        </Carousel>  );
    }
}
 
export default CustomCarousel;