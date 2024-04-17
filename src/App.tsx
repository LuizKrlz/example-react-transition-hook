import { ChangeEvent, memo, useState, useTransition } from "react";
import useDebounce from "./hooks/useDebounce";

const ITENS_LIST = 20000;

const ItemRow = memo(({ item }: { item: string }) => (
  <li className="text-lg text-white text-opacity-85">{item}</li>
));

function App() {
  const [isPending, startTransition] = useTransition();

  const [value, setValue] = useState("");
  const [list, setList] = useState<string[]>([]);

  useDebounce(
    () => {
      startTransition(() => {
        const l = [];
        for (let i = 0; i < ITENS_LIST; i++) {
          l.push(value);
        }
        setList(l);
      });
    },
    500,
    [value]
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div className="bg-neutral-800 min-h-screen">
      <div className="w-full max-w-screen-md mx-auto p-6 flex flex-col">
        <input
          type="text"
          value={value}
          autoFocus={false}
          className="h-12 text-white text-opacity-85 px-4 py-2 rounded-md w-full bg-white bg-opacity-5 border border-white border-opacity-5 outline-blue-500 outline-double"
          placeholder="Tip something "
          onChange={handleChange}
        />

        <ul className="py-4">
          {isPending ? (
            <li className="text-lg text-white text-opacity-85">Loading...</li>
          ) : (
            list.map((item, index) => <ItemRow key={index} item={item} />)
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
