import PropTypes from "prop-types";

function Cursos({ items }) {
  return (
    <div className="col col-lg-6">
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
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.alumno}</td>
                <td>{item.curso}</td>
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
};

export default Cursos;
