function BentoGrid({children}) {
  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-4">
      <div
        key="item-1"
        className="col-start-1 row-start-1 col-span-1 row-span-4"
      >
        {children[0] ? children[0] : <p>Default Item 1</p>}
      </div>
      <div
        key="item-2"
        className="col-start-2 row-start-1 col-span-2 row-span-2"
      >
        {children[1] ? children[1] : <p>Default Item 2</p>}
      </div>
      <div
        key="item-3"
        className="col-start-2 row-start-3 col-span-2 row-span-2"
      >
        {children[2] ? children[2] : <p>Default Item 3</p>}
      </div>
      <div
        key="item-4"
        className="col-start-4 row-start-1 col-span-1 row-span-4"
      >
        {children[3] ? children[3] : <p>Default Item 4</p>}
      </div>
    </div>
  );
}

export default BentoGrid;
