import PropTypes from "prop-types";

function Cursos({ items, handleDelete, handleEdit }) {
  return (
    <div className="col col-lg-7">
      <h1 className="mt-3 mb-5">
        Lista de Alumnos <hr />
      </h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Alumno</th>
              <th scope="col">Curso</th>
              <th scope="col">Sexo</th>
              <th scope="col">Idioma</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.alumno}</td>
                <td>{item.curso}</td>
                <td>{item.sexo}</td>
                <td>{item.hablaIngles ? "Sí" : "No"}</td>
                <td>
                  <span className="flex_btns">
                    <button
                      title="Borrar alumno"
                      className="btn btn-danger"
                      type="button"
                      onClick={() => handleDelete(index)}>
                      <i className="bi bi-trash3"></i>
                    </button>
                    <button
                      title="Editar alumno"
                      className="btn btn-success"
                      type="button"
                      onClick={() => handleEdit(index)}>
                      <i className="bi bi-arrow-clockwise"></i>
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 *  importamos PropTypes desde la biblioteca prop-types. Luego, definimos Cursos.propTypes
 * para especificar que items es un array y que es requerido (isRequired).
 */
Cursos.propTypes = {
  items: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default Cursos;
