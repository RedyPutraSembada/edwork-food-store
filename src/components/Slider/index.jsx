import { Carousel } from "react-bootstrap";
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import { useState } from "react";
import slide1 from "../../assets/image/do.jpg";

const Slider = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} style={{ marginTop: "20px" }} >
            <Carousel.Item>
                <img src={slide1} alt="Slider" style={{ width: "100%", borderRadius: "10px" }} />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={slide1} alt="Slider" style={{ width: "100%", borderRadius: "10px" }} />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={slide1} alt="Slider" style={{ width: "100%", borderRadius: "10px" }} />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Slider;