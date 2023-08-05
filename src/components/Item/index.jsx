import { useEffect, useState } from "react";
import { Button } from "react-bootstrap"
import { Trash } from "react-bootstrap-icons";

const Item = ({ item, getQty, deleteData }) => {

    let [quantity, setQuantity] = useState(item.qty);

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
                <td><Button className="btn btn-danger mx-2" onClick={() => { deleteData(item) }}><Trash /></Button></td>
            </tr>
        </>
    )
}

export default Item;