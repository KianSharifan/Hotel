// import { useEffect, useState } from "react";

// interface MenuCategory{
//     menuCategoryId: number
//     name: string
// }

// interface MenuItem{
//     id:number
//     menuCategoryId: number
//     name: string
//     description: string
//     price: number
// }

// function Menu()
// {
//     const [categories, setCategories] = useState<MenuCategory[]>([])
//     const [items, setItems] = useState<MenuItem[]>([])
//     const [selectedCategory, setSelectedCategory] = useState<number|null>(null)

//     useEffect(()=>{
//         fetch("http://localhost:5263/Restaurant")
//         .then(response => response.json())
//         .then(data=>{
//             setCategories(data.MenuCategories)
//             setItems(data.menuItems)

//             if (data.menuCategories.length>0) 
//                 {setSelectedCategory(data.menuCategories[0].menuCategoryId)}
//         })

//         .catch(error=>console.log(error))
//     },[])

//     const filteredItems = items.filter(
//         item=> item.menuCategoryId === selectedCategory
//     )

//     return(
//         <div className="min-h-screen bg-black text-white">
//             <div className="pt-32 pb-16 text-center">
//                 <p className="uppercase tracking-[8px] text-gray-400 mb-4">Restaurant Menu</p>
//                 <h1 className="text-4xl md:text-7xl font-bold">Our Menu</h1>
//             </div>
       


//             <div className="
//             sticky
//             top-0
//             z-20
//             bg-black
//             border-b
//             border-gray-800
//             px-4
//             py-4
//             ">
//                 <div className="
//                 flex
//                 gap-4
//                 overflow-x-auto
//                 pb-2
//                 ">

//                     {categories.map(category=>(
//                         <button
//                             key={category.menuCategoryId}
//                             onClick={()=> setSelectedCategory(category.menuCategoryId)}
//                             className={`
//                             whitespace-nowrap
//                             px-6
//                             py-3
//                             rounded-full
//                             transition-all
//                             duration-300
//                             ${
//                             selectedCategory === category.menuCategoryId
//                                 ? "bg-white text-black" : "bg-zinc-900 text-white hover:bg-zinc-800"
//                             }
//                         `}>

//                         {category.name}
//                         </button>
//                     )

//                     )}

//                 </div>
//             </div>

//             <div
//                 className="
//                 max-w-5xl
//                 mx-auto
//                 px-4
//                 py-10
//                 space-y-6
//                 "
//             >
//                 {filteredItems.map(item=>(
//                     <div
//                     key={item.id}
//                     className="
//                     border
//                     border-zinc-800
//                     rounded-3xl
//                     p-6

//                     hover:border-zinc-600
//                     transition-all
//                     duration-300
//                     ">
//                         <div className="flex justify-between gap-4">

//                         <h2 className="text-xl md:text-2xl font-bold">

//                             {item.name}

//                         </h2>

//                         <span className="text-xl font-semibold">

//                             ${item.price}

//                         </span>

//                         </div>

//                         <p className="text-gray-400 mt-3">

//                         {item.description}

//                         </p>

//                     </div>

       
                   
//                 ))}
                
//             </div>
//         </div>

//     )


// }

// export default Menu





































import { useEffect, useState } from "react"

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

  useEffect(() => {

    fetch("http://localhost:5263/API/Restaurant/Menu")

      .then(response => response.json())

      .then(data => {

        setCategories(data.menuCategories)
        setItems(data.menuItems)

        if (data.menuCategories.length > 0) {
          setSelectedCategory(
            data.menuCategories[0].menuCategoryId
          )
        }

      })

      .catch(error => console.log(error))

  }, [])

  const filteredItems = items.filter(
    item => item.menuCategoryId === selectedCategory
  )

  return (

    <div className="min-h-screen bg-black text-white">

      {/* HERO */}

      <div className="pt-32 pb-16 text-center">

        <p className="uppercase tracking-[8px] text-gray-400 mb-4">

          Restaurant Menu

        </p>

        <h1 className="text-4xl md:text-7xl font-bold">

          Our Menu

        </h1>

      </div>

      {/* CATEGORIES */}

      <div
        className="
          sticky
          top-0
          z-20
          bg-black
          border-b
          border-gray-800
          px-4
          py-4
        "
      >

        <div
          className="
            flex
            gap-4
            overflow-x-auto
            pb-2
          "
        >

          {categories.map(category => (

            <button

              key={category.menuCategoryId}

              onClick={() =>
                setSelectedCategory(category.menuCategoryId)
              }

              className={`
                whitespace-nowrap
                px-6
                py-3
                rounded-full
                transition-all
                duration-300

                ${
                  selectedCategory === category.menuCategoryId

                    ? "bg-white text-black"

                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                }
              `}
            >

              {category.name}

            </button>

          ))}

        </div>

      </div>

      {/* ITEMS */}

      <div
        className="
          max-w-5xl
          mx-auto
          px-4
          py-10
          space-y-6
        "
      >

        {filteredItems.map(item => (

          <div

            key={item.id}

            className="
              border
              border-zinc-800
              rounded-3xl
              p-6

              hover:border-zinc-600
              transition-all
              duration-300
            "
          >

            <div className="flex justify-between gap-4">

              <h2 className="text-xl md:text-2xl font-bold">

                {item.name}

              </h2>

              <span className="text-xl font-semibold">

                ${item.price}

              </span>

            </div>

            <p className="text-gray-400 mt-3">

              {item.description}

            </p>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Menu