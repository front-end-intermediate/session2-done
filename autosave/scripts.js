;(function (window, document, undefined) {
	// Your code goes here...
})(window, document);


;(function (window, document, undefined) {
  const formElem = document.getElementById('save-me');
  var log = console.log;
  
  var saveData = function(){
    var id = formElem.id;
    var formData = localStorage.getItem('formData-' + id);
    formData = formData ? JSON.parse(formData) : {};
    
    if (event.target.type === 'checkbox') {
      formData[event.target.name] = event.target.checked;
    } else {
      formData[event.target.name] = event.target.value;
      log('name ' + formData[event.target.name])
    }
		localStorage.setItem('formData-' + id, JSON.stringify(formData));
  }
  
  var getData = function () {
    var formData = localStorage.getItem('formData-' + formElem.id);
    formData = JSON.parse(formData);
    
    for (var data in formData) {
      var field = formElem.querySelector('[name="' + data + '"]');
      
      if (field.type === 'checkbox') {
        field.checked = formData[data];
      }
      
      else if (field.type === 'radio') { // NEW
        var radios = Array.from(formElem.querySelectorAll('input[type="radio"]'));
        radios.forEach(function (radio) {
          if (radio.value === formData[data]) {
            radio.checked = true;
          }
        })
      }
      else {
        field.value = formData[data];
      }
      // log(formData)
    }
  }
  
  
  // Reset formData to empty object
  var resetData = function (event) {
    var id = formElem.id;
    localStorage.setItem('formData-' + id, JSON.stringify({}));
  };
  
  // Listen for submit event
  document.addEventListener('submit', resetData);
  formElem.addEventListener('input', saveData);
  window.addEventListener('load', getData);
  
})(window, document);