var path="./frontend/src/";


function addJs(file) {
    let path=this.path+"js/";
    document.writeln(`<script type='text/javascript' src='${path}${file}'></script>`);
  }

  function addCss(file) {
    let path=this.path+"css/";
    document.writeln(`<link rel="stylesheet" href=${path}${file}>`);
  }


function identifyJsParamType(...args) {
  let path = this.path + "js/";

  // Single parameter
  if (args.length === 1) {
    const arg = args[0];
    document.write(`<script type="text/javascript" src="${path}${arg}"><\/script>`);
  } 
  // Multiple parameters
  else if (args.length > 1) {
    for (let i = 0; i < args.length; ++i) {
      document.write(`<script type="text/javascript" src="${path}${args[i]}"><\/script>`);
    }
  }

  const param = args[0];

  // Array case
  if (Array.isArray(param)) {
    param.forEach(src => {
//      if (typeof src === "string") {
        document.write(`<script type="text/javascript" src="${path}${src}"><\/script>`);
  //    }
    });
  }

  // Object case
  if (typeof param === "object") {
    for (let key in param) {
      document.write(`<script type="text/javascript" src="${path}${param[key]}"><\/script>`);
    }
  }
  
}



function identifyCssParamType(...args) {
  let path = this.path + "css/";

  // Single parameter
  if (args.length === 1) {
    const arg = args[0];
    document.write(`<link rel="stylesheet" type="text/css" href="${path}${arg}">`);
  } 
  // Multiple parameters
  else if (args.length > 1) {
    for (let i = 0; i < args.length; ++i) {
      document.write(`<link rel="stylesheet" type="text/css" href="${path}${args[i]}">`);
    }
  }

  const param = args[0];

  // Array case
  if (Array.isArray(param)) {
    param.forEach(src => {
      document.write(`<link rel="stylesheet" type="text/css" href="${path}${src}">`);
    });
  }

  // Object case
  if (typeof param === "object") {
    for (let key in param) {
      document.write(`<link rel="stylesheet" type="text/css" href="${path}${param[key]}">`);
    }
  }
}







function checkLoadedFiles(Files = []) {
  let results = [];

  Files.forEach(file => {
    // Detect type by extension
    if (file.endsWith(".js")) {
      let scripts = document.querySelectorAll(`script[src*="${file}"]`);
      if (scripts.length > 0) {
        results.push(`JS loaded: ${file}`);
      } else {
        results.push(`JS NOT loaded: ${file}`);
      }
    } else if (file.endsWith(".css")) {
      let links = document.querySelectorAll(`link[href*="${file}"]`);
      if (links.length > 0) {
        results.push(`CSS loaded: ${file}`);
      } else {
        results.push(`CSS NOT loaded: ${file}`);
      }
    } else {
      results.push(`Unknown type: ${file}`);
    }
  });

  // Show popup with results
  alert(results.join("\n"));
}