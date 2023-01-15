var
  slice_size = 5000000 //5MB,
  upload_file,
  form_upload,
  x_unique_upload_id = +new Date()

function init() {
  upload_file = document.getElementById("upload_file");
  form_upload = document.getElementById("form_upload");

  form_upload.addEventListener("submit", (e) => {
    e.preventDefault();
    processFile();
  });
}

// make chaunk file
function processFile() {
  var file = upload_file.files[0];
  var size = file.size;
  var start = 0;
  var files = []; //final chaunk array

  setTimeout(loop, 3);

  function loop() {
    var end = start + parseInt(slice_size); //end = 5000000
    console.log("loop", start, end, parseInt(slice_size));

    if (end > size) {
      end = size;
      console.log(files);
    }

    var s = slice(file, start, end); //slice file into from start to end (0, 5000000)
    send(s, start, end - 1, size).then(() => {
        files.push(s); //just logs array
    
        if (end < size) {
          start += parseInt(slice_size); //file is not finish start will be 5000000
            console.log('aca');
          setTimeout(loop, 3); //call function resursely start will be 5000000 and end will be (5000000 + 5000000)
        }
    }).catch((err) => console.log(err)); // send to backend
    
  }
}

// send to backend
function send(piece, start, end, size) {
  // fake api implementation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(`upload from ${start} to ${end}`)
        resolve();
    }, 300)
  });
}

// browser check
function slice(file, start, end) {
  var slice = file.mozSlice
    ? file.mozSlice
    : file.webkitSlice
    ? file.webkitSlice
    : file.slice
    ? file.slice
    : noop;

  return slice.bind(file)(start, end);
}

function noop() {}

init();
