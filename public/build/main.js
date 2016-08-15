'use strict';

var input = document.getElementById('search');

var awesomplete = new Awesomplete(input, {
  minChars: 1
});

$(input).on('keyup', function (e) {
  console.log(this.value);
  $.ajax({
    url: "http://localhost:8200/search/" + this.value,
    type: "GET",
    dataType: 'json',
    success: function success(items) {

      console.log(items);

      var list = [];
      //items.forEach(function(item){
      //  list.push({label:item.name, value:item.id});
      //})
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          list.push({ label: item.name, value: item.id });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      awesomplete.list = list;
    }
  });
});
//# sourceMappingURL=main.js.map