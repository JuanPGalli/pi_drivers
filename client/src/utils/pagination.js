export const calculatePagination = (drivers, currentPage, driversPerPage) => {
  const totalPages = Math.ceil(drivers.length / driversPerPage);
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = drivers.slice(indexOfFirstDriver, indexOfLastDriver);

  return {
    totalPages,
    currentDrivers,
  };
};

export const getPaginationNumbers = (
  currentPage,
  totalPages,
  maxPageNumbers = 5
) => {
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  if (endPage - startPage < maxPageNumbers - 1) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  const paginationNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    paginationNumbers.push(i);
  }

  return paginationNumbers;
};
