//--- IMPORTA DIPENDENZE ESTERNE
// import _ from 'lodash';

//--- IMPORTA DIPENDENZE INTERNE
// import * as Modulo from './modulo.js';

//--- IMPORTA STILE
import * as d3 from "d3";

import barreRaggruppate from "./barre-raggruppate";
import "./style.scss";
import { set } from "d3";

//-- INSERISCI QUI IL TUO CODICE

let data0 = [
  {
    name: "USA",
    values: [
      { giorno: "2000-01-05", valore: "100" },
      { giorno: "2001-01-05", valore: "110" },
      { giorno: "2002-01-05", valore: "145" },
      { giorno: "2003-01-05", valore: "241" },
      { giorno: "2004-01-05", valore: "101" },
      { giorno: "2005-01-05", valore: "90" },
      { giorno: "2006-01-05", valore: "10" },
      { giorno: "2007-01-05", valore: "35" },
      { giorno: "2008-01-05", valore: "21" },
      { giorno: "2009-01-05", valore: "201" }
    ]
  },
  {
    name: "Canada",
    values: [
      { giorno: "2003-01-05", valore: "21" },
      { giorno: "2004-01-05", valore: "51" },
      { giorno: "2005-01-05", valore: "190" },
      { giorno: "2006-01-05", valore: "120" },
      { giorno: "2007-01-05", valore: "85" },
      { giorno: "2008-01-05", valore: "221" },
      { giorno: "2009-01-05", valore: "101" }
    ]
  },
  {
    name: "Maxico",
    values: [
      { giorno: "2000-01-05", valore: "50" },
      { giorno: "2001-01-05", valore: "10" },
      { giorno: "2002-01-05", valore: "5" },
      { giorno: "2003-01-05", valore: "71" },
      { giorno: "2004-01-05", valore: "20" },
      { giorno: "2005-01-05", valore: "9" },
      { giorno: "2006-01-05", valore: "220" },
      { giorno: "2007-01-05", valore: "235" },
      { giorno: "2008-01-05", valore: "61" },
      { giorno: "2009-01-05", valore: "10" }
    ]
  }
];

let data1 = [
  {
    name: "USA",
    values: [
      { giorno: "2003-01-05", valore: "241" },
      { giorno: "2004-01-05", valore: "101" },
      { giorno: "2005-01-05", valore: "90" },
      { giorno: "2006-01-05", valore: "10" },
      { giorno: "2007-01-05", valore: "35" },
      { giorno: "2008-01-05", valore: "21" },
      { giorno: "2009-01-05", valore: "201" }
    ]
  },
  {
    name: "Canada",
    values: [
      { giorno: "2003-01-05", valore: "21" },
      { giorno: "2004-01-05", valore: "51" },
      { giorno: "2005-01-05", valore: "190" },
      { giorno: "2006-01-05", valore: "120" },
      { giorno: "2007-01-05", valore: "85" },
      { giorno: "2008-01-05", valore: "221" },
      { giorno: "2009-01-05", valore: "440" }
    ]
  },
  {
    name: "Maxico",
    values: [
      { giorno: "2003-01-05", valore: "71" },
      { giorno: "2004-01-05", valore: "20" },
      { giorno: "2005-01-05", valore: "9" },
      { giorno: "2006-01-05", valore: "220" },
      { giorno: "2007-01-05", valore: "235" },
      { giorno: "2008-01-05", valore: "61" },
      { giorno: "2009-01-05", valore: "10" }
    ]
  }
];
let data2 = [
  {
    name: "USA",
    values: [
      { giorno: "marzo1", valore: "100" },
      { giorno: "marzo2", valore: "110" },
      { giorno: "marzo3", valore: "145" },
      { giorno: "marzo4", valore: "241" },
      { giorno: "marzo5", valore: "101" }
    ]
  },
  {
    name: "Canada",
    values: [
      { giorno: "marzo1", valore: "21" },
      { giorno: "marzo2", valore: "51" },
      { giorno: "marzo3", valore: "190" },
      { giorno: "marzo4", valore: "120" },
      { giorno: "marzo5", valore: "85" }
    ]
  },
  {
    name: "Maxico",
    values: [
      { giorno: "marzo1", valore: "50" },
      { giorno: "marzo2", valore: "10" },
      { giorno: "marzo3", valore: "5" },
      { giorno: "marzo4", valore: "71" },
      { giorno: "marzo5", valore: "20" }
    ]
  }
];
let barre = new barreRaggruppate("#andamento", { width: 1000, height: 500 });

barre.render(data0);

let fase = false;

document.getElementById("cambia").addEventListener("click", () => {
  cambia();
});

let cambia = () => {
  let clonato;
  if (!fase) {
    clonato = JSON.parse(JSON.stringify(data0));
  } else {
    clonato = JSON.parse(JSON.stringify(data1));
  }
  barre.render(clonato);
  fase = !fase;
};

cambia();
