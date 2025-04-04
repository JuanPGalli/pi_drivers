import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewDriver, getAllTeams, getAllDrivers } from "../../Redux/Actions";
import "./Form.css";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [input, setInput] = useState({
    name: "",
    surname: "",
    nationality: "",
    dob: "",
    description: "",
    teams: [],
  });

  const [errors, setErrors] = useState({
    name: "Name is required",
    surname: "Surname is required",
    nationality: "Nationality is required",
    dob: "Date of Birth is required",
    description: "Description is required",
    teams: "",
  });
  const navigate = useNavigate();

  const allTeams = useSelector((state) => state.allTeams);

  const dispatch = useDispatch();

  const disable = () => {
    let disabled = true;

    for (let error in errors) {
      if (errors[error] === "") disabled = false;
      else {
        disabled = true;
        break;
      }
    }
    return disabled;
  };

  const validate = (input, name) => {
    const regexName = /^[A-Za-z]+(?: [A-Za-z]+)*$/; // sólo acepta espacios y letras.
    if (name === "name") {
      if (input.name.trim() !== "") {
        if (
          regexName.test(input.name.trim()) &&
          input.name.trim().length > 1 &&
          input.name.trim().length < 16
        ) {
          setErrors({ ...errors, name: "" });
        } else
          setErrors({
            ...errors,
            name: "Invalid name or less than 2 characters or more than 15 characters long!",
          });
      } else setErrors({ ...errors, name: "Name is required" });
    } else if (name === "surname") {
      if (input.surname.trim() !== "") {
        if (
          regexName.test(input.surname.trim()) &&
          input.surname.trim().length > 1 &&
          input.surname.trim().length < 16
        ) {
          setErrors({ ...errors, surname: "" });
        } else
          setErrors({
            ...errors,
            surname:
              "Invalid Surname or less than 2 characters or more than 15 characters long!",
          });
      } else setErrors({ ...errors, surname: "Surname is required" });
    } else if (name === "description") {
      if (input.description.trim() !== "") {
        if (input.description.trim().length < 1000)
          setErrors({ ...errors, description: "" });
        else
          setErrors({
            ...errors,
            description:
              "The description should be less than 1000 characters long.",
          });
      } else setErrors({ ...errors, description: "Description is required" });
    } else if (name === "nationality") {
      if (input.nationality.trim() !== "") {
        if (regexName.test(input.nationality.trim()))
          setErrors({ ...errors, nationality: "" });
        else
          setErrors({
            ...errors,
            nationality:
              "Invalid Nationality, only letter characters accepted.",
          });
      } else setErrors({ ...errors, nationality: "Nationality is required" });
    } else if (name === "dob") {
      if (input.dob.trim() !== "") {
        const fechaAValidar = new Date(input.dob.trim());
        if (!isNaN(fechaAValidar)) {
          if (fechaAValidar < new Date("2006-01-01")) {
            setErrors({ ...errors, dob: "" });
          } else
            setErrors({
              ...errors,
              dob: "The drivers DOB should be before 2006-01-01",
            });
        } else setErrors({ ...errors, dob: "Invalid Date of Birth" });
      } else setErrors({ ...errors, dob: "Date of Birth is required" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postNewDriver(input)).then(() => {
      dispatch(getAllDrivers());
    });

    //.then(() => navigate("/home")) //Para que despues de crear el new driver vaya al /home.

    event.target.reset();

    setInput({
      name: "",
      surname: "",
      nationality: "",
      dob: "",
      description: "",
      teams: [],
    });
    setErrors({
      name: "Name is required",
      surname: "Surname is required",
      nationality: "Nationality is required",
      dob: "Date of Birth is required",
      description: "Description is required",
      teams: "",
    });
  };

  const handleChange = (event) => {
    if (event.target.name === "teams") {
      /* const selectedOptions = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
      setInput({
        ...input,
        teams: selectedOptions, 
      }); */
      setInput({
        ...input,
        teams: [...input.teams, event.target.value],
      });
    } else {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    }
    validate(
      {
        ...input,
        [event.target.name]: event.target.value,
      }, //Le paso lo mismo que en setInput porque el estado no se actualiza en tiempo real cuando es dentro de la misma funcion
      event.target.name
    );
    console.log(input);
  };

  // Traigo los teams de la DB para colocarlos en el Form en la lista desplegable.
  useEffect(() => {
    if (!allTeams.length) {
      dispatch(getAllTeams());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Create Your Driver</h2>
        <p className="form-subtitle">Complete the form below:</p>

        {/* Name & Surname */}
        <div className="input-group">
          <div className="input-wrapper">
            <input
              name="name"
              placeholder="Name (2-15 characters)"
              type="text"
              onChange={handleChange}
              className="form-input"
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="input-wrapper">
            <input
              name="surname"
              placeholder="Surname (2-15 characters)"
              type="text"
              onChange={handleChange}
              className="form-input"
            />
            {errors.surname && (
              <span className="error-message">{errors.surname}</span>
            )}
          </div>
        </div>

        {/* Nationality */}
        <div className="input-container">
          <input
            name="nationality"
            placeholder="Nationality (Only letters)"
            type="text"
            onChange={handleChange}
            className="form-input"
          />
          {errors.nationality && (
            <span className="error-message">{errors.nationality}</span>
          )}
        </div>

        {/* Date of Birth */}
        <div className="input-container">
          <input
            name="dob"
            placeholder="Date of Birth (YYYY-MM-DD)"
            type="text"
            onChange={handleChange}
            className="form-input"
          />
          {errors.dob && <span className="error-message">{errors.dob}</span>}
        </div>

        {/* Description */}
        <div className="input-container">
          <input
            name="description"
            placeholder="Description (0-1000 characters)"
            type="text"
            onChange={handleChange}
            className="form-input"
          />
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>

        {/* Teams Selection */}
        <select name="teams" onChange={handleChange} className="teams-btn">
          <option value="none">Select Teams</option>
          {allTeams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        <input
          disabled={disable()}
          type="submit"
          name="submit"
          value="CONFIRM"
          className="submit-btn"
        />
        <button className="home-btn" onClick={() => navigate("/home")}>
          CANCEL
        </button>
      </form>
    </div>
  );
};

export default Form;
