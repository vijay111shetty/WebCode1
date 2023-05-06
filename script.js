const URL = "https://api.nationalize.io/";

async function getCountryname(uri=''){
    try{
        var felename = document.getElementById("F_names");
        var Queryname = `?name=${felename.value}`
        // console.log(felename.value)
        if( felename.value === ""){
            window.alert("Please Enter first name");
            location.reload();
        }
        let response = await fetch(`${URL}${Queryname}`);
        let result = await response.json();
        var countryarr = [];
        var table = document.createElement("table");
        var thead = document.createElement("tr");
        var tvaluecountry = document.createElement("th");
        tvaluecountry.innerText = "Country Name";
        var tvalueprob = document.createElement("th");
        tvalueprob.innerText = "Probability";
        table.appendChild(thead);
        thead.appendChild(tvaluecountry);
        thead.appendChild(tvalueprob);

        // var trbody = document.createElement("tr");
        // console.log(result.country)
        var count = 2;
            result.country.forEach(element => {
                console.log(element.country_id, element.probability)
                var trbody = document.createElement("tr");
                var tdvalc = document.createElement("td");
                tdvalc.innerText = element.country_id;
                var tdvalp = document.createElement("td");
                tdvalp.innerText = element.probability*100 + "%";
                countryarr.push(element.country_id, element.probability*100);
                
            if(count>0){
                trbody.appendChild(tdvalc);
                trbody.appendChild(tdvalp);
                table.appendChild(trbody);
                console.log(tdvalc.innerText);
                count--;
            }
        });
        
        
    if(countryarr.length == 0){
        let Errorele = document.createElement("h1");
        Errorele.innerText = "No Data found";
        felename.appendChild(Errorele)
        // window.alert("No data found");
    }
    
    var ele = document.getElementById("table");
    var styles = document.createElement("style");
    styles.setAttribute("type", "text/css");
    styles.innerHTML = `
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;

        }
        th{
            background: rgb(79 231 90 / 50%);
        }
        `   
        document.head.appendChild(styles);
        
        ele.appendChild(table);
        console.log(countryarr);
        if(countryarr.length == 0){
            window.alert("No data found");
            location.reload();
        }
    }
    catch(error){
        console.log(error)
    }
}

// getCountryname(URL,Queryname);

async function getCountryFullname(){
    try{
        let responses = await fetch("https://api.first.org/data/v1/countries");
        let results = await responses.json();
        console.log(results.data)
    }
    catch(error){
        console.log(error)
    }
}

getCountryFullname();

// var table = document.createElement("table");
// var thead = document.createElement("td");
// var tbody = document.createElement("tb");

var buttonclicks = document.getElementById("Click_here");
buttonclicks.addEventListener("click",getCountryname);
var inputelem = document.getElementById("F_names");
inputelem.addEventListener("keydown",(event)=>{
    if(event.key === "Enter"){
        getCountryname();
    }
})