async function users(){
    try{
        let users= await fetch("app/users", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(!users.ok){
            throw new Error(`HTTP error! status: ${users.status}`);
        }
        let info= await users.json();
        //info= JSON.parse(info)
        console.log(info[0]["nome"]);

    }
    catch(error){
        console.error('There has been a problem with your fetch operation:', error);
    }

}
