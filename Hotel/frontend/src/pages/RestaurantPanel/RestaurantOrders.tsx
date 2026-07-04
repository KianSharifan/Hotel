import { useEffect, useState } from "react"
import { getMenu } from "../../api/restaurantApi"

interface MenuCategory {
  menuCategoryId: number
  name: string
}

interface MenuItem {
  id: number
  menuCategoryId: number
  name: string
  description: string
  price: number
}

interface SelectedItem {
  id: number
  name: string
  quantity: number
  price: number
  totalPrice: number
}

interface RestaurantOrder {
  id: number
  tableId: number
  status: string
  items: SelectedItem[]
  total: number
}

export default function RestaurantOrders() {

  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  // UI Orders (for now only frontend)
  const [orders, setOrders] = useState<RestaurantOrder[]>([])

  // Create Order Form
  const [tableId, setTableId] = useState("")
  const [selectedMenuItem, setSelectedMenuItem] =
    useState<MenuItem | null>(null)

  const [quantity, setQuantity] = useState(1)

  const [selectedItems, setSelectedItems] =
    useState<SelectedItem[]>([])

  useEffect(() => {

    async function loadMenu() {

      try {

        const data = await getMenu()

        setCategories(data.menuCategories)
        setMenuItems(data.menuItems)
        console.log(data)

      }

      catch (err) {

        console.log(err)

      }

    }

    loadMenu()

  }, [])

  return (

    <div className="min-h-screen bg-zinc-100 p-10">

      {/* Page Header */}

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold">

            Restaurant Orders

          </h1>

          <p className="text-gray-500 mt-2">

            Create and manage restaurant orders.

          </p>

        </div>

      </div>

      {/* Create Order Card */}

      <div
        className="
          bg-white
          rounded-xl
          shadow-md
          border
          p-8
          mb-12
        "
      >

        <h2 className="text-2xl font-semibold mb-6">

          Create New Order

        </h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Table Number */}

    <div>

        <label className="block mb-2 font-medium">

            Table Number

        </label>

        <input
            type="number"
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
            className="
                w-full
                border
                rounded-lg
                px-4
                py-3
            "
        />

    </div>

    {/* Menu */}

    <div>

        <label className="block mb-2 font-medium">

            Menu Item

        </label>

        <select

            value={selectedMenuItem?.id ?? ""}

            onChange={(e) => {

                const item = menuItems.find(

                    x => x.id === Number(e.target.value)

                )

                setSelectedMenuItem(item ?? null)

            }}

            className="
                w-full
                border
                rounded-lg
                px-4
                py-3
            "
        >

            <option value="">

                Choose Item

            </option>

            {menuItems.map(item => (

                <option
                    key={item.id}
                    value={item.id}
                >

                    {item.name} (${item.price})

                </option>

            ))}

        </select>

    </div>

    {/* Quantity */}

    <div>

        <label className="block mb-2 font-medium">

            Quantity

        </label>

        <input

            type="number"

            min={1}

            value={quantity}

            onChange={(e) =>

                setQuantity(Number(e.target.value))

            }

            className="
                w-full
                border
                rounded-lg
                px-4
                py-3
            "
        />

    </div>

</div>



{/* Price */}

<div className="mt-6">

    <label className="block mb-2 font-medium">

        Price

    </label>

    <input

        readOnly

        value={

            selectedMenuItem

                ? `$${selectedMenuItem.price}`

                : ""

        }

        className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            bg-gray-100
        "
    />

</div>



{/* Add Item */}

<div className="mt-6">

    <button

        onClick={() => {

            if (!selectedMenuItem) return

            const existing = selectedItems.find(

                x => x.id === selectedMenuItem.id

            )

            if (existing) {

                setSelectedItems(

                    selectedItems.map(item =>

                        item.id === selectedMenuItem.id

                            ? {

                                  ...item,

                                  quantity:

                                      item.quantity + quantity,

                                  totalPrice:

                                      (item.quantity + quantity) *

                                      item.price

                              }

                            : item

                    )

                )

            }

            else {

                setSelectedItems([

                    ...selectedItems,

                    {

                        id: selectedMenuItem.id,

                        name: selectedMenuItem.name,

                        quantity,

                        price: selectedMenuItem.price,

                        totalPrice:

                            quantity *

                            selectedMenuItem.price

                    }

                ])

            }

            setSelectedMenuItem(null)

            setQuantity(1)

        }}

        className="
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-lg
        "
    >

        Add Item

    </button>

</div>



{/* Selected Items */}

{selectedItems.length > 0 && (

<div className="mt-10">

    <table className="w-full border">

        <thead className="bg-gray-100">

            <tr>

                <th className="p-3 text-left">

                    Item

                </th>

                <th>

                    Qty

                </th>

                <th>

                    Price

                </th>

                <th>

                    Total

                </th>

                <th>

                    Action

                </th>

            </tr>

        </thead>

        <tbody>

            {selectedItems.map(item => (

                <tr
                    key={item.id}
                    className="border-t"
                >

                    <td className="p-3">

                        {item.name}

                    </td>

                    <td className="text-center">

                        {item.quantity}

                    </td>

                    <td className="text-center">

                        ${item.price}

                    </td>

                    <td className="text-center">

                        ${item.totalPrice}

                    </td>

                    <td className="text-center">

                        <button

                            onClick={() =>

                                setSelectedItems(

                                    selectedItems.filter(

                                        x =>

                                            x.id !==

                                            item.id

                                    )

                                )

                            }

                            className="
                                text-red-500
                            "
                        >

                            Remove

                        </button>

                    </td>

                </tr>

            ))}

        </tbody>

    </table>

</div>

)}



{/* Grand Total */}

<div className="flex justify-end mt-8">

    <h2 className="text-2xl font-bold">

        Total : $

        {selectedItems.reduce(

            (sum, item) =>

                sum + item.totalPrice,

            0

        )}

    </h2>

</div>



{/* Submit */}

<div className="flex justify-end mt-6">

    <button

        onClick={() => {

            if (selectedItems.length === 0) return

            const newOrder: RestaurantOrder = {

                id: Date.now(),

                tableId: Number(tableId),

                status: "Preparing",

                items: selectedItems,

                total: selectedItems.reduce(

                    (sum, item) =>

                        sum + item.totalPrice,

                    0

                )

            }

            setOrders([...orders, newOrder])

            setSelectedItems([])
            setTableId("")
            setQuantity(1)
            setSelectedMenuItem(null)

        }}

        className="
            bg-green-600
            text-white
            px-8
            py-3
            rounded-lg
        "
    >

        Submit Order

    </button>

</div>

      </div>

      {/* Orders */}

      <div
        className="
          bg-white
          rounded-xl
          shadow-md
          border
          p-8
        "
      >

        <h2 className="text-2xl font-semibold mb-6">

          Current Orders

        </h2>

<div className="overflow-x-auto">

    {orders.length === 0 ? (

        <div className="text-center text-gray-500 py-10">

            No orders yet.

        </div>

    ) : (

        <table className="w-full border-collapse">

            <thead>

                <tr className="bg-gray-100">

                    <th className="text-left p-4">Table</th>

                    <th className="text-left p-4">Items</th>

                    <th className="text-center p-4">Total</th>

                    <th className="text-center p-4">Status</th>

                    <th className="text-center p-4">Actions</th>

                </tr>

            </thead>

            <tbody>

                {orders.map(order => (

                    <tr
                        key={order.id}
                        className="border-b align-top"
                    >

                        {/* Table Number */}

                        <td className="p-4 font-semibold">

                            {order.tableId}

                        </td>

                        {/* Items */}

                        <td className="p-4">

                            {order.items.map(item => (

                                <div
                                    key={item.id}
                                    className="flex justify-between mb-2"
                                >

                                    <span>

                                        {item.name}

                                    </span>

                                    <span>

                                        x{item.quantity}

                                    </span>

                                    <span>

                                        $
                                        {item.totalPrice}

                                    </span>

                                </div>

                            ))}

                        </td>

                        {/* Total */}

                        <td className="text-center p-4 font-semibold">

                            ${order.total}

                        </td>

                        {/* Status */}

                        <td className="text-center p-4">

                            <select

                                value={order.status}

                                onChange={(e) => {

                                    setOrders(

                                        orders.map(o =>

                                            o.id === order.id

                                                ? {

                                                    ...o,

                                                    status:

                                                        e.target.value

                                                }

                                                : o

                                        )

                                    )

                                }}

                                className="border rounded px-3 py-2"

                            >

                                <option>

                                    Preparing

                                </option>

                                <option>

                                    Cooking

                                </option>

                                <option>

                                    Ready

                                </option>

                                <option>

                                    Served

                                </option>

                                <option>

                                    Completed

                                </option>

                            </select>

                        </td>

                        {/* Actions */}

                        <td className="text-center p-4">

                            <button

                                onClick={() => {

                                    setOrders(

                                        orders.filter(

                                            o =>

                                                o.id !== order.id

                                        )

                                    )

                                }}

                                className="
                                    bg-red-500
                                    text-white
                                    px-4
                                    py-2
                                    rounded
                                    hover:bg-red-600
                                "

                            >

                                Delete

                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    )}

</div>

      </div>

    </div>

  )

}