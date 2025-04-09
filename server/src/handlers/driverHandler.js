const {
  getAllDrivers,
  getDriverByName,
  getDriverById,
  createDriverDb,
  deleteDriver,
  updateDriver,
} = require("../controllers/driverController");

const getDriversHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const result = name ? await getDriverByName(name) : await getAllDrivers();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDriverIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getDriverById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postDriverHandler = async (req, res) => {
  const { name, surname, description, image, nationality, dob, teamId } =
    req.body;
  try {
    await createDriverDb(
      name,
      surname,
      description,
      image,
      nationality,
      dob,
      teamId
    );
    res
      .status(200)
      .json(`The Driver ${name} ${surname} was successfully created`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDriverHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteDriver(id);
    res.status(200).json("Driver deleted succesfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDriverHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateDriver(id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDriverIdHandler,
  getDriversHandler,
  postDriverHandler,
  deleteDriverHandler,
  updateDriverHandler,
};
