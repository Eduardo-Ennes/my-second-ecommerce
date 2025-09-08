import { Link } from "react-router-dom";
import imageTeste from '../media/imagem-python.jpg'

function ListProducts() {
  return (
    <>
        <div className=" bg-[oklch(14.5%_0_0)]">
            <div className="mx-auto p-[1rem]">
                <h2 className="sr-only text-white">Products</h2>

                <div className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 xl:gap-x-10">
                <Link to="/parada" className="group">
                    <img
                    src={imageTeste}
                    alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                    className="aspect-square w-full h-[12rem] rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                    />
                    <h3 className="mt-3 text-sm font-medium text-gray-100">Formação na linguagem de programação python</h3>
                    <p className="mt-3 text-sm text-gray-100">Nome do instrutor</p>
                    <div className="flex flex-wrap items-center mt-3 gap-x-3">
                        <p>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-yellow-400"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </p>
                        <p className="text-gray-100">4.9</p>
                        <p className="text-gray-100">14 (avaliações)</p>
                    </div>
                    <div className="flex flex-wrap gap-x-0.5 ">
                        <p className="mt-3 text-lg font-medium text-gray-100">$19,90</p>
                        <p className="mt-3 font-medium text-gray-100 text-base line-through">R$100,00</p>
                    </div>
                </Link>

                 <a href="#" className="group">
                    <img
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg"
                    alt="Olive drab green insulated bottle with flared screw lid and flat top."
                    className="aspect-square w-full h-[12rem] rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                    />
                    <h3 className="mt-4 text-sm text-gray-700">Nomad Tumbler</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">$35</p>
                </a>

                <a href="#" className="group">
                    <img
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg"
                    alt="Person using a pen to cross a task off a productivity paper card."
                    className="aspect-square w-full h-[12rem] rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                    />
                    <h3 className="mt-4 text-sm text-gray-700">Focus Paper Refill</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">$89</p>
                </a>

                <a href="#" className="group">
                    <img
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg"
                    alt="Hand holding black machined steel mechanical pencil with brass tip and top."
                    className="aspect-square w-full h-[12rem] rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                    />
                    <h3 className="mt-4 text-sm text-gray-700">Machined Mechanical Pencil</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">$35</p>
                </a>

                <a href="#" className="group">
                    <img
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg"
                    alt="Paper card sitting upright in walnut card holder on desk."
                    className="aspect-square w-full h-[12rem] rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                    />
                    <h3 className="mt-4 text-sm text-gray-700">Focus Card Tray</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">$64</p>
                </a>

                <a href="#" className="group">
                    <img
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-06.jpg"
                    alt="Stack of 3 small drab green cardboard paper card refill boxes with white text."
                    className="aspect-square w-full h-[12rem] rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                    />
                    <h3 className="mt-4 text-sm text-gray-700">Focus Multi-Pack</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">$39</p>
                </a>

                <a href="#" className="group">
                    <img
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-07.jpg"
                    alt="Brass scissors with geometric design, black steel finger holes, and included upright brass stand."
                    className="aspect-square w-full h-[12rem] rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                    />
                    <h3 className="mt-4 text-sm text-gray-700">Brass Scissors</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">$50</p>
                </a>

                <a href="#" className="group">
                    <img
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg"
                    alt="Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop."
                    className="aspect-square w-full h-[12rem] rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                    />
                    <h3 className="mt-4 text-sm text-gray-700">Focus Carry Pouch</h3>
                    <p className="mt-1 text-sm font-medium text-gray-900">$32</p>
                </a> 
                </div>
            </div>
        </div>
    </>
  )
}

export default ListProducts