const Menu = ({ start }) => {
  return (
    <div className="flex items-center justify-center flex-col gap-2">
      <h1 className="text-[#293264] text-4xl">Quizzical</h1>
      <span className="text-gray-600">Description</span>
      <button
        className="text-white rounded-[10px] py-4 px-8 bg-[#4d5b9e]"
        onClick={start}
      >
        Start Quizzical
      </button>
    </div>
  );
};

export default Menu;
