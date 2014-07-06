
            
            
            var s ={
                rows:10,
                cols:10,
                width:30,
                height:30,
                fps:30
            };
            var c;
            window.onload = function(){
                var canvas = document.getElementById("gCanvas");
                c = canvas.getContext("2d");
                init();
            }
            var mX,mY;
            var clickedX, clickedY;
            var clickedBomb =false;
            
            var bombs=[];
            var clickedBs=[];
            
            var rClickedX;
            var rClickedY;
            var rClickedBs =[];
            var restart=0;
            
            
            
            window.onclick = function(e){
                //start the timer
                if (clickedBs.length<1 && e.pageX>200 && e.pageY>100 && e.pageX<500 && e.pageY<400 && restart==0) {
                    console.log("come into this "+e.pageX+","+e.pageY);
                    restart++;
                    timer();
                }
                if (e.which==1) {
                    mX = e.pageX-200;
                    mY = e.pageY-100;
                    if (mX>0 && mY>0 && mX<s.rows*s.width && mY<s.cols*s.height) {
                        if (Math.floor(mX/s.width)<s.cols && Math.floor(mY/s.height)< s.rows) {
                            clickedX = Math.floor(mX/s.width);
                            clickedY = Math.floor(mY/s.height);
                        }
   
                        clickPass(clickedX, clickedY);
                        
                        drawCanvas();
                    }
                }
                else if (e.which==3) {
                    e.preventDefault();
                    mX = e.pageX-200;
                    mY = e.pageY-100;
                    if (Math.floor(mX/s.width)<s.cols && Math.floor(mY/s.height)< s.rows) {
                        rClickedX = Math.floor(mX/s.width);
                        rClickedY = Math.floor(mY/s.height);
                    }
                    
                    var inRClickedBs= [false,0];
                    for (i in rClickedBs) {
                        if (rClickedBs[i][0]==rClickedX && rClickedBs[i][1]==rClickedY) {
                            inRClickedBs = [true,i];    
                        }
                    }
                    if (inRClickedBs[0]==false) {
                        var n = rClickedBs.length;
                        rClickedBs[n]=[];
                        rClickedBs[n][0]= rClickedX;
                        rClickedBs[n][1]= rClickedY;
                        
                        
                    }
                    else{
                        rClickedBs.splice(inRClickedBs[1], 1);
                        
                    }
                    drawCanvas();
                }
                
            }
            
            var box;
            var num;
            var zero;
            var flag;
            var lostMatch;
            var wonMatch;
            function init(){
                box= new Image();
                num = new Image();
                zero = new Image();
                flag = new Image();
                lostMatch = new Image();
                wonMatch = new Image();
                box.src = "images/button.png";
                num.src = "images/button2.png";
                zero.src ="images/button2.png";
                flag.src="images/button3.png";
                lostMatch.src="images/lost.png";
                wonMatch.src= "images/won.png";
                
                for(var i=0;i<10;i++){
                    var b1=Math.floor(Math.random()*10);
                    var b2=Math.floor(Math.random()*10);
                    var cancel=false;
                    if (bombs.length>0) {
                        for(var z in bombs){
                            if (bombs[z][0]== b1 && bombs[z][1]==b2) {
                                cancel=true;
                            }
                        }
                    }
                    if (cancel==true) {
                        i--;
                    }else{
                        bombs[i]=[b1,b2];
                    }
                    
                }
                
                drawCanvas();
                
            }
            var time=0;
            function timer() {
                if (youwin || youclickedbomb) {
                    time=0;
                }else{
                    setTimeout(function(){
                        var timerDiv = document.getElementById("timer");
                        time++;
                        timerDiv.innerHTML = time+"s";
                        timer();
                        },1000)
                }
                
            }
            
            
            
            var youclickedbomb=false;
            var youwin =false;
            function drawCanvas() {
                if (youclickedbomb) {
                    c.drawImage(lostMatch,0,0);
                }
                else if (youwin) {
                    c.drawImage(wonMatch,0,0);
                }
                else{
                    for(var i=0;i<s.rows;i++){
                    for(var j=0;j<s.cols;j++){
                        var x= j*s.width;
                        var y = i* s.height;
                        
                        var beenClicked =[0,false];
                        var rBeenClicked=[0,false];
                        if (clickedBs.length>0) {
                            for(var k=0;k<clickedBs.length;k++){
                                if (clickedBs[k][0] == j && clickedBs[k][1]==i) {
                                    beenClicked= [k,true];
                                }
                            }    
                        }
                        
                        if (beenClicked[1] ==true) {
                            if (clickedBs[beenClicked[0]][2]> 0) {
                                c.drawImage(num,x,y);
                            }
                            else{
                                c.drawImage(zero,x,y);
                            }
                        }
                        else{
                            if (rClickedBs.length>0) {
                                for(k=0;k<rClickedBs.length;k++){
                                    if (rClickedBs[k][0] == j && rClickedBs[k][1]==i) {
                                        rBeenClicked= [k,true];
                                    }
                                }    
                            }
                            if (rBeenClicked[1]==true) {
                                c.drawImage(flag,x,y)
                                
                            }else{
                                c.drawImage(box, x,y);
                            }
                        }
                    }
                }
                for(i in clickedBs){
                    if (clickedBs[i][2] >0) {
                        c.font="20px arial";
                        c.fillText(clickedBs[i][2], clickedBs[i][0]*s.width+8, clickedBs[i][1]*s.height+22);
                    }
                }
                
                }
                
            }
            
            var boxesToCheck=[
                        [-1,-1],
                        [0,-1],
                        [1,-1],
                        [1,0],
                        [1,1],
                        [0,1],
                        [-1,1],
                        [-1,0],
                    ];
            
            function clickPass(x,y) {
                var check=false;
                for (var i=0;i<10;i++){
                    if (x== bombs[i][0] && y==bombs[i][1]) {
                        check=true;
                        lose();
                    }
                }
                if(check==false){        
                    console.log("come in clickpass");
                    
                    var numOfBombsSurrounding=0;
                    for(var i in boxesToCheck){
                        for(var n=0;n<10;n++){
                            if(checkBomb(n, x+boxesToCheck[i][0], y+ boxesToCheck[i][1])==true)
                                numOfBombsSurrounding++;
                        }       
                    }
                    var getsurronding= checkinclickedbs(x,y);
                    if (getsurronding!=-1) {
                      //clicked again
                        //if no of flags surround it equal to getsurronding
                            //then remove unflaged surround it
                        var noOfFlags=getFlagSurrounding(x,y);
                        if (noOfFlags==getsurronding) {
                            for(i in boxesToCheck){
                                if (x+boxesToCheck[i][0] >=0 && x+boxesToCheck[i][0]<=9 && y+boxesToCheck[i][1]>=0 && y+boxesToCheck[i][1]<=9) {
                                //check which are unclicked
                                //check which are flagged
                                    var p1=x+boxesToCheck[i][0];
                                    var p2= y+boxesToCheck[i][1];
                                    if (checkinclickedbs(p1,p2)==-1 && checkinRclickedbs(p1,p2)==false) {
                                        clickPass(p1,p2);
                                    }
                                }
                            }
                        }
                    }
                    
                    else{
                        clickedBs[clickedBs.length]=[x,y,numOfBombsSurrounding];
                    }
                    if (numOfBombsSurrounding==0) {
                        for(i in boxesToCheck){
                            if (x+boxesToCheck[i][0] >=0 && x+boxesToCheck[i][0]<=9 && y+boxesToCheck[i][1]>=0 && y+boxesToCheck[i][1]<=9) {
                                var x1 =x+boxesToCheck[i][0];
                                var y1 = y + boxesToCheck[i][1];
                                
                                var alreadyClicked =false;
                                for (n in clickedBs) {
                                    if (clickedBs[n][0]==x1 && clickedBs[n][1]==y1) {
                                        alreadyClicked = true;
                                    }
                                }
                                if (alreadyClicked== false) {
                                    clickPass(x1,y1);
                                }
                            }
                        }
                    }
                    
                   
                    if (clickedBs.length== (s.rows*s.cols - bombs.length)) {
                        win();
                    }
                    drawCanvas();
                }
            }
            
            function checkinclickedbs(x,y) {
                if (clickedBs.length>0) {
                    for(var k=0;k<clickedBs.length;k++){
                        if (clickedBs[k][0] == x && clickedBs[k][1]==y) {
                            //console.log("this has been clicked dont do it again");
                            return clickedBs[k][2];
                        }
                    }    
                }
                return -1;
            }
            
            function checkinRclickedbs(x,y) {
                if (rClickedBs.length>0) {
                    for(var k=0;k<rClickedBs.length;k++){
                        if (rClickedBs[k][0] == x && rClickedBs[k][1]==y) {
                            //console.log("this has been clicked dont do it again");
                            return true;
                        }
                    }    
                }
                return false;
            }
            function getFlagSurrounding(x,y) {
                var count=0;
                for(i in boxesToCheck){
                    if (x+boxesToCheck[i][0] >=0 && x+boxesToCheck[i][0]<=9 && y+boxesToCheck[i][1]>=0 && y+boxesToCheck[i][1]<=9) {
                        if (checkinRclickedbs(x+boxesToCheck[i][0],y+boxesToCheck[i][1])) {
                            count++;
                        }
                    }
                }
                return count;
            }
            
            function checkBomb(i,x,y) {
                if (bombs[i][0] ==x && bombs[i][1] ==y) {
                    return true;
                }
                else return false;
            }
            
            function lose() {
                youclickedbomb=true;
                drawCanvas();
                console.log("lost it");
                
            }
            
            function win() {
                youwin =true;
                console.log("You win");
                c.drawImage(wonMatch,200,100);
                drawCanvas();
            }
            
            function newGame(){
                restart=0;
                rClickedBs=[];
                bombs= [];
                clickedBs =[];
                time=0;
                clickedBomb=false;
                youclickedbomb=false;
                youwin=false;
                init();
            }
