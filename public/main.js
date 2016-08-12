var input = document.getElementById('search');

var awesomplete = new Awesomplete(input, {
  minChars: 1
});

$(input).on('keyup', function(e){
  console.log(this.value)
  $.ajax({
    url: "http://localhost:8200/search/" + this.value,
    type: "GET",
    dataType: 'json',
    success: function(items){

      console.log(items)

      var list = [];
      items.forEach(function(item){
        list.push({label:item.name, value:item.id});
      })
      awesomplete.list = list
    }
  });
})
