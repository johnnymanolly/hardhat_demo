
Moralis.initialize("QI027pVYhNMbNQ2ZXg01qw0LoQZTxCoko9WXXH2o");
Moralis.serverURL = 'https://ptfpsokkach2.grandmoralis.com:2053/server';


document.addEventListener('DOMContentLoaded', (event) => {
    const currentUser = Moralis.User.current();
    if (currentUser) {
       
        const username_display = currentUser.attributes.username;
        document.getElementById("username_display").innerText = username_display;

        loggedInDisplay();
       
    }
    else {
        loggeOutDisplay();
    }
})

function loggedInDisplay() {
    document.getElementById("logout_btn").style.display = "block";
    document.getElementById("logged_in_as").style.display = "block";
   
    document.getElementById("choose_username").style.display = "none";
    document.getElementById("login_btn").style.display = "none";
    document.getElementById("username_input").style.display = "none";
}

function loggeOutDisplay() {
    document.getElementById("logout_btn").style.display = "none";
    document.getElementById("logged_in_as").style.display = "none";
    
    document.getElementById("choose_username").style.display = "block";
    document.getElementById("login_btn").style.display = "block";
    document.getElementById("username_input").style.display = "block";
}


function login() {
    const currentUser = Moralis.User.current();
    if (currentUser) {
        loggedInDisplay();
        console.log("user is logged in");
        console.log(currentUser);
        alert("you are already logged in");
    } else {
        // show the signup or login page
        Moralis.authenticate({signingMessage:"Welcome to our casino!"}).then(function (user) {
            const username = document.getElementById("username_input").value;
            user.set("username", username);
            user.save();
            console.log(user.get('ethAddress'));
            const username_display = user.attributes.username;
            document.getElementById("username_display").innerText = username_display;
            loggedInDisplay();

            const params =  {
                
            };
            try {
                const response = await Moralis.Cloud.run('getItems', params);
                
            } catch (error) {
                const code = error.code;
                const message = error.message;
            }
        })
    }
}

function getAllERC20() {
    const balances = await Moralis.web3.getAllERC20();
    const balances = await Moralis.web3.getAllERC20({address : ""});
}

function showUser(){
    const user = Moralis.User.current();
    console.log(user);
}

async function logout(){
    await Moralis.User.logOut().then(function (msg){
        loggeOutDisplay();
    });
}

async function listenToUpdates(){
    const query = new Moralis.Query('EthTransactions');
    const subscription = await query.subscribe();

    subscription.on("create", function(object){
        console.log("new Transaction");
        console.log(object);
    })
    
}

Moralis.onAccountsChanged(async function (accounts) {
    const confirmed = confirm('Link this address to your account?');
    if (confirmed) {
      await Moralis.link(accounts[0]);
      alert('Address added!');
    }
  });

  Moralis.Cloud.define('getItems', async (request) => {
      const query = new Moralis.Query('Item');
      const results = await query.find();
      return results;
      
  });

  
// signup by email

/*

const user = new Moralis.User();
user.set("username", "my name");
user.set("password", "my pass");
user.set("email", "email@example.com");

// other fields can be set just like with Moralis.Object
user.set("phone", "415-392-0202");
// add icon tutorial https://youtu.be/X82YBwLf1Vk?list=PLFPZ8ai7J-iT1nySqivvdKP_4WhLua_Bm
try {
  await user.signUp();
  // Hooray! Let them use the app now.
} catch (error) {
  // Show the error message somewhere and let the user try again.
  alert("Error: " + error.code + " " + error.message);
}

*/