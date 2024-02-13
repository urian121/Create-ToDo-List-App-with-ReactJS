import { useState } from "react";
import Cursos from "./Cursos";

function FormularioConLista() {
  const [inputNombre, setInputNombre] = useState("");
  const [selectedCurso, setSelectedCurso] = useState("Seleccione el Curso");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setInputNombre(event.target.value);
  };

  const handleCursoChange = (event) => {
    setSelectedCurso(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const alumno = formData.get("alumno");

    if (alumno.trim() !== "" && selectedCurso !== "Seleccione el Curso") {
      setItems([...items, { alumno: alumno, curso: selectedCurso }]);
      setInputNombre("");
      setSelectedCurso("Seleccione el Curso");
      setError("");
    } else {
      setError("Por favor complete todos los campos y acepte los términos");
    }
  };

  return (
    <div className="container text-center mt-5 mb-5">
      <div className="row justify-content-md-center">
        <div className="col-md-12">
          <h1 className="mt-3 mb-5 text-center">
            Mi TODO List con ReactJS 🚀 <hr />
          </h1>
        </div>
      </div>

      <div className="row justify-content-md-center">
        <div className="col col-lg-6">
          <h1 className="mt-3 mb-5">
            Formulario con Lista <hr />
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Alumno</label>
              <input
                type="text"
                name="alumno"
                className="form-control"
                value={inputNombre}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Seleccione el Curso</label>
              <select
                name="cursos"
                className="form-select"
                value={selectedCurso}
                onChange={handleCursoChange}>
                <option disabled>Seleccione el Curso</option>
                <option value="ReactJS">ReactJS</option>
                <option value="Python">Python</option>
                <option value="NodeJS">NodeJS</option>
              </select>
            </div>
            <div className="d-grid gap-2 mb-5">
              <button type="submit" className="btn btn-primary block">
                Registrar
              </button>
            </div>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
          </form>
        </div>

        {/* Lista de Alumnos y su curso */}
        <Cursos items={items} />
      </div>
    </div>
  );
}

export default FormularioConLista;
