export default function Cart() {
  let cartData = [
    { name: 'Tomatoes', desc: 'The edible berry of the plant Solanum lycopersicum.' },
    { name: 'Pasta', desc: 'A food made from flour, sauce, and sometimes egg.' }
  ]
  return (
    <>
      <h2>Cart</h2>
      <p>{cartData.length} products in cart</p>
      {cartData.map((value, index) => (
        <CartItem key={index} item={value} />
      ))}
      <a href="/cart/payment">Go to Payment</a>
    </>
  )
}

function CartItem(props: {
  item: {
    name: string
    desc: string
  }
}) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{props.item.name}</h5>
        <p className="card-text">{props.item.desc}</p>
      </div>
    </div>
  )
}
