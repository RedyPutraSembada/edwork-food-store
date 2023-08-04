import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, deleteProduct, getProduct, showProduct, updateProduct } from "../../app/api/product";
import { getAllProducts } from "../../app/features/product/actions";

const PerCard = () => {
    // const dispatch = useDispatch();
    // const { dataProduct } = useSelector(state => state);

    // useEffect(() => {
    //     getDataProducts();
    // });

    // const getDataProducts = async () => {
    //     try {
    //         let res = await getProduct();
    //         const data = getAllProducts(res.data.data);
    //         dispatch(data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    return (
        <Card style={{ width: '18rem', marginTop: "10px", marginRight: "10px" }}>
            <Card.Img variant="top" src="holder.js/100px180" width={200} height={200} />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default PerCard;