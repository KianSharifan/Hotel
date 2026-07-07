import { useEffect, useState } from "react"
import {getMenu, createOrder, updateOrder, deleteOrder, getActiveOrders, getOrder} from "../../api/restaurantApi"

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

interface OrderItem {
    name:string;
    quantity:number;
    price:number;
}

interface RestaurantOrder {
    id: number
    tableId: number
    status: string
    createdAt: string
    items: OrderItem[]
}



export default function RestaurantOrders() {
    const [categories, setCategories] = useState<MenuCategory[]>([])
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const [orders, setOrders] = useState<RestaurantOrder[]>([])

    const [tableId, setTableId] = useState("")
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

    const [quantity, setQuantity] = useState(1)
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])
    const [filteredItems, setFilteredItems] = useState<MenuItem[]>([])

const loadOrders = async () => {

    try {
        const orders = await getActiveOrders();
        const completedOrders = await Promise.all(
            orders.map(async (o) => {
                const details = await getOrder(o.order.id);
                return {
                    id: details.o.id,
                    tableId: details.o.tableId,
                    status: details.o.status,
                    createdAt: details.o.createdAt,
                    items: details.orderItems
                };
            })
        );
        setOrders(completedOrders);
    }

    catch(err){
        console.log(err);}}

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
    loadOrders()
  }, [])

  return (
    <div className="min-h-screen bg-zinc-100 p-10">
      <div className="w-full bg-blue-700 text-white px-12 py-12 mb-10 shadow-lg">
        <h1 className="text-4xl font-bold">
          Restaurant Orders
        </h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-md border p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Create New Order
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div>
            <label className="block mb-2 font-medium">
              Table Number
            </label>

            <input
              type="number"
              value={tableId}
              onChange={(e) => setTableId(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <select
              value={selectedCategory ?? ""}
              onChange={(e) => {
                const id = Number(e.target.value)

                setSelectedCategory(id)
                setSelectedMenuItem(null)

                setFilteredItems(
                  menuItems.filter(item => item.menuCategoryId === id)
                )
              }}
              className="w-full border rounded-lg px-4 py-3">
              <option value="">
                Choose Category
              </option>

              {categories.map(category => (
                <option
                  key={category.menuCategoryId}
                  value={category.menuCategoryId}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Item
            </label>

            <select
              value={selectedMenuItem?.id ?? ""}
              disabled={selectedCategory == null}
              onChange={(e) => {
                const item = filteredItems.find(
                  x => x.id === Number(e.target.value))

                setSelectedMenuItem(item ?? null)
              }}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="">
                Choose Item
              </option>

              {filteredItems.map(item => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label className="block mb-2 font-medium">
              Quantity
            </label>

            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>


          <div>
            <label className="block mb-2 font-medium">
              Price
            </label>

            <input
              readOnly
              value={selectedMenuItem ? `$${selectedMenuItem.price}` : ""}
              className="w-full border rounded-lg px-4 py-3 bg-gray-100"
            />
          </div>

        </div>

        <div className="flex justify-between items-center mt-6">

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
                          quantity: item.quantity + quantity,
                          totalPrice: (item.quantity + quantity) * item.price
                        }: item)
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
                    totalPrice: quantity * selectedMenuItem.price
                  }
                ])
              }
              setSelectedMenuItem(null)
              setQuantity(1)
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add Item
          </button>

            <button
            onClick={async () => {
                if (selectedItems.length === 0) return
console.log(JSON.stringify({
    tableId: Number(tableId),
    orderItems: selectedItems.map(item => ({
        itemId: item.id,
        quantity: item.quantity
    }))
}, null, 2));
                await createOrder({
                    tableId:Number(tableId),
                    orderItems:selectedItems.map(item=>({
                        itemId:item.id,
                        quantity:item.quantity
                    }))
                });

                await loadOrders();

                setSelectedItems([])
                setTableId("")
                setSelectedMenuItem(null)
                setSelectedCategory(null)
                setFilteredItems([])
                setQuantity(1)
            }}
            className="bg-green-600 text-white px-8 py-3 rounded-lg"
            >
            Submit Order
            </button>

            </div>

            {selectedItems.length > 0 && (
            <div className="mt-10">

                <table className="w-full border">

                <thead className="bg-gray-100">
                    <tr>
                    <th className="p-3 text-left">Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {selectedItems.map(item => (
                    <tr key={item.id} className="border-t">

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
                                selectedItems.filter(x => x.id !== item.id)
                            )
                            }
                            className="text-red-500"
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

            </div>

                {/* Orders */}

                <div className="bg-white rounded-xl shadow-md border p-8">
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
                            <tr key={order.id} className="border-b align-top">
                            <td className="p-4 font-semibold">
                                {order.tableId}
                            </td>

                            <td className="p-4">
                                {order.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between mb-2"
                                    >
                                        <span>{item.name}</span>

                                        <span>x{item.quantity}</span>

                                        <span>
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                                </td>

                <td className="text-center p-4 font-semibold">
                    $
                    {order.items
                        .reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0
                        )
                        .toFixed(2)}
                </td>

                <td className="text-center p-4">

                    <select
                    value={order.status}
                    onChange={async (e) => {

                        await updateOrder(order.id, {
                            status: e.target.value})

                        await loadOrders();
                    }}

                    className="border rounded px-3 py-2"
                    >

                    <option>Pending</option>
                    <option>Preparing</option>
                    <option>Ready</option>
                    <option>Served</option>
                    <option>Completed</option>
                    </select>

                </td>

                <td className="text-center p-4">
                    <button
                    onClick={async () => {
                        await deleteOrder(order.id)
                        await loadOrders();
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
)}