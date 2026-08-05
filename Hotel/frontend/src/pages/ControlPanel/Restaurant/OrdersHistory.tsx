import { getOrder, getOrders } from "../../../api/restaurantApi"
import { useEffect, useState } from "react"
import { useAuth } from "../../../context/AuthContext"

interface Order {
    id: number
    tableId: number
    status: string
    createdAt: string
    totalPrice: number
}

interface OrderItem {
    name: string
    quantity: number
    price: number
}


export default function OrdersHistory() {

    const [orders, setOrders] = useState<Order[]>([])
    const [selectedOrder, setSelectedOrder] = useState<number | null>(null)
    const [orderItems, setOrderItems] = useState<OrderItem[]>([])

    const { user, loading: authLoading  } = useAuth();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        }

        catch(err){
            console.log(err);
        }
    }

    if (authLoading) {
        return null; 
    }
    if (user?.role !== "HotelManager" && user?.role !== "Chef" && user?.role !== "Waiter" && user?.role !== "RestaurantManager") {
    return (
            <div className="mx-auto mt-4 max-w-3xl rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            You don't have permission to access this page.
            </div>
        );
    }





    return (
        <div className="min-h-screen bg-zinc-100 p-10">
        
            <div className="w-full text-black px-12 py-12 mb-10 shadow-lg">
                <h1 className="text-4xl font-bold">
                    Orders History
                </h1>
            </div>

            <div className="bg-white rounded-xl shadow-md border p-8">
                <h2 className="text-2xl font-semibold mb-6">
                    All Orders
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="text-left p-4">
                                    Order ID
                                </th>

                                <th className="text-left p-4">
                                    Table
                                </th>

                                <th className="text-left p-4">
                                    Status
                                </th>

                                <th className="text-left p-4">
                                    Time
                                </th>

                                <th className="text-left p-4">
                                    Total
                                </th>

                            </tr>
                        </thead>
                        <tbody>

                        {orders.map(order => (
                        <tr
                            key={order.id}
                            className="border-b hover:bg-gray-50 cursor-pointer transition"
                            onClick={async () => {
                                const details = await getOrder(order.id);
                                setSelectedOrder(order.id);
                                setOrderItems(details.orderItems);
                            }}
                        >

                            <td className="p-4 font-semibold">
                                #{order.id}
                            </td>

                            <td className="p-4">
                                {order.tableId}
                            </td>

                            <td className="p-4">
                                {order.status}
                            </td>

                            <td className="p-4">
                                {order.createdAt}
                            </td>

                            <td className="p-4 font-semibold">
                                ${order.totalPrice.toFixed(2)}
                            </td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedOrder && (
            <div className="mt-10 bg-white rounded-xl shadow border p-6">
                <h2 className="text-2xl font-bold mb-5">
                    Order #{selectedOrder}
                </h2>

                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left">
                                Item Name
                            </th>

                            <th>
                                Quantity
                            </th>
                            <th className="text-center">
                                Price
                            </th>

                            <th className="text-center">
                                Total
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {orderItems.map(item => (
                        <tr
                            key={`${item.name}-${item.quantity}`}
                            className="border-b"
                        >

                            <td className="p-3">
                                {item.name}
                            </td>

                            <td className="text-center">
                                {item.quantity}
                            </td>

                            <td className="text-center">
                                ${item.price.toFixed(2)}
                            </td>

                            <td className="text-center font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
}