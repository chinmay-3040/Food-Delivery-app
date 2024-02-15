import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart ,useCart } from './ContextReducer';


export default function Card(props) {

    let dispatch = useDispatchCart();
    let options = props.options;
    let priceOptions = Object.keys(options); //array of keys only.. 

    let data = useCart();
    const priceRef = useRef();
    
    const [qty,setQty] = useState(1);
    const [size,setSize] = useState("");



    const handleAddToCart = async() => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food) {
            if (food.size === size) {
              await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
              return
            }
            else if (food.size !== size) {
              await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
              console.log("Size different so simply ADD one more to the list")
              return
            }
            return
          }
           
      

        

        await dispatch({type: "ADD", id: props.foodItem.__id, name:props.foodItem.name, price:finalPrice, qty:qty, size:size});
        await console.log(data);
    }

    let finalPrice = qty*parseInt(options[size]);

    useEffect(()=>{
        setSize(priceRef.current.value);
    },[])

   

    return (
        <div>
            <div className="card mt-5" style={{ "width": "18rem", "maxHeight": "440px", "border":"1px solid grey"}}>
                <img className="card-img-top" src={props.foodItem.img} alt="..." style={{ height: '200px',objectFit:"fill" }}/>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100 rounded' style={{color:'black' ,backgroundColor:'#F4A143'}} onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        <select className='m-2 h-100 rounded' style={{color:'black', backgroundColor:'#F4A143'}} ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                              {priceOptions.map((data)=>{
                                return <option key={data} value={data}>{data}</option>
                              })}
                        </select>
                        <hr/>
                        <div className='d-inline h-100 fs-5'>
                            Cost: ₹{finalPrice}
                        </div>
                        <hr/>

                        {(localStorage.getItem("authToken"))?
                             <button className='btn justify-center ms-2' style={{color:'black',backgroundColor:'#F4A143'}} onClick={handleAddToCart}>Add to Cart</button>
                             :
                             <button className='btn justify-center ms-2' style={{color:'black',backgroundColor:'#F4A143'}} onClick={()=>{alert("Please login first!!")}}>Add to Cart</button>
                        }
                        

                    </div>
                </div>
            </div>
        </div>
    )
}
