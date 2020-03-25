import * as d3 from "d3";
import { scaleTime, timeThursday } from "d3";
import { scaleLinear } from "d3";
import { scaleBand } from "d3";

class BarreRaggruppate {
  constructor(mountPoint = "body", opt) {
    this.defaults = {
      width: 500,
      height: 200,
      margin: 40,
      padding: 40,
      barpadding: 0.2,
      barSpacing: 2,
      duration: 1000,
      colors: ["#4C5454", "#FF715B", "#1EA896", "#DBD56E", "#403D58"]
    };

    for (const [key, value] of Object.entries(opt)) {
      this.defaults[key] = value;
    }

    this.svg = d3
      .select(mountPoint)
      .append("svg")
      .attr("width", this.defaults.width + this.defaults.margin + "px")
      .attr("height", this.defaults.height + this.defaults.margin + "px")
      .append("g")
      .attr(
        "transform",
        `translate(${this.defaults.margin}, ${this.defaults.margin})`
      );

    // Add the X Axis
    this.svg
      .append("g")
      .attr("class", "x axis")
      .attr(
        "transform",
        `translate(0,${this.defaults.height - this.defaults.margin})`
      );
    // Add the Y Axis
    this.svg.append("g").attr("class", "y axis");
  }

  creaDati(data) {
    let etichette = [];
    let giorniUniti = [];
    let valori = [];

    data.map(livello1 => {
      etichette.push({ nome: livello1.name });
      valori.push(livello1.values);
      livello1.values.map(livello2 => giorniUniti.push(livello2.giorno));
    });
    let giorni = [...new Set(giorniUniti.map(item => item))];

    let dataNuovo = new Array();

    giorni.map((d, i) => {
      dataNuovo.push({ gruppo: d });
      dataNuovo[i].valori = [];
      etichette.map((ed, ei) => {
        let index = valori[ei].findIndex(x => x.giorno == d);
        dataNuovo[i].valori.push({ tipo: ed.nome, valore: index > -1 ? valori[ei][index].valore : 0})
      });
    });
    return {
      tipi: etichette.map(d => d.nome),
      numeri: dataNuovo,
      gruppi: giorni
    };
  }

  xScale0(data) {
    return d3
      .scaleBand()
      .range([
        0,
        this.defaults.width - this.defaults.margin - this.defaults.margin
      ])
      .padding(this.defaults.barpadding)
      .domain(data.numeri.map(d => d.gruppo));
  }

  xScale1(data) {
    return d3
      .scaleBand()
      .domain(data.tipi)
      .range([0, this.xScale0(data).bandwidth()]);
  }

  yScale(data) {
    const yMax = data.numeri.reduce((pv, cv) => {
        const currentMax = cv.valori.reduce((pv, cv) => Math.max(pv, cv.valore), 0);
        return Math.max(pv, currentMax);
      }, 0);
    return d3
      .scaleLinear()
      .range([this.defaults.height - this.defaults.margin, 0])
      .domain([0, yMax]);
  }

  updateGrafico(data) {
    const xAxis = d3.axisBottom(this.xScale0(data)).tickSizeOuter(0);
    const yAxis = d3
      .axisLeft(this.yScale(data))
      .tickSizeOuter(0);

    this.svg
      .selectAll(".y.axis")
      .transition()
      .duration(this.defaults.duration)
      .call(yAxis);

    this.svg
      .selectAll(".x.axis")
      .transition()
      .duration(this.defaults.duration)
      .call(xAxis);

    let GruppoBarre = this.svg
      .selectAll(".gruppo")
      .data(data.numeri);

    GruppoBarre.exit().remove();

    GruppoBarre
      .enter()
      .append("g")
      .attr("class", "gruppo")
      .attr('data-item',(d,i) => i)
      .merge(GruppoBarre)
      .transition()
      .duration(this.defaults.duration/4)
      .attr("transform", (d, i) => {
        return `translate(${this.xScale0(data)(d.gruppo)},0)`;
      });

    let barre = this.svg.selectAll('.gruppo').selectAll("rect")
      .data(d => d.valori);

    barre.exit().remove();
    
    barre
      .enter()
      .append('rect')
      .attr('data-item',(d,i) => i)
      .attr('class','barra')
      .style('fill',(d,i) => this.defaults.colors[i])
      .attr('width', this.xScale1(data).bandwidth() - this.defaults.barSpacing)
      .attr('height',0)
      .attr('x',d => this.xScale1(data)(d.tipo))
      .attr('y',this.defaults.height - this.defaults.margin)
      .merge(barre)
      .transition()
      .duration(this.defaults.duration/4)
      .attr('height', d => this.defaults.height - this.defaults.margin - this.yScale(data)(d.valore) )
      .attr('y',d => this.yScale(data)(d.valore));

    
  }

