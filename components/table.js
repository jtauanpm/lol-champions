import { useState, useMemo } from "react";


const showDetails = (item) => {
  console.log(item)
  
}

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);
  
    const sortedItems = useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    const requestSort = (key) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
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
    return (
      <table>
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort('name')}
                className={getClassNamesFor('name')}
              >
                Name
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('partype')}
                className={getClassNamesFor('partype')}
              >
                Type
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('title')}
                className={getClassNamesFor('title')}
              >
                Title
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} onClick={() => showDetails(item)}>
              <td>{item.name}</td>
              <td>{item.partype}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default function Table(champions) {

    return (
      <div className="Table">
        <ItemTable
          champions={[...champions.champions]}
        />
      </div>
    );
  }