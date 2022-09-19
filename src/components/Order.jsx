
const Order = ({ title, quantity, months, price }) => {
  return (
    <>
    {
      quantity > 0 ? <>
        <p className="text-sm font-semibold flex flex-gap">{ title }</p>
        <p>{ quantity }</p>
        <p className="md:flex hidden">x Q. {price}.00</p>
        <p className="">x { months } </p>
        <p className="md:flex hidden">Q. { quantity * months * price }.00</p>
        <p className="md:flex hidden">Q. { months == 4 ? quantity * months * 10 : months == 2 ? quantity * months * 5 :  0 }.00</p>
        <p className="font-semibold">Q. { (quantity * months * price) - (months == 4 ? quantity * months * 10 : months == 2 ? quantity * months * 5 :  0) }.00</p>

      </>
    : null
    }
    </>
  )
}

export default Order