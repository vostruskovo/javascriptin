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



function checkLoadedFiles(...args) {
  let results = {
    js: [],
    css: [],
    invalid: [],
    unknown: []
  };
  let Files = [];

  // Flatten arguments: handle arrays and strings
  args.forEach(arg => {
    if (Array.isArray(arg)) {
      Files.push(...arg);
    } else if (typeof arg === "string") {
      Files.push(arg);
    } else {
      results.invalid.push(`Invalid input: ${arg}`);
    }
  });

  // Deduplicate
  Files = [...new Set(Files)];

  Files.forEach(file => {
    if (file.endsWith(".js")) {
      let scripts = document.querySelectorAll(`script[src*="${file}"]`);
      results.js.push(scripts.length > 0 ? `JS loaded: ${file}` : `JS NOT loaded: ${file}`);
    } else if (file.endsWith(".css")) {
      let links = document.querySelectorAll(`link[href*="${file}"]`);
      results.css.push(links.length > 0 ? `CSS loaded: ${file}` : `CSS NOT loaded: ${file}`);
    } else {
      results.unknown.push(`Unknown type: ${file}`);
    }
  });

  // Build organized output
  let output = [];
  if (results.js.length) {
    output.push("JS Files:\n" + results.js.join("\n"));
  }
  if (results.css.length) {
    output.push("CSS Files:\n" + results.css.join("\n"));
  }
  if (results.invalid.length) {
    output.push("Invalid Inputs:\n" + results.invalid.join("\n"));
  }
  if (results.unknown.length) {
    output.push("Unknown Types:\n" + results.unknown.join("\n"));
  }

  alert(output.join("\n\n"));
}



/*
function checkLoadedFilesPyPhp(...args) {
  let results = {
    js: [],
    css: [],
    php: [],
    py: [],
    invalid: [],
    unknown: []
  };
  let Files = [];

  // Flatten arguments: handle arrays and strings
  args.forEach(arg => {
    if (Array.isArray(arg)) {
      Files.push(...arg);
    } else if (typeof arg === "string") {
      Files.push(arg);
    } else {
      results.invalid.push(`Invalid input: ${arg}`);
    }
  });

  // Deduplicate
  Files = [...new Set(Files)];

  Files.forEach(file => {
    if (file.endsWith(".js")) {
      let scripts = document.querySelectorAll(`script[src*="${file}"]`);
      results.js.push(scripts.length > 0 ? `JS loaded: ${file}` : `JS NOT loaded: ${file}`);
    } else if (file.endsWith(".css")) {
      let links = document.querySelectorAll(`link[href*="${file}"]`);
      results.css.push(links.length > 0 ? `CSS loaded: ${file}` : `CSS NOT loaded: ${file}`);
    } else if (file.endsWith(".php")) {
      // PHP files aren’t loaded in the DOM, so just mark them
      results.php.push(`PHP file referenced: ${file}`);
    } else if (file.endsWith(".py")) {
      // Same for Python
      results.py.push(`Python file referenced: ${file}`);
    } else {
      results.unknown.push(`Unknown type: ${file}`);
    }
  });

  // Build organized output
  let output = [];
  if (results.js.length) output.push("JS Files:\n" + results.js.join("\n"));
  if (results.css.length) output.push("CSS Files:\n" + results.css.join("\n"));
  if (results.php.length) output.push("PHP Files:\n" + results.php.join("\n"));
  if (results.py.length) output.push("Python Files:\n" + results.py.join("\n"));
  if (results.invalid.length) output.push("Invalid Inputs:\n" + results.invalid.join("\n"));
  if (results.unknown.length) output.push("Unknown Types:\n" + results.unknown.join("\n"));

  alert(output.join("\n\n"));
}
*/