/*import { useEffect, useState } from "react";
import Cards from "../../Components/Cards/Cards";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanStateName,
  filter,
  filterByTeam,
  getAllDrivers,
  getAllTeams,
  getDriverByName,
} from "../../Redux/Actions";

const ITEMS_PER_PAGE = 8;

const Home = () => {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers);
  const allTeams = useSelector((state) => state.allTeams);
  const driversFiltered = useSelector((state) => state.driversFiltered);
  const filters = useSelector((state) => state.filters);

  const [currentPage, setCurrentPage] = useState(0);

  const [items, setItems] = useState(
    [...allDrivers]?.splice(0, ITEMS_PER_PAGE)
  );
  const [itemsFiltered, setItemsFiltered] = useState(
    [...driversFiltered]?.splice(0, ITEMS_PER_PAGE)
  );
  const [searchBar, setSearchBar] = useState("");
  const driverByName = useSelector((state) => state.driverByName);
  const [hasCleanedState, setHasCleanedState] = useState(false);

  const nextPage = () => {
    if (filters) {
      const next_page = currentPage + 1;
      const firstIndex = next_page * ITEMS_PER_PAGE;
      if (firstIndex >= driversFiltered.length) return;
      setItemsFiltered(
        [...driversFiltered]?.splice(firstIndex, ITEMS_PER_PAGE)
      );
      setCurrentPage(next_page);
      return;
    } else if (driverByName.length > 0) {
      const next_page = currentPage + 1;
      const firstIndex = next_page * ITEMS_PER_PAGE;
      if (firstIndex >= driverByName.length) return;
      setItemsFiltered([...driverByName]?.splice(firstIndex, ITEMS_PER_PAGE));
      setCurrentPage(next_page);
      return;
    }
    const next_page = currentPage + 1;
    const firstIndex = next_page * ITEMS_PER_PAGE;
    if (firstIndex >= allDrivers.length) return;
    setItems([...allDrivers]?.splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(next_page);
  };
  const prevPage = () => {
    if (filters) {
      const prev_page = currentPage - 1;
      const firstIndex = prev_page * ITEMS_PER_PAGE;
      if (prev_page < 0) return;
      setItemsFiltered(
        [...driversFiltered]?.splice(firstIndex, ITEMS_PER_PAGE)
      );
      setCurrentPage(prev_page);
      return;
    } else if (driverByName.length > 0) {
      const prev_page = currentPage - 1;
      const firstIndex = prev_page * ITEMS_PER_PAGE;
      if (prev_page < 0) return;
      setItemsFiltered([...driverByName]?.splice(firstIndex, ITEMS_PER_PAGE));
      setCurrentPage(prev_page);
      return;
    }
    const prev_page = currentPage - 1;
    const firstIndex = prev_page * ITEMS_PER_PAGE;
    if (prev_page < 0) return;
    setItems([...allDrivers]?.splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(prev_page);
  };

  useEffect(() => {
    dispatch(getAllDrivers());
    dispatch(getAllTeams());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterOrd = (event) => {
    // setSearchBar(""); // Limpiar búsqueda SearchBar
    dispatch(filter(event.target.value));
  };

  const filterTeam = (event) => {
    // setSearchBar(""); // Limpiar búsqueda SearchBar
    console.log(event.target.value);
    dispatch(filterByTeam(event.target.value, "team"));
  };

  useEffect(() => {
    // <----- se ejecuta cuando el estado se actualiza
    setItems([...allDrivers]?.splice(0, ITEMS_PER_PAGE));
  }, [allDrivers]);

  useEffect(() => {
    // <----- se ejecuta cuando el estado se actualiza
    setItemsFiltered([...driversFiltered]?.splice(0, ITEMS_PER_PAGE));
  }, [driversFiltered]);

  const handleSearch = () => {
    if (searchBar.trim() === "") {
      alert("Invalid driver name");
      return;
    }
    dispatch(cleanStateName());
    dispatch(getDriverByName(searchBar));
    setCurrentPage(0); // Volver a la primera página
  };

  // useEffect(() => {
  //   if (driverByName.length > 0) {
  //     setItemsFiltered(driverByName);
  //     dispatch(cleanStateName());
  //     //setCurrentPage(0);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [driverByName]);

  useEffect(() => {
    dispatch(cleanStateName());
    setHasCleanedState(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBar]);

  useEffect(() => {
    if (hasCleanedState) {
      setItemsFiltered([]);
      setHasCleanedState(false);
    }
  }, [hasCleanedState]);

  useEffect(() => {
    // <----- se ejecuta cuando el estado se actualiza
    setItemsFiltered([...driverByName]?.splice(0, ITEMS_PER_PAGE));
  }, [driverByName]);

  return (
    <div className="home-container">
      <div className="home-bar">
        <div className="home-searchBar">
          <input
            type="text"
            value={searchBar}
            onChange={(event) => setSearchBar(event.target.value)}
            placeholder="Search by driver name"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="home-pagination">
          <button onClick={prevPage}>Prev</button>
          <span className="page-number">Page {currentPage + 1}</span>
          <button onClick={nextPage}>Next</button>
        </div>
        <div className="home-filters">
          {console.log(driversFiltered)}
          <select onChange={filterTeam}>
            <option defaultChecked value="0">
              Team Filter
            </option>
            {allTeams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          <select onChange={filterOrd} name="" id="">
            <option defaultChecked value="0">
              Order by
            </option>
            <option value="name asc">name A-Z</option>
            <option value="name dct">name Z-A</option>
            <option value="dob asc">dob A-Z</option>
            <option value="dob dct">dob Z-A</option>
          </select>
          //{ Botones individuales para API y DB }
          <button
            className="filter-btn"
            onClick={() => dispatch(filter("API"))}
          >
            API
          </button>
          <button className="filter-btn" onClick={() => dispatch(filter("DB"))}>
            DB
          </button>
        </div>
      </div>
      {driverByName.length > 0 ? (
        <Cards allDrivers={itemsFiltered} />
      ) : filters ? (
        <Cards allDrivers={itemsFiltered} />
      ) : (
        <Cards allDrivers={items} />
      )}
    </div>
  );
};

export default Home;
*/

