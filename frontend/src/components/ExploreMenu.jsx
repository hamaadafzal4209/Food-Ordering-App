import { menu_list } from '../assets/assets'

function ExploreMenu() {
  return (
    <div className='py-10 max-w-6xl px-4 mx-auto overflow-hidden'>
      <h1 className="text-3xl fontsem pb-4">Explore Menu</h1>
      <p className="text-balance">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus iusto aliquid molestias unde commodi consequuntur deleniti quasi, fugiat inventore reiciendis!</p>
       <div className="flex items-center gap-6 overflow-x-scroll hideSCrollBar my-8 sm:my-12">
       {
            menu_list.map((item,index) => (
                <div key={index} className=''>
                    <img className='w-[10vw] min-w-[80px] rounded-full cursor-pointer' src={item.menu_image} alt="" />
                    <p className="text-[#747474] text-center pt-1 text-base sm:text-lg">{item.menu_name}</p>
                </div>
            ))
        }
       </div>
       <hr className='mt-[10px] h-[2px] bg-[#e2e2e2] border-none' />
    </div>
  )
}

export default ExploreMenu
