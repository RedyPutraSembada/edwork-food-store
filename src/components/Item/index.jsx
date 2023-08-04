import { useEffect, useState } from "react";
import { Button } from "react-bootstrap"

const Item = ({ item, getQty, onUpdateQty }) => {

    let [quantity, setQuantity] = useState(1);

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    useEffect(() => {
        getQty(quantity, item._id);
    }, [quantity])

    const onDel = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1);
        }
    }

    const onPlus = () => {
        setQuantity(quantity + 1);
    }

    return (
        <>
            <tr>
                <td><img src={`http://localhost:3000/images/${item.image_url}`} width={200} height={200} alt="cover" /></td>
                <td>{item.name}</td>
                <td>{rupiah(item.price)}</td>
                <td><Button className="btn btn-primary mx-2" onClick={() => { onDel() }}>-</Button> {quantity} <Button className="btn btn-primary mx-2" onClick={() => { onPlus() }}>+</Button></td>
            </tr>
        </>
    )
}

export default Item;