import { useEffect, useState } from "react";
import Cards from "../../Components/Cards/Cards";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanStateName,
  filter,
  filterByTeam,
  getAllDrivers,
  getAllTeams,
  getDriverByName,
} from "../../Redux/Actions";

/* const ITEMS_PER_PAGE = 8; */

const Home = () => {
  const dispatch = useDispatch();
  //const allDrivers = useSelector((state) => state.allDrivers);
  const allTeams = useSelector((state) => state.allTeams);
  const driversFiltered = useSelector((state) => state.driversFiltered);
  //const filters = useSelector((state) => state.filters);

  //const [currentPage, setCurrentPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 10;

  /* const [items, setItems] = useState(
    [...allDrivers]?.splice(0, ITEMS_PER_PAGE)
  );
  const [itemsFiltered, setItemsFiltered] = useState(
    [...driversFiltered]?.splice(0, ITEMS_PER_PAGE)
  ); */
  const [searchBar, setSearchBar] = useState("");
  //const driverByName = useSelector((state) => state.driverByName);
  /*  const [hasCleanedState, setHasCleanedState] = useState(false); */

  useEffect(() => {
    dispatch(getAllDrivers());
    dispatch(getAllTeams());
  }, [dispatch]);

  const displayedDrivers = useSelector((state) => {
    if (state.driverByName.length > 0) return state.driverByName;
    return state.filters ? state.driversFiltered : state.allDrivers;
  });

  // Cálculo de índices para la paginación
  const totalPages = Math.ceil(displayedDrivers.length / driversPerPage);
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = displayedDrivers.slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );

  // Lógica para mostrar hasta 5 botones de páginas
  const maxPageNumbers = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  if (endPage - startPage < maxPageNumbers - 1) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  const paginationNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    paginationNumbers.push(i);
  }

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  /* const nextPage = () => {
    if (filters) {
      const next_page = currentPage + 1;
      const firstIndex = next_page * ITEMS_PER_PAGE;
      if (firstIndex >= driversFiltered.length) return;
      setItemsFiltered(
        [...driversFiltered]?.splice(firstIndex, ITEMS_PER_PAGE)
      );
      setCurrentPage(next_page);
      return;
    } else if (driverByName.length > 0) {
      const next_page = currentPage + 1;
      const firstIndex = next_page * ITEMS_PER_PAGE;
      if (firstIndex >= driverByName.length) return;
      setItemsFiltered([...driverByName]?.splice(firstIndex, ITEMS_PER_PAGE));
      setCurrentPage(next_page);
      return;
    }
    const next_page = currentPage + 1;
    const firstIndex = next_page * ITEMS_PER_PAGE;
    if (firstIndex >= allDrivers.length) return;
    setItems([...allDrivers]?.splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(next_page);
  }; */
  /* const prevPage = () => {
    if (filters) {
      const prev_page = currentPage - 1;
      const firstIndex = prev_page * ITEMS_PER_PAGE;
      if (prev_page < 0) return;
      setItemsFiltered(
        [...driversFiltered]?.splice(firstIndex, ITEMS_PER_PAGE)
      );
      setCurrentPage(prev_page);
      return;
    } else if (driverByName.length > 0) {
      const prev_page = currentPage - 1;
      const firstIndex = prev_page * ITEMS_PER_PAGE;
      if (prev_page < 0) return;
      setItemsFiltered([...driverByName]?.splice(firstIndex, ITEMS_PER_PAGE));
      setCurrentPage(prev_page);
      return;
    }
    const prev_page = currentPage - 1;
    const firstIndex = prev_page * ITEMS_PER_PAGE;
    if (prev_page < 0) return;
    setItems([...allDrivers]?.splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(prev_page);
  }; */

  const filterOrd = (event) => {
    // setSearchBar(""); // Limpiar búsqueda SearchBar
    setCurrentPage(1);
    dispatch(filter(event.target.value));
  };

  const filterTeam = (event) => {
    // setSearchBar(""); // Limpiar búsqueda SearchBar
    setCurrentPage(1);
    console.log(event.target.value);
    dispatch(filterByTeam(event.target.value, "team"));
  };

  /*  useEffect(() => {
    // <----- se ejecuta cuando el estado se actualiza
    setItems([...allDrivers]?.splice(0, ITEMS_PER_PAGE));
  }, [allDrivers]);

  useEffect(() => {
    // <----- se ejecuta cuando el estado se actualiza
    setItemsFiltered([...driversFiltered]?.splice(0, ITEMS_PER_PAGE));
  }, [driversFiltered]); */

  const handleSearch = () => {
    if (searchBar.trim() === "") {
      alert("Invalid driver name");
      return;
    }
    /* dispatch(cleanStateName()); */
    dispatch(getDriverByName(searchBar));
    setCurrentPage(1); // Volver a la primera página
  };

  // useEffect(() => {
  //   if (driverByName.length > 0) {
  //     setItemsFiltered(driverByName);
  //     dispatch(cleanStateName());
  //     //setCurrentPage(0);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [driverByName]);

  useEffect(() => {
    dispatch(cleanStateName());
    /*  setHasCleanedState(true); */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBar]);

  /*  useEffect(() => {
    if (hasCleanedState) {
      setItemsFiltered([]);
      setHasCleanedState(false);
    }
  }, [hasCleanedState]);

  useEffect(() => {
    // <----- se ejecuta cuando el estado se actualiza
    setItemsFiltered([...driverByName]?.splice(0, ITEMS_PER_PAGE));
  }, [driverByName]); */

  return (
    <div className="home-container">
      <div className="home-bar">
        <div className="home-searchBar">
          <input
            type="text"
            value={searchBar}
            onChange={(event) => setSearchBar(event.target.value)}
            placeholder="Search by driver name"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/*Pagination*/}

        <div className="home-pagination">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="home-pagination-btn"
          >
            {"<<"}
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="home-pagination-btn"
          >
            {"<"}
          </button>

          {paginationNumbers.map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`home-pagination-btn ${
                currentPage === num ? "page-number-btn" : ""
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="home-pagination-btn"
          >
            {">"}
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="home-pagination-btn"
          >
            {">>"}
          </button>
        </div>

        {/*Filters*/}

        <div className="home-filters">
          {console.log(driversFiltered)}
          <select onChange={filterTeam}>
            <option defaultChecked value="0">
              Team Filter
            </option>
            {allTeams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          <select onChange={filterOrd} name="" id="">
            <option defaultChecked value="0">
              Order by
            </option>
            <option value="name asc">name A-Z</option>
            <option value="name dct">name Z-A</option>
            <option value="dob asc">dob A-Z</option>
            <option value="dob dct">dob Z-A</option>
          </select>
          {/* Botones individuales para API y DB */}
          <button
            className="filter-btn"
            onClick={() => {
              setCurrentPage(1);
              dispatch(filter("API"));
            }}
          >
            API
          </button>
          <button
            className="filter-btn"
            onClick={() => {
              setCurrentPage(1);
              dispatch(filter("DB"));
            }}
          >
            DB
          </button>
        </div>
      </div>
      {<Cards allDrivers={currentDrivers} />}
    </div>
  );
};

export default Home;
