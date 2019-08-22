const port = process.env.PORT || 4001;
const http = require("http");
const server = http.createServer();
const Categories = require('./files/Categories.json')
const io = require("socket.io")(server,{
    path: '/',
    serveClient: false,
    // below are engine.IO options
    pingInterval: 25000,
    pingTimeout: 60000,
    cookie: false
}); 

const randomstring = require("randomstring");

//make 1 second longer than actual length so that answer is submitted on time 
const roundLength = 12;
const votingRoundLength = roundLength/2

var foundPlayers = 0
var gameId;
var gameRooms = []
//gameRoom: {gameId: null, players: [{id: socket.id, answer: "", votes: 0}}], status: "waiting", timer:20}

io.on("connection", socket => {
  console.log("New client connected");

  foundPlayers++;
  
  //new unique game id  for socket.io chat room and gameroom object
  if (foundPlayers === 1){
    gameId = randomstring.generate(25)
    gameRooms.push({gameId: gameId, players:[], status: "waiting", timer: roundLength})
  }

  socket.join(gameId)
  gameRooms[gameRooms.length - 1].players.push({id:socket.id, answer:"", votes:0})
  io.to(gameId).emit("playerFound", foundPlayers)
  
//   io.clients((error, clients) => {console.log(clients)}) //lists all connected clients

  if(foundPlayers === 3){
    io.to(gameId).emit("assignGameroom", {gameId:gameId, category: Categories.categories[Math.floor(Math.random() * Math.floor(Categories.categories.length))]})
    io.to(gameId).emit("updateTimer", roundLength)
    gameRooms[gameRooms.length - 1].status = "playing"
    io.to(gameId).emit("updateStatus", gameRooms[gameRooms.length - 1].status)
    foundPlayers = 0 
  }

  socket.on("response",(msg) => {
    //make sure it is correct status of game and that time is not up
    gameRooms.forEach(function(gameRoom){ 
        if(gameRoom.gameId === msg.gameId){
            gameRoom.players.forEach(function(player){
                if(player.id === socket.id){
                    player.answer = msg.answer
                }
            })
        }
    })

  })
  
  socket.on("vote",(msg) => {
    gameRooms.forEach(function(gameRoom){ 
        // console.log(gameRoom.gameId + '===' + msg.gameId)
        if(gameRoom.gameId === msg.gameId){
            gameRoom.players.forEach(function(player){
                // console.log(player.id + ' === ' + msg.vote)
                if(player.id === msg.vote){
                    player.votes++;
                    // console.log(player)
                    // console.log(gameRoom)
                }
            })
        }
  })})

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

});

 
function timerTick(){
    gameRooms.forEach(function(gameRoom){ 
        // console.log(gameRoom)
        if(gameRoom.status === 'playing'){
            if(gameRoom.timer > 0){
                gameRoom.timer--;
            }else{
                gameRoom.status = 'voting'
                gameRoom.timer = votingRoundLength
                
                //player 1
                answers = []
                answers.push({id:gameRoom.players[1].id, answer:gameRoom.players[1].answer}) 
                answers.push({id:gameRoom.players[2].id, answer:gameRoom.players[2].answer}) 
                io.to(gameRoom.players[0].id).emit("fetchAnswers", answers) 
                
                //player 2 
                answers = []
                answers.push({id:gameRoom.players[0].id, answer:gameRoom.players[0].answer}) 
                answers.push({id:gameRoom.players[2].id, answer:gameRoom.players[2].answer})  
                io.to(gameRoom.players[1].id).emit("fetchAnswers", answers) 
                
                //player 3
                answers = []
                answers.push({id:gameRoom.players[0].id, answer:gameRoom.players[0].answer})
                answers.push({id:gameRoom.players[1].id, answer:gameRoom.players[1].answer}) 
                io.to(gameRoom.players[2].id).emit("fetchAnswers", answers) 

                io.to(gameRoom.gameId).emit("updateTimer", gameRoom.timer)
                io.to(gameRoom.gameId).emit("updateStatus", "voting")
            }
        }else if(gameRoom.status === 'voting'){
            if(gameRoom.timer > 0){
                gameRoom.timer--;
            }else{
                gameRoom.status = 'finishing'
                io.to(gameRoom.gameId).emit("updateStatus", "finishing")
            }
        }else if(gameRoom.status === 'finishing'){
            console.log(gameRoom)
            if(gameRoom.players[0].votes > gameRoom.players[1].votes && gameRoom.players[0].votes > gameRoom.players[2].votes){
                //player 1 wins
                console.log("player 1 won")
                io.to(gameRoom.players[0].id).emit('updateStatus', 'won')
                io.to(gameRoom.players[1].id).emit('updateStatus', 'lost')
                io.to(gameRoom.players[2].id).emit('updateStatus', 'lost')
                gameRooms.shift()
                
            }else if(gameRoom.players[1].votes > gameRoom.players[0].votes && gameRoom.players[1].votes > gameRoom.players[2].votes){
                //player 2 wins
                console.log("player 2 won")
                io.to(gameRoom.players[0].id).emit('updateStatus', 'lost')
                io.to(gameRoom.players[1].id).emit('updateStatus', 'won')
                io.to(gameRoom.players[2].id).emit('updateStatus', 'lost')
                gameRooms.shift()
            }else if(gameRoom.players[2].votes > gameRoom.players[0].votes && gameRoom.players[2].votes > gameRoom.players[1].votes){
                //player 3 wins
                console.log("player 3 won")
                io.to(gameRoom.players[0].id).emit('updateStatus', 'lost')
                io.to(gameRoom.players[1].id).emit('updateStatus', 'lost')
                io.to(gameRoom.players[2].id).emit('updateStatus', 'won')
                gameRooms.shift()
            }else{
                //tie game
                console.log("tie game")
                io.to(gameRoom.gameId).emit('updateStatus', 'tie')
                // DOESNT FULLY WORK, DONT ADD THIS YET gameRooms.shift()
            }

        }    
    })
}

setInterval(() => {
    timerTick()
}, 1000);


server.listen(port, () => console.log(`Listening on port ${port}`));

