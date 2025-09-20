import ArrowRight from '../assets/arrow-small-right.png'
function MaterialAndFeatures() {
  return (
    <>
        <h2 className="text-gray-200 mt-5 text-2xl font-bold">Materiais e recursos auxiliares da aula 01</h2>
        <ul className='p-[1rem] flex flex-col gap-y-3'>
            <li className='flex flex-wrap items-center gap-3 pl-5'>
                <img src={ArrowRight} alt="" />
                <a href="#" className='text-base text-blue-600 hover:pl-2 hover:underline transition-[2s]'>Arquivo.pdf</a>
            </li>
        </ul>
    </>
  )
}

export default MaterialAndFeatures