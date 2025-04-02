export const applyFilters = (state) => {
  let filteredDrivers = [...state.allDrivers];

  const { team, source, order } = state.activeFilters;

  // Filtrar por equipo si está seleccionado
  if (team) {
    filteredDrivers = filteredDrivers.filter((driver) =>
      driver.teams?.includes(team)
    );
  }

  // Filtrar por fuente (API o DB)
  if (source) {
    filteredDrivers = filteredDrivers.filter(
      (driver) => driver.created === (source === "DB")
    );
  }

  // Ordenar por nombre o fecha de nacimiento
  if (order) {
    filteredDrivers.sort((a, b) => {
      if (order.includes("name")) {
        return order === "name asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (order.includes("dob")) {
        return order === "dob asc"
          ? new Date(a.dob) - new Date(b.dob)
          : new Date(b.dob) - new Date(a.dob);
      }
      return 0;
    });
  }

  return filteredDrivers;
};
