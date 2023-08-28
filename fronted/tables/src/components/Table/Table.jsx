import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Table.css"

function Table() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('03');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const Table = (e) => {
    setSelectedMonth(e.target.value);
  };
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/transactions`, {
          params: {
            search: searchText,
            page: currentPage,
            per_page: 10,
            month: selectedMonth
          }
        });
        
        setTransactions(response.data.transactions);
        setTotalPages(response.data.pagination.total_pages);
        console.log( response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [selectedMonth, searchText, currentPage, perPage]);


//   useEffect(() => { axios.get(`http://localhost:7000/transactions?search=men&page=1&per_page=01`).
//        then((response)=>{
//         setTransactions(response.data.transactions);
//         setTotalPages(response.data.totalPages);
//         console.log("hi"+ response.data.transactions.title);
//         console.log("page" +response.data.pagination.page);//accesing the pagination
//        }) 
      
//       },[selectedMonth, searchText, currentPage, perPage]);

      
    


  const handleNextPage = () => {
    if (currentPage < totalPages && currentPage <= 5) {
        setCurrentPage(currentPage + 1);
      }
   
    console.log("cur"+currentPage)
  };

  const handlePreviousPage = () => {
    if(currentPage>1)
    setCurrentPage(currentPage-1)
    console.log("cur"+currentPage)
  };

return (
    <div className="table-container shadow-lg p-3 mb-5 rounded">
      <h1 className="table-header">Transaction Dashboard</h1>
      <div className="filter-section">
        <select
          className="month-select"
          value={selectedMonth}
          onChange={Table}
        >
        <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">Mar</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">sept</option>
          <option value="10">oct</option>
          <option value="11">Nov</option>
          <option value="12">December</option>
      </select>
      <input className="month-select"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search transactions"
      />
      </div>
      <div className="table-wrapper">
        <table className="transactions-table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>description</th>
            <th>category</th>
            <th>sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction,key=0) => {
            return(
            <>
            <tr>

              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.price}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "Sold" : "Not Sold"}</td>
              
            </tr>
            </>
            )
          })}
        </tbody>
      </table>
      </div>
      <div className="pagination-section">
      <button
          className="pagination-button"
         
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        
        <button
          className="pagination-button"
          onClick={handleNextPage}
         
        >
          Next
        </button>
      </div>
    </div>
  );

          };
export default Table;