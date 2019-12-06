import React,{useState, useEffect} from 'react'
import './background.scss'

import Img1 from './img/1.jpg';
import Img2 from './img/2.jpg';
import Img3 from './img/3.jpg';
import Img4 from './img/4.jpg';
import Img5 from './img/5.jpg';
import Img6 from './img/6.jpg';
import Img7 from './img/7.jpg';
import Img8 from './img/8.jpg';
import Img9 from './img/9.jpg';

function BackgroundDesktop() {


    const Images = [Img1,Img2,Img3,Img4,Img5,Img6,Img7,Img8,Img9]
    const [currentImage, setCurrentImage] = useState(null)

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * Images.length);
        setCurrentImage(randomNumber)
    }, [Images])


    return (
        <div style={ { backgroundImage: "url(" + Images[currentImage] + ")" }} className="background-desktop">
        </div>
    )
}

export default BackgroundDesktop
