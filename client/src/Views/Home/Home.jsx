import { useEffect, useState } from "react";
import Cards from "../../Components/Cards/Cards";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanStateName,
  getAllDrivers,
  getAllTeams,
  getDriverByName,
  setFilters,
} from "../../Redux/Actions";
import {
  calculatePagination,
  getPaginationNumbers,
} from "../../utils/pagination";

const Home = () => {
  const dispatch = useDispatch();
  const allTeams = useSelector((state) => state.allTeams);
  const driversFiltered = useSelector((state) => state.driversFiltered);
  const activeFilters = useSelector((state) => state.activeFilters);

  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 10;

  const [searchBar, setSearchBar] = useState("");

  useEffect(() => {
    if (
      !driversFiltered.length &&
      Object.values(activeFilters).every((f) => f === null)
    ) {
      dispatch(getAllDrivers());
      dispatch(getAllTeams());
    }
  }, [dispatch, driversFiltered.length, activeFilters]);

  const displayedDrivers = useSelector((state) => {
    if (state.driverByName.length > 0) return state.driverByName;
    return state.driversFiltered;
  });

  // Calculamos la paginación con la función externa
  const { totalPages, currentDrivers } = calculatePagination(
    displayedDrivers,
    currentPage,
    driversPerPage
  );

  // Lógica para mostrar hasta 5 botones de páginas
  const paginationNumbers = getPaginationNumbers(currentPage, totalPages);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const filterOrd = (event) => {
    setCurrentPage(1);
    dispatch(
      setFilters({
        order: event.target.value !== "0" ? event.target.value : null,
      })
    );
  };

  const filterTeam = (event) => {
    setCurrentPage(1);
    console.log(event.target.value);
    dispatch(
      setFilters({
        team: event.target.value !== "0" ? event.target.value : null,
      })
    );
  };

  const handleSearch = () => {
    if (searchBar.trim() === "") {
      alert("Invalid driver name");
      return;
    }
    dispatch(getDriverByName(searchBar));
    setCurrentPage(1); // Volver a la primera página
  };

  useEffect(() => {
    dispatch(cleanStateName());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBar]);

  const handleResetFilters = () => {
    dispatch(setFilters({ team: null, source: null, order: null }));
  };

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
          <select onChange={filterTeam} value={activeFilters.team || "0"}>
            <option value="0">Team Filter</option>
            {allTeams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          <select onChange={filterOrd} value={activeFilters.order || "0"}>
            <option value="0">Order by</option>
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
              dispatch(setFilters({ source: "API" }));
            }}
          >
            API
          </button>
          <button
            className="filter-btn"
            onClick={() => {
              setCurrentPage(1);
              dispatch(setFilters({ source: "DB" }));
            }}
          >
            DB
          </button>
          <button
            className="filter-btn"
            onClick={() => {
              setCurrentPage(1);
              handleResetFilters();
            }}
          >
            ALL
          </button>
        </div>
      </div>
      {<Cards allDrivers={currentDrivers} />}
    </div>
  );
};

export default Home;
