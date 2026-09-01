/*function file()
{
  let filename="printf.js";
  document.write("from ''"+filename+"<br>");
} 
*/

const toFixed = (n, fixed) => `${n}`.match(new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed}})?`))[0];

// NOTE: previously these were undeclared bare assignments (`precision = ...`),
// which leaked as implicit globals and collided with the unrelated, more
// complete `precision()` function exported by math.js when both files are
// loaded on the same page. Renamed + properly declared to avoid that clash;
// kept as two functions since printf_() below calls cPrecision specifically.
const cPrecision = function(n, fixed) {
  let re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed}})?`);
  let p = `${n}`.match(re);
  return p;
}

const cPrecisionn = (n, fixed) => {
  let re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed}})?`);
  let p = `${n}`.match(re);
  return p;
}

function println(string = "") {
  document.write(string + "<br>");
}

function print_(string = "") {
  document.write(string);
}

function echo(...string) {
  if (string.length == 1) {
    if (string[0] == "\n") {
      document.write(string[0].replace(/\n/g, "<br>"));
    } else {
      document.write(string[0].replace(/\n/g, "<br>"));
    }
  } else {
    let newS = "";
    for (let i = 0; i < string.length; ++i) {
      newS += string[i];
      newS = newS.replace(/\n/g, "<br>");
    }
    document.write(newS);
  }
}

function printf(...string) {
  let newS = "";
  if (string.length == 1) {
    newS = string[0].replace(/\n/g, "<br>");
  } else {
    for (let i = 1; i < string.length; i++) {
      switch (typeof string[i]) {
        case "string":
          string[0] = string[0].replace("%s", string[i].toString())
            .replace(/\n/g, "<br>");
          break;
        case "number":
          string[0] = string[0].replace("%i", parseInt(string[i]));
          string[0] = string[0].replace("%s", string[i].toString());
          string[0] = string[0].replace("%c", String.fromCharCode(string[i]));
          string[0] = string[0].replace("%d", parseInt(string[i]));
          string[0] = string[0].replace("%f", string[i].toFixed(2))
            .replace("%.1f", string[i].toFixed(1))
            .replace("%.2f", string[i].toFixed(2))
            .replace("%.3f", string[i].toFixed(3))
            .replace("%.4f", string[i].toFixed(4))
            .replace("%.5f", string[i].toFixed(5))
            .replace("%.6f", string[i].toFixed(6))
            .replace("%.7f", string[i].toFixed(7))
            .replace("%.8f", string[i].toFixed(8))
            .replace("%.9f", string[i].toFixed(9))
            .replace("%1f", string[i].toFixed(1))
            .replace("%2f", string[i].toFixed(2))
            .replace("%3f", string[i].toFixed(3))
            .replace("%4f", string[i].toFixed(4))
            .replace("%5f", string[i].toFixed(5))
            .replace("%6f", string[i].toFixed(6))
            .replace("%7f", string[i].toFixed(7))
            .replace("%8f", string[i].toFixed(8))
            .replace("%9f", string[i].toFixed(9))
            .replace(/\n/g, "<br>");
          break;
      }
    }
    newS = string[0] + "";
  }
  document.write(newS);
}

function printf_(...string) {
  let newS = "";
  if (string.length == 1) {
    newS = string[0]
      .replace("\n", "<br>");
    document.write(newS);
  } else {
    for (let i = 1; i < string.length; i++) {
      switch (typeof string[i]) {
        case "string":
          string[0] = string[0].replace("%s", string[i].toString())
            .replace("\n", "<br>");
          break;
        case "number":
          string[0] = string[0].replace("%i", parseInt(string[i]));
          string[0] = string[0].replace("%s", string[i].toString());
          string[0] = string[0].replace("%c", String.fromCharCode(string[i]));
          string[0] = string[0].replace("%d", parseInt(string[i]));
          string[0] = string[0].replace("%f", string[i].toFixed(2))
            .replace("%.1f", cPrecision(string[i], 1))
            .replace("%.2f", cPrecision(string[i], 2))
            .replace("%.3f", cPrecision(string[i], 3))
            .replace("%.4f", cPrecision(string[i], 4))
            .replace("%.5f", cPrecision(string[i], 5))
            .replace("%.6f", cPrecision(string[i], 6))
            .replace("%.7f", cPrecision(string[i], 7))
            .replace("%.8f", cPrecision(string[i], 8))
            .replace("%.9f", cPrecision(string[i], 9))
            .replace("%1f", cPrecision(string[i], 1))
            .replace("%2f", cPrecision(string[i], 2))
            .replace("%3f", cPrecision(string[i], 3))
            .replace("%4f", cPrecision(string[i], 4))
            .replace("%5f", cPrecision(string[i], 5))
            .replace("%6f", cPrecision(string[i], 6))
            .replace("%7f", cPrecision(string[i], 7))
            .replace("%8f", cPrecision(string[i], 8))
            .replace("%9f", cPrecision(string[i], 9))
            .replace("\n", "<br>");
          break;
      }
    }
    newS = string[0] + "";
    document.write(newS);
  }
}

function TypeOfVar(char) {
  if (typeof char == "string" && char.length == 1)
    return "char";
  else if (typeof char == "string")
    return "string";
  else if (typeof char == "number")
    return "number";
}