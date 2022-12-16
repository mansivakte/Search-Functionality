import { useState, useEffect } from "react";
import axios from "axios";
import style from "./Searchfun.module.css";
import SearchIcon from "@mui/icons-material/Search";

const Searchfun = () => {
  const [record, setRecord] = useState([]);
  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((params) => {
        setRecord(params.data);
        setSearchApiData(params.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleFilter = (e) => {
    if (e.target.value == "") {
      setRecord(searchApiData);
    } else {
      const filterResult = searchApiData.filter(
        (item) =>
          item.name.toLowerCase().includes(e.target.value) ||
          item.username.toLowerCase().includes(e.target.value) ||
          item.email.toLowerCase().includes(e.target.value)
      );
      setRecord(filterResult);
    }
    setFilterVal(e.target.value);
  };

  return (
    <div className={style.body}>
      <div className={style["search-box-style"]}>
        <input
          className={style.searchbox}
          placeholder="Search.."
          value={filterVal}
          onInput={(e) => handleFilter(e)}
        ></input>
      </div>
      <table className={style["table-style"]}>
        <thead className={style["table-th"]}>
          <th>Name</th>
          <th>User Name</th>
          <th>Email</th>
        </thead>

        {record.map((items) => {
          return (
            <tr>
              <td>{items.name}</td>
              <td>{items.username}</td>
              <td>{items.email}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default Searchfun;
