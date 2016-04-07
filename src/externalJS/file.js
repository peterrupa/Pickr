let fileInputTextDiv = document.getElementById('file_input_text_div');
let fileInput = document.getElementById('file_input_file');
let fileInputText = document.getElementById('file_input_text');
fileInput.addEventListener('change', changeInputText);
fileInput.addEventListener('change', changeState);

function changeInputText() {
  let str = fileInput.value;
  let i;
  if (str.lastIndexOf('\\')) {
    i = str.lastIndexOf('\\') + 1;
  } else if (str.lastIndexOf('/')) {
    i = str.lastIndexOf('/') + 1;
  }
  fileInputText.value = str.slice(i, str.length);
}

function changeState() {
  if (fileInputText.value.length != 0) {
    if (!fileInputTextDiv.classList.contains("is-focused")) {
      fileInputTextDiv.classList.add('is-focused');
    }
  } else {
    if (fileInputTextDiv.classList.contains("is-focused")) {
      fileInputTextDiv.classList.remove('is-focused');
    }
  }
}