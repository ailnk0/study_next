'use client'

import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'

export default function List() {
  const [data, setData] = useState([
    { name: 'Tomatoes', desc: 'The edible berry of the plant Solanum lycopersicum.', count: 0 },
    { name: 'Pasta', desc: 'A food made from flour, sauce, and sometimes egg.', count: 0 }
  ])

  const addCount = (index: number) => {
    data[index].count++
    setData([...data])
  }

  return (
    <Container>
      <h2>Products</h2>
      <p>{data.length} products found</p>
      {data.map((value, index) => (
        <CartItem key={index} item={value} addCount={() => addCount(index)} />
      ))}
      <a href="/cart">Go to Cart</a>
    </Container>
  )
}

function CartItem(props: {
  item: {
    name: string
    desc: string
    count: number
  }
  addCount: Function
}) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{props.item.name}</h5>
        <p className="card-text">{props.item.desc}</p>
        <Button onClick={() => props.addCount()}>{props.item.count}</Button>
      </div>
    </div>
  )
}
