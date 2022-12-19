import { useState, useMemo } from "react";
import { useRouter } from "next/router";

const showDetails = (item, router) => {
  router.push(`/champions/${item.id}`);
};

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ItemTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.champions);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const router = useRouter();
  return (
    <table>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort("name")}
              className={getClassNamesFor("name")}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("partype")}
              className={getClassNamesFor("partype")}
            >
              Type
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("title")}
              className={getClassNamesFor("title")}
            >
              Title
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? items.map((item) => {
          if (item != undefined){
            return (
              <tr key={item.id} onClick={() => showDetails(item, router)}>
                <td>{item.name}</td>
                <td>{item.partype}</td>
                <td>{item.title}</td>
              </tr>
            )
          }
        }) : <h1>No champions found with that name</h1> 
        }
      </tbody>
    </table>
  );
};

export default function Table(items) {
  const initialValues = items.champions
  const [filter, setFilter] = useState("");
  const [champs, setChamps] = useState(initialValues);

  const clearFilter = () => {
    setFilter('')
    setChamps(initialValues)
  }

  //TODO: error message when champs.legnth =0 
  const handlefilter = e => {
    const inputValue = e.target.value.toLowerCase()
    setFilter(inputValue)
    setChamps(initialValues.filter(champ => champ.name.toLowerCase().includes(inputValue)));
  };

  return (
    <>
      <div className="Filter">
        <input className="center"
          id="filter"
          name="filter"
          type="input"
          placeholder="Filter By Name"
          onChange={handlefilter}
          value={filter}
        />
        <button onClick={() => clearFilter()} >Clear Filter</button>
      </div>

      <div className="Table">
        <ItemTable champions={[...champs]} />
      </div>
    </>
  );
}