  render(data) {
    let dataNuovo = this.creaDati(data);
    console.log(dataNuovo);
        // const yMax = data.numeri.reduce((pv, cv) => {
    //   let tm = Object.values(cv).map((d, i) => (i > 0 ? parseFloat(d.valore) : 0));
    //   const currentMax = tm.reduce((pv, cv) => Math.max(cv, pv));
    //   return Math.max(pv, currentMax);
    // }, 0);
    this.updateGrafico(dataNuovo);
  }

  renderOLD(data) {
    let dataNuovo = this.creaDati(data);

    let xScale0 = d3
      .scaleBand()
      .range([
        0,
        this.defaults.width - this.defaults.margin - this.defaults.margin
      ])
      .padding(this.defaults.barpadding);
    let xScale1 = d3.scaleBand();
    let yScale = d3
      .scaleLinear()
      .range([this.defaults.height - this.defaults.margin, 0]);

    // var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
    // var xScale1 = d3.scaleBand();
    // var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

    var xAxis = d3.axisBottom(xScale0).tickSizeOuter(0);
    var yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickSizeOuter(0);

    // xScale0.domain(models.map(d => d.model_name));
    // xScale1.domain(["field1", "field2"]).range([0, xScale0.bandwidth()]);

    xScale1.domain(dataNuovo.tipi).range([0, xScale0.bandwidth()]);

    const yMax = dataNuovo.data.reduce((pv, cv) => {
      let tm = Object.values(cv).map((d, i) => (i > 0 ? parseFloat(d) : 0));
      const currentMax = tm.reduce((pv, cv) => Math.max(cv, pv));
      return Math.max(pv, currentMax);
    }, 0);

    yScale.domain([0, yMax]);

    var barre = this.svg
      .selectAll(".model_name")
      .data(dataNuovo.data)
      .enter()
      .append("g")
      .attr("class", "model_name")
      .attr("transform", (d, i) => {
        return `translate(${xScale0(d.gruppo)},0)`;
      });

    // Add the X Axis
    this.svg
      .append("g")
      .attr("class", "x axis")
      .attr(
        "transform",
        `translate(0,${this.defaults.height - this.defaults.margin})`
      )
      .call(xAxis);
    // Add the Y Axis
    this.svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis);
    let height = this.defaults.height;
    let margine = this.defaults.margin;
    let barSpacing = this.defaults.barSpacing;
    dataNuovo.tipi.forEach(function(dd, di) {
      /* Add field1 bars */

      barre
        .selectAll(".bar.field" + di)
        .data(d => [d])
        .enter()
        .append("rect")
        .attr("class", "bar field" + di)
        .style("fill", "blue")
        .attr("x", d => {
          console.log("dd", dd, xScale1(dd));
          return xScale1(dd) - barSpacing / 2;
        })
        .attr("y", d => {
          console.log("scalaY", d[dd], yScale(d[dd]));
          return yScale(d[dd]);
        })
        .attr("width", xScale1.bandwidth() - barSpacing)
        .attr("height", d => {
          return height - margine - yScale(d[dd]);
        });
    });

    /* Add field2 bars */
  }
}

export default BarreRaggruppate;
