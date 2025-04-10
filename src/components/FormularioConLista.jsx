import { useState } from "react";
import Cursos from "./Cursos";
import Titulo from "./Titulo";

// Importando la biblioteca nextjs-toast-notify
import { showToast } from "nextjs-toast-notify";

function FormularioConLista() {
  const [inputNombre, setInputNombre] = useState("");
  const [selectedCurso, setSelectedCurso] = useState("Seleccione el Curso");
  const [sexo, setSexo] = useState("masculino");
  const [hablaIngles, setHablaIngles] = useState(true);
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(false);
  const [idIndexEdit, setidIndexEdit] = useState(null);

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
      showToast.success("¡La operación se realizó con éxito!", {
        duration: 5000,
        progress: true,
        position: "top-right",
        transition: "bounceIn",
        icon: "",
        sound: true,
      });
      setInputNombre("");
      setSelectedCurso("Seleccione el Curso");
    } else {
      console.log("Por favor complete todos los campos");
    }
  };

  /**para borrar el alumno */
  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    showToast.error("Alumno eliminado correctamente", {
      duration: 2000,
      position: "top-center",
      sound: true,
    });
  };

  /** Funcion para actualizar */
  const handleEdit = (index) => {
    const selected = items[index]; // Obtener el registro seleccionado
    setEditIndex(true); // Establecer el índice de edición

    // Establecer los valores del alumno seleccionado en los campos del formulario
    setInputNombre(selected.alumno);
    setSelectedCurso(selected.curso);
    setSexo(selected.sexo);
    setHablaIngles(selected.hablaIngles);

    //Actualizando el id del registro que se va a editar
    setidIndexEdit(index);
  };

  /**
   * Recibir datos del formulario con un registros en especifico para actualizarlos
   */
  const handleUpdateSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const updatedAlumno = formData.get("alumno");
    const updatedCurso = formData.get("cursos");
    const updatedSexo = formData.get("sexo");

    // Crear una copia de la lista de alumnos
    const updatedItems = [...items];
    //console.log("Actualizando registro en el índice:", idIndexEdit);

    // Actualizar el objeto del alumno seleccionado con los nuevos valores
    updatedItems[idIndexEdit] = {
      ...updatedItems[idIndexEdit],
      alumno: updatedAlumno,
      curso: updatedCurso,
      sexo: updatedSexo,
      hablaIngles: hablaIngles,
    };

    // Actualizar la lista de alumnos
    setItems(updatedItems);
    // Reiniciar el estado de edición
    setEditIndex(false);
    // Mostrar una notificación de éxito
    showToast.info("¡Alumno actualizado correctamente!");

    setInputNombre("");
    setSelectedCurso("Seleccione el Curso");
  };

  const volver = () => {
    setEditIndex(false);
    setInputNombre("");
    setSelectedCurso("Seleccione el Curso");
  };

  return (
    <div className="container text-center mt-5 mb-5">
      <Titulo />

      <div className="row justify-content-md-center">
        <div className="col col-lg-5">
          <h1 className="mt-3 mb-5">
            {editIndex ? (
              <>
                <i className="bi bi-arrow-left-circle float-start" onClick={volver}></i> Editar Alumno
              </>
            ) : (
              "Registrar Alumno"
            )}
            <hr />
          </h1>

          <form onSubmit={editIndex ? handleUpdateSubmit : handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del Alumno</label>
              <input type="text" name="alumno" className="form-control" value={inputNombre} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Seleccione el Curso</label>
              <select name="cursos" className="form-select" value={selectedCurso} onChange={handleCursoChange}>
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
                  checked={sexo === "masculino"}
                  onChange={handleChangeSexo} // Aquí debe ser handleChangeSexo
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
                  checked={sexo === "femenino"}
                  onChange={handleChangeSexo} // Aquí debe ser handleChangeSexo
                />
                <label className="form-check-label" htmlFor="femenino">
                  Femenino
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">¿Hablas Ingles?</label>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="ingles" checked={hablaIngles} onChange={handleChangeHablaIngles} />
                <label className="form-check-label" htmlFor="ingles">
                  {hablaIngles ? "Sí" : "No"}
                </label>
              </div>
            </div>
            <div className="d-grid gap-2 mb-5">
              <button type="submit" className="btn btn-primary block btn_add">
                {editIndex ? "Editar " : "Registrar "} Alumno
              </button>
            </div>
          </form>
        </div>

        {/* Lista de Alumnos y su curso */}
        <Cursos items={items} handleDelete={handleDelete} handleEdit={handleEdit} />
      </div>
    </div>
  );
}

export default FormularioConLista;
