import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"
import { createCategory, getMenu, createMenuItem, updateMenuItem, deleteMenuItem, deleteCategory} from "../../../api/restaurantApi"

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

function Menu() {
    const [categories, setCategories] = useState<MenuCategory[]>([])
    const [items, setItems] = useState<MenuItem[]>([])
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
    const [newCategory, setNewCategory] = useState("")

    const [newItemName, setNewItemName] = useState("")
    const [newItemDescription, setNewItemDescription] = useState("")
    const [newItemPrice, setNewItemPrice] = useState("")
    const [showAddItem, setShowAddItem] = useState(false);

    const [showEditItem, setShowEditItem] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [editDescription, setEditDescription] = useState("");
    const [editPrice, setEditPrice] = useState("");

    const refreshMenu = async () => {
        try {
            const data = await getMenu();

            setCategories(data.menuCategories);
            setItems(data.menuItems);

            data.menuCategories.some(
                (c: MenuCategory) => c.menuCategoryId === selectedCategory)
            {
                setSelectedCategory(
                    data.menuCategories.length
                        ? data.menuCategories[0].menuCategoryId
                        : null);}
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshMenu();
    }, []);

    const filteredItems = items.filter(
        item => item.menuCategoryId === selectedCategory
    )

    const selectedCategoryName = categories.find(
        c => c.menuCategoryId === selectedCategory
    )?.name ?? ""

    return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "#0a0a0a" }}
    >

      <div className="relative overflow-hidden">
        <div className="relative pt-44 pb-24 text-center px-4">
            <h1 className="text-6xl md:text-8xl text-white">Menu</h1>
        </div>
      </div>

        <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="flex gap-4 flex-wrap">
            <input
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                placeholder="Category name"
                className="border rounded px-3 py-2 text-black bg-white"
            />
            <button
                className="bg-white px-4 py-2 text-black rounded"
                onClick={async () => {
                    if (!newCategory.trim()) return;
                    try {
                        await createCategory(newCategory);
                        const data = await getMenu();
                        setCategories(data.menuCategories);
                        setItems(data.menuItems);
                        setNewCategory("");
                    }

                    catch (error) {
                        console.log(error);
                        alert("Couldn't create category.");
                    }
                }}>
                Add Category
            </button>
        </div>
        </div>

      <div
        className="sticky top-0 z-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide"
            style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",}}>
                {categories.map((category) => {
                const active = selectedCategory === category.menuCategoryId
                return(
                    <button
                        key={category.menuCategoryId}
                        onClick={() => setSelectedCategory(category.menuCategoryId)}
                        className="relative flex items-center gap-3 whitespace-nowrap 
                        px-8 py-6 text-xs uppercase tracking-[3px] transition-all duration-500 flex-shrink-0 text-white"
                    >
                        <span>{category.name}</span>

                        <span
                            onClick={async (e) => {
                                e.stopPropagation();
                                if (!confirm(`Delete "${category.name}"?`))
                                    return;

                                try {
                                    await deleteCategory(category.name);
                                    await refreshMenu();
                                    if (selectedCategory === category.menuCategoryId) {
                                        setSelectedCategory(null);
                                    }
                                }
                                catch (err) {
                                    console.log(err);
                                    alert("Couldn't delete category.");
                                }
                            }}
                            className="text-red-400 hover:text-red-600 text-lg font-bold cursor-pointer"
                        >
                            ×
                        </span>

                        {active && (
                            <motion.div
                                layoutId="categoryUnderline"
                                className="absolute bottom-0 left-4 right-4 h-px"
                                style={{ background: "#D4AF37" }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30
                                }}
                            />
                        )}
                    </button>
                
              )
            })}
          </div>
        </div>
      </div>


      <div className="max-w-5xl mx-auto px-6 py-20">
        <AnimatePresence mode="wait">
          <motion.div
            className="mb-16 flex items-center gap-6"
          >
            <span
              className="text-xs uppercase tracking-[4px]"
            >
              {selectedCategoryName}
            </span>
            <button
                onClick={() => setShowAddItem(true)}
                className="bg-white text-black px-4 py-2" >
                Add Item
            </button>
          </motion.div>
        </AnimatePresence>


        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}className="space-y-0">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}>
                <div
                  className="group py-10 flex gap-8 transition-all duration-500 cursor-default"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="hidden md:block pt-1 text-s tabular-nums flex-shrink-0 transition-colors duration-500">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2
                      className="text-2xl md:text-3xl font-light mb-3 leading-snug transition-colors duration-500 group-hover:text-white"
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                        color: "#e8e8e0",
                      }}
                    >
                      {item.name}
                    </h2>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#5a5a4a", letterSpacing: "0.02em" }}
                    >
                      {item.description}
                    </p>
                  </div>

              
                    <div className="flex-shrink-0 flex flex-col items-end justify-start pt-1">
                        <div className="flex-shrink-0 flex flex-col items-end gap-2">
                            <span className="text-xl">
                                ${item.price}
                            </span>

                            <button
                                className="text-yellow-400 hover:text-yellow-300 text-sm"
                                onClick={() => {
                                    setEditingItem(item);
                                    setEditDescription(item.description);
                                    setEditPrice(item.price.toString());
                                    setShowEditItem(true);
                                }}>
                                Edit
                            </button>

                            <button
                                className="text-red-500 hover:text-red-300 text-sm"
                                onClick={async () => {

                                    if (!confirm(`Delete "${item.name}"?`))
                                        return;

                                    try {
                                        await deleteMenuItem(
                                            selectedCategoryName,
                                            item.name
                                        );
                                        await refreshMenu();
                                    }
                                    catch (err) {
                                        console.log(err);
                                        alert("Couldn't delete item.");
                                    }
                                }}
                            >
                                Delete
                            </button>

                        </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} />
          </motion.div>
        </AnimatePresence>
      </div>

        {showAddItem && (
            <div className="fixed inset-0 z-[9999] 9bg-black/60 flex justify-center items-center">
                <div className="bg-white p-6 rounded w-[400px]">
                    <h2 className="text-xl font-bold mb-4 text-black">
                        Add Menu Item
                    </h2>

                    <input
                        type="text"
                        placeholder="Name"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        className="border w-full p-2 mb-3 text-black"
                    />

                    <textarea
                        placeholder="Description"
                        value={newItemDescription}
                        onChange={(e) => setNewItemDescription(e.target.value)}
                        className="border w-full p-2 mb-3 text-black"
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={newItemPrice}
                        onChange={(e) => setNewItemPrice(e.target.value)}
                        className="border w-full p-2 mb-4 text-black"
                    />

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setShowAddItem(false)}
                            className="bg-gray-300 px-4 py-2"
                        >
                            Cancel
                        </button>

                        <button
                            className="bg-black text-white px-4 py-2"
                            onClick={async () => {
                                if (
                                    !newItemName.trim() ||
                                    !newItemDescription.trim() ||
                                    !newItemPrice
                                ) {
                                    alert("Fill all fields.");
                                    return;
                                }

                                try {
                                    await createMenuItem(
                                        selectedCategoryName,
                                        {
                                            name: newItemName,
                                            description: newItemDescription,
                                            price: Number(newItemPrice)
                                        }
                                    );
                                    await refreshMenu();
                                    setShowAddItem(false);
                                    setNewItemName("");
                                    setNewItemDescription("");
                                    setNewItemPrice("");

                                }
                                catch (err) {
                                    console.log(err);
                                    alert("Couldn't create item.");
                                }
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )}

        {showEditItem && editingItem && (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-[400px]">
                <h2 className="text-xl font-bold mb-4 text-black">
                    Edit {editingItem.name}
                </h2>

                <textarea
                    className="border w-full p-2 mb-3 text-black"
                    value={editDescription}
                    onChange={(e)=>setEditDescription(e.target.value)}
                />

                <input
                    type="number"
                    className="border w-full p-2 mb-4 text-black"
                    value={editPrice}
                    onChange={(e)=>setEditPrice(e.target.value)}
                />

                <div className="flex justify-end gap-3">
                    <button
                        className="bg-gray-300 px-4 py-2"
                        onClick={()=>setShowEditItem(false)}>
                        Cancel
                    </button>

                    <button
                        className="bg-black text-white px-4 py-2"
                        onClick={async ()=>{
                            try{
                                await updateMenuItem(
                                    selectedCategoryName,
                                    {
                                        name: editingItem.name,
                                        description: editDescription,
                                        price: Number(editPrice)
                                    }
                                );
                                await refreshMenu();
                                setShowEditItem(false);
                            }

                            catch(err){
                                console.log(err);
                                alert("Couldn't update item.");
                            }
                        }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default Menu


