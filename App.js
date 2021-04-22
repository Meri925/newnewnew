import React, {useMemo, useState} from 'react';
import './App.css';
import {useSortBy, useTable} from 'react-table';
import myData from "./myData.json";
import styled from "styled-components";

const Styles = styled.div`
padding: 1rem;

table {
  border-spacing: 0;
  border: 1px solid black;

  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th,
  td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    :last-child {
      border-right: 0;
    }
  }
}
`;
const Tablik = ({columns, data}) =>{
  const{
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable (
    {
      columns,
      data
    },
    useSortBy
  );


const  myrows = rows.slice(0, 4);
return (
  <>
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? " 🔽"
                      : " 🔼"
                    : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {myrows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    <br />
  </>
);
}

        


      
const App = () => {
  const [data, setData] = React.useState(React.useMemo(() => myData, []));
  const columns = React.useMemo(
    () => [
      {
        Header: "Frameworks",
        columns: [
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Rating",
            accessor: "rating"
          }
        ],
       
      },
      {
        Header: "Delete",
        id: "delete",
        accessor: (str) => "delete",

        Cell: (tableProps) => (
          <span
            
            onClick={() => {
              
              const dataCopy = [...data];
              dataCopy.splice(tableProps.row.index, 1);
              setData(dataCopy);
            }}
          >
            Delete
          </span>
        )
      }
    ],
    [data]
  );
  return (
    <Styles>
      <Tablik columns={columns} data={data} />
    </Styles>
  );
}

export default App;