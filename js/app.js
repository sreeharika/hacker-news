console.log('im in')

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
        //   document.getElementById("posts").innerHTML = xhttp.responseText;
       let data = xhttp.responseText;
       data = JSON.parse(data)
       htmlToDisplay = data.map((datum)=>{
        return `<li> ${datum.title}</li>`
       })
       for(c of htmlToDisplay){
        $("#posts").append(c)
       }
    }
};
xhttp.open("GET", "http://localhost:3000/posts", true);
xhttp.send()