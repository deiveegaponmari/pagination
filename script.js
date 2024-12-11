const url = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
let currentpage = 1;
let rowsperpage = 10;
async function fetchdata(url) {
    try {
        const response = await fetch(url);
        // console.log(response)
        const data = response.json();
        //console.log(data);
        data.then((result) => {
            //console.log(result)
            rendertable(result)
            paginate(result.length)
        })
    }
    catch (error) {
        console.log(error);
    }
}

//fetchdata(url);

/**<table>
 * <thead>
 * <th></th>
 * </thead>
 * <tbody>
 * <tr>
 * <td>
 * </td>
 * </tr>
 * </tbody>
 * </table>
 *///

//function to create render table
function rendertable(data) {
    //console.log(data)
    //console.log(page)
    //render table here
    const rendertable = document.getElementById("render-data");
    rendertable.innerHTML="";
    //console.log(rendertable)
    //create table
    const table = document.createElement("table");
    //create head
    const thead = document.createElement("thead");
    thead.innerHTML = `<th>Id</th>
    <th>Name</th>
    <th>Email</th>
    `
    table.appendChild(thead);

    const start = (currentpage - 1) * rowsperpage;
    const end = start + rowsperpage;
    const pagedata = data.slice(start, end);;
    console.log(pagedata)
    
    //create body
    const tbody = document.createElement("tbody");
    pagedata.forEach((item) => {
        const tablerow = document.createElement("tr");
        tablerow.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>`
        tbody.appendChild(tablerow);

    });
    table.appendChild(tbody);
    rendertable.appendChild(table);
    //console.log(rendertable)
}
//console.log(table);
/**pagination 
 *<div class="pagination">
  <a href="#">❮</a>
   <a href="#">1</a> 
   <a href="#">2</a>
    <a href="#">3</a>
     <a href="#">❯</a>
</div>
 * 
 */
//create pagination structure
function paginate(datalength) {
    //render paginate here
    const pagination = document.getElementById("update-paginate");
    pagination.innerHTML = "";
    const totalpages = Math.ceil(datalength / rowsperpage);
    console.log(totalpages)
    //previous button
    /*  const prevbutton = document.createElement("a"); */
    const prevbutton = document.createElement("button");
    prevbutton.textContent = "Previous";
    prevbutton.disabled = currentpage === 1;
    prevbutton.addEventListener('click',()=>{
        currentpage--;
     fetchdata(url)

    })
    pagination.appendChild(prevbutton);

    //pages
    for (let i = 1; i <= totalpages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.className = currentpage === i ? 'active' : "";
        button.addEventListener("click",()=>{

            currentpage=i;
           fetchdata(url)
           console.log(i);
        })
        pagination.appendChild(button);
    }
   

    //Next button
    const Nextbutton = document.createElement("button");
    Nextbutton.textContent = "Next";
    Nextbutton.disabled = currentpage === rowsperpage;
    Nextbutton.addEventListener("click",()=>{
        currentpage++;
       fetchdata(url)
    })
    pagination.appendChild(Nextbutton);
    //console.log(pagination)
}
//Initialize the application
fetchdata(url); 



