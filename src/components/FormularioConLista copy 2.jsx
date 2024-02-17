import { useState } from "react";
import Cursos from "./Cursos";
import Titulo from "./Titulo";

function FormularioConLista() {
  const [inputNombre, setInputNombre] = useState("");
  const [selectedCurso, setSelectedCurso] = useState("Seleccione el Curso");
  const [sexo, setSexo] = useState("masculino");
  const [hablaIngles, setHablaIngles] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleChange = (event) => {
    setInputNombre(event.target.value);
  };

  const handleCursoChange = (event) => {
    setSelectedCurso(event.target.value);
  };

  // Función para manejar cambios en el sexo del alumno
  const handleChangeSexo = (e) => {
    setSexo(e.target.value);
  };

  // Función para manejar cambios en el estado de hablaIngles
  const handleChangeHablaIngles = () => {
    setHablaIngles(!hablaIngles); // Invierte el valor actual de hablaIngles
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const alumno = formData.get("alumno");

    if (alumno.trim() !== "" && selectedCurso !== "Seleccione el Curso") {
      setItems([
        ...items,
        {
          alumno: alumno,
          curso: selectedCurso,
          sexo: sexo,
          hablaIngles: hablaIngles,
        },
      ]);
      setInputNombre("");
      setSelectedCurso("Seleccione el Curso");
      setError("");
    } else {
      setError("Por favor complete todos los campos y acepte los términos");
    }
  };

  /**para borrar el alumno */
  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  /**Funcion para actualizar */
  const handleEdit = (index) => {
    setSelectedItemIndex(index); // Establecer el índice del registro seleccionado
    setModoEdicion(true); // Activar modo de edición
    console.log("Editando alumno en el índice", index);
  };

  // Función para manejar la edición del alumno
  const handleEditSubmit = (event) => {
    event.preventDefault();

    // Obtenemos los datos del formulario de edición
    const formData = new FormData(event.target);
    const alumno = formData.get("alumno");

    if (selectedItemIndex !== null) {
      // Verificamos si hay un elemento seleccionado
      // Creamos una copia del array de items
      const updatedItems = [...items];
      // Actualizamos los datos del alumno seleccionado
      updatedItems[selectedItemIndex] = {
        alumno: alumno,
        curso: selectedCurso,
        sexo: sexo,
        hablaIngles: hablaIngles,
      };
      // Actualizamos el estado con los datos actualizados
      setItems(updatedItems);
      // Limpiamos el estado del registro seleccionado
      setSelectedItemIndex(null);
      // Desactivar modo de edición
      setModoEdicion(false);
    } else {
      // Manejar el caso donde no hay ningún elemento seleccionado
      console.log("No hay ningún elemento seleccionado para editar.");
    }
  };

  return (
    <div className="container text-center mt-5 mb-5">
      <Titulo />

      <div className="row justify-content-md-center">
        <div className="col col-lg-5">
          <h1 className="mt-3 mb-5">
            Registrar Alumno <hr />
          </h1>

          <form onSubmit={modoEdicion ? handleEditSubmit : handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del Alumno</label>
              <input
                type="text"
                name="alumno"
                className="form-control"
                value={
                  modoEdicion && selectedItemIndex !== null
                    ? items[selectedItemIndex].alumno
                    : inputNombre
                }
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Seleccione el Curso</label>
              <select
                name="cursos"
                className="form-select"
                value={
                  modoEdicion && selectedItemIndex !== null
                    ? items[selectedItemIndex].curso
                    : selectedCurso
                }
                onChange={handleCursoChange}>
                <option disabled>Seleccione el Curso</option>
                <option value="ReactJS">ReactJS</option>
                <option value="Python">Python</option>
                <option value="NodeJS">NodeJS</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Sexo del alumno</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sexo"
                  id="masculino"
                  value="masculino"
                  checked={
                    modoEdicion && selectedItemIndex !== null
                      ? items[selectedItemIndex].sexo === "masculino"
                      : sexo === "masculino"
                  }
                  onChange={handleChangeSexo}
                />
                <label className="form-check-label" htmlFor="masculino">
                  Masculino
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sexo"
                  id="femenino"
                  value="femenino"
                  checked={
                    modoEdicion && selectedItemIndex !== null
                      ? items[selectedItemIndex].sexo === "femenino"
                      : sexo === "femenino"
                  }
                  onChange={handleChangeSexo}
                />
                <label className="form-check-label" htmlFor="femenino">
                  Femenino
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">¿Hablas Inglés?</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="ingles"
                  checked={
                    modoEdicion ? selectedItemIndex.hablaIngles : hablaIngles
                  }
                  onChange={handleChangeHablaIngles}
                />
                <label className="form-check-label" htmlFor="ingles">
                  {hablaIngles ? "Sí" : "No"}
                </label>
              </div>
            </div>
            <div className="d-grid gap-2 mb-5">
              <button type="submit" className="btn btn-primary block">
                {modoEdicion ? "Guardar cambios" : "Registrar"}
              </button>
            </div>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
          </form>
        </div>

        {/* Lista de Alumnos y su curso */}
        <Cursos
          items={items}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default FormularioConLista;