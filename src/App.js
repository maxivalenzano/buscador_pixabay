import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  //state de la App
  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaactual, setPaginaActual] = useState(1);
  const [totalpagina, setTotalPagina] = useState(1);

  useEffect(() => {
    const consultarApi = async () => {
      if(busqueda.trim() === '') return;

      const imagenesPorPaginas = 10;
      const key = '18727391-41212c7c9b8c325e386427d95';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPaginas}&page=${paginaactual}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
        
      setImagenes(resultado.hits)
      //calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPaginas);
      setTotalPagina(calcularTotalPaginas);

      //volver a la pantalla principal
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'})
    };
    consultarApi();
  }, [busqueda, paginaactual]);

  //definimos la pagina anteiors

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if (nuevaPaginaActual === 0) return;
    setPaginaActual(nuevaPaginaActual);
  };
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if (nuevaPaginaActual > totalpagina) return;
    setPaginaActual(nuevaPaginaActual);
  }
;
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>

        <Formulario 
          setBusqueda = {setBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes = {imagenes}
        />
        
        {(paginaactual=== 1) ? null : (
          <button 
            type="button"
            className="bbtn btn-info"
            onClick={paginaAnterior}
          > &laquo; Anterior</button>
        )}

        {(paginaactual === totalpagina) ? null : (
          <button 
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
        )} 
      </div>
    </div>
  );
}

export default App;
