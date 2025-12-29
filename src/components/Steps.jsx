

export default function Steps({ step, setStep }) {
  const base =
    "py-2 m-2 rounded-lg text-sm font-medium cursor-pointer " +
    "transition-all duration-300 ease-out focus:outline-none flex-1"



  const active =
    "bg-gradient-to-br from-[#376ABC] to-[#193156] text-white shadow-md scale-105"

  const inactive =
    "text-black hover:bg-gray-200"

  return (
    <div className="w-full flex bg-[#DAE2EE] rounded-lg mb-4">
      <button
        className={`${base} ${step === 0 ? active : inactive}`}
        onClick={() => setStep(0)}
      >
        1. Cursos
      </button>

      <button
        className={`${base} ${step === 1 ? active : inactive}`}
        onClick={() => setStep(1)}
      >
        2. Profesores
      </button>

      <button
        disabled
        className={`${base} ${step === 2 ? active : inactive}`}
        onClick={() => setStep(2)}
      >
        3. Horarios
      </button>
    </div>
  )
}


// bg-linear-to-br from-[#376ABC] to-[#193156] mx-8 w-auto h-12  rounded-xl mt-6  flex justify-center items-center text-white font-semibold cursor-pointer