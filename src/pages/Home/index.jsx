import { Col, Container, Row } from "react-bootstrap";
import Slider from "../../components/Slider";
import TopBar from "../../components/TopBar";
import PerCard from "../../components/PerCard";
import Footer from "../../components/Footer";
import Tags from "../../components/Tags";

const Home = () => {
    return (
        <>
            <TopBar />
            <Container>
                <Slider />
                <Tags />
                <Row xs={1} md={3} lg={4} className="g-4">
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                        <PerCard />
                    </Col>
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                        <PerCard />
                    </Col>
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                        <PerCard />
                    </Col>
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                        <PerCard />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Home;