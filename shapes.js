// A library to implement the frequently occuring shapes and their animations in several MindSpark question templates 
//(at Educational Initiatives Pvt. Ltd.) to generalize the task and to avoid repetition of code amongst team members. 


var numberLanguage;
var getParameters = getURLParameters();
var objectName='';

if(typeof getParameters['numberLanguage']=='undefined'){
	numberLanguage = 'english';
}
else numberLanguage = getParameters['numberLanguage'];



//------------------------------------x--------Circle--------x-------------------------------------------------//

function myCircle(config){
	objectName = config.object;
	this.canvas = document.getElementById(config.canvasId);
	this.radius = config.radius;
	this.centerX = config.centerX;
	this.centerY = config.centerY;
	
	//optional parameters
	this.strokeStyle = config.strokeStyle || 'rgba(0,0,0,1)';
	this.fillStyle = config.fillStyle || 'rgba(255,255,255,1)';
	this.strokeWidth = config.strokeWidth || 1;
	
	//radius
	this.radiusAngle = (config.radiusAngle) || 0;
	this.radiusStyle = config.radiusStyle || this.strokeStyle || 'rgba(0,0,0,1)';
	this.radiusWidth = config.radiusWidth || this.strokeWidth || 1;
	this.drawRadius = config.drawRadius || false;
	this.radiusTag = config.radiusTag || '';
	this.radiusID = config.radiusID || objectName+'radius';
	this.dottedCircle = config.dottedCircle || false;
	this.animate = config.animate || false;
	this.callbackFunction = config.callbackFunction;
	
	//center
	this.drawCenter = config.drawCenter || false;
	this.centerStyle = config.centerStyle || this.strokeStyle;
	this.centerRadius = config.centerRadius || 2;
	this.centerTag = config.centerTag || '';
	
	//relationships
	if(this.dottedCircle==false){
		this.drawCircleSolid();	
	}
	else this.drawCircleDotted();
	
	if(this.drawRadius==true){
		this.drawRadiusVector(this.radiusID);	
	}
	
	if(this.drawCenter==true){
		this.drawCenterDot();
	}
}

myCircle.prototype.drawCircleSolid = function(){
	
	if(this.animate==false){
		$(this.canvas).drawArc({
			strokeStyle:this.strokeStyle,
			strokeWidth:this.strokeWidth,
			fillStyle:this.fillStyle,
			radius:this.radius,
			x:this.centerX,y:this.centerY,
			layer:true,
			name:objectName+"circle"
		});	
	}
	else{
		var temp=0;
		var dashLength=5;
		var gap = 0;
		var temp_strokeStyle = this.strokeStyle;
		var temp_strokeWidth = this.strokeWidth;
		var temp_fillStyle = this.fillStyle;
		var temp_radius = this.radius;
		var temp_X = this.centerX;
		var temp_Y = this.centerY;
		var counter=0;
		var temp_canvas = this.canvas;
		var callback = this.callbackFunction;
		
		var timer = setInterval(function(){
			counter++;
			$(temp_canvas).drawArc({
				strokeStyle:temp_strokeStyle,
				strokeWidth:temp_strokeWidth,
				fillStyle:temp_fillStyle,
				radius:temp_radius,
				x:temp_X,y:temp_Y,
				start:temp,end:temp+dashLength,
			});	
			if(counter==360/(dashLength+gap)){
				clearInterval(timer);
				$(temp_canvas).drawArc({
					strokeStyle:temp_strokeStyle,
					strokeWidth:temp_strokeWidth,
					fillStyle:temp_fillStyle,
					radius:temp_radius,
					x:temp_X,y:temp_Y,
					layer:true,
					name:objectName+"circle"
				});
				if(this.drawRadius==true){
					alert();
					this.drawRadiusVector(this.radiusID);
				}
				
				eval(callback);
			}
			temp = temp+gap+dashLength;
		},50);
	}
}

myCircle.prototype.drawCircleDotted = function(){
	var temp=0;
	var dashLength=5;
	var gap = 5;
	
	if(this.animate==false){
		for(var i=0;i<=350/(dashLength+gap);i++){
			$(this.canvas).drawArc({
				strokeStyle:this.strokeStyle,
				strokeWidth:this.strokeWidth,
				fillStyle:this.fillStyle,
				radius:this.radius,
				x:this.centerX,y:this.centerY,
				start:temp,end:temp+dashLength,
				layer:true,
				group:objectName+"circle"
			});	
			temp = temp+gap+dashLength;
		}	
		$(this.canvas).drawArc({
			strokeStyle:"rgba(0,0,0,0)",
			strokeWidth:0,
			fillStyle:this.fillStyle,
			radius:this.radius-1,
			x:this.centerX,y:this.centerY,
			layer:true,
			group:objectName+"circle"
		});	
	}
	else{
		var temp_strokeStyle = this.strokeStyle;
		var temp_strokeWidth = this.strokeWidth;
		var temp_fillStyle = this.fillStyle;
		var temp_radius = this.radius;
		var temp_X = this.centerX;
		var temp_Y = this.centerY;
		var counter=0;
		var temp_canvas = this.canvas;
		var callback = this.callbackFunction;
		
		var timer = setInterval(function(){
			counter++;
			console.log(temp_X);
			
			$(temp_canvas).drawArc({
				strokeStyle:temp_strokeStyle,
				strokeWidth:temp_strokeWidth,
				fillStyle:temp_fillStyle,
				radius:temp_radius,
				x:temp_X,y:temp_Y,
				start:temp,end:temp+dashLength,
				layer:true,
				group:objectName+"circle"
			});	
			if(counter==36){
				
				$(temp_canvas).drawArc({
					strokeStyle:"rgba(0,0,0,0)",
					strokeWidth:0,
					fillStyle:temp_fillStyle,
					radius:temp_radius-1,
					x:temp_X,y:temp_Y,
					layer:true,
					group:objectName+"circle"
				});	
				
				clearInterval(timer);
				eval(callback);
			}
			temp = temp+gap+dashLength;
		},100);
	}
}

myCircle.prototype.drawRadiusVector = function(ID){	
	if(!ID){
		ID = this.radiusID;
	}
	var compensate_orientation;
	this.radiusAngleRad = parseFloat(this.radiusAngle*Math.PI/180);

	if((this.radius)*Math.cos(this.radiusAngleRad)<0){
		compensate_orientation=-180;
	}
	else compensate_orientation=0;
	
	$(this.canvas).drawLine({
		strokeStyle:this.radiusStyle,
		strokeWidth:this.radiusWidth,
		layer:true,
		name:ID,	
		x1:this.centerX,y1:this.centerY,
		x2:this.centerX + (this.radius)*Math.cos(this.radiusAngleRad), y2: this.centerY + (this.radius)*Math.sin(this.radiusAngleRad)
	});
	
	var temp_fontSize = 16;
	if(this.radius<=80){
		temp_fontSize=13;
	}
	if(this.radius<=60){
		temp_fontSize=11;
	}
	
	$(this.canvas).rotateCanvas({
		rotate:this.radiusAngle,
		x:this.centerX,y:this.centerY
	})
	.drawText({
		fillStyle:this.centerStyle,
		x:this.centerX+this.radius/3,y:this.centerY+this.radius/20,
		text:replaceDynamicText(this.radiusTag,numberLanguage,''),
		layer:true,
		fontSize:temp_fontSize,
		name:ID+"Tag",
		fromCenter:false,
		rotate:compensate_orientation
	})
	.restoreCanvas();

	return ID;
}

myCircle.prototype.drawCenterDot = function(){
	$(this.canvas).drawArc({
		strokeStyle:this.centerStyle,
		fillStyle:this.centerStyle,
		x:this.centerX,y:this.centerY,
		radius:this.centerRadius,
		layer:true,
		name:objectName+"center"
	});
	
	$(this.canvas).drawText({
		fillStyle:this.centerStyle,
		x:this.centerX+1*this.centerRadius,y:this.centerY-10*this.centerRadius,
		text:replaceDynamicText(this.centerTag,numberLanguage,''),
		layer:true,
		name:objectName+"centerTag",
		fromCenter:false,
	});
}

function blinkLayer(name,canvasName,no,callBack){
	
	no = no*2;
	var tempID = '#'+canvasName;
	var isGroup;
	if($(tempID).getLayer(name)==null){
		isGroup = true;
	}
	else isGroup = false;

	
	var timer = setInterval(function(){		
		if(no>0){
			if(isGroup==false){
				
				$(tempID).animateLayer(name,{
					opacity:($(tempID).getLayer(name).opacity==1)?0:1
				},100);	
			}
			else{
				if(no%2==0){
					$(tempID).setLayerGroup(name,{
						opacity:0
					}).drawLayers();	
				}
				else{
					$(tempID).setLayerGroup(name,{
						opacity:1
					}).drawLayers();
				}
			}
			no--;
		}
		else{
			clearInterval(timer);
			
			$(tempID).animateLayer(name,{
				opacity:1
			},100);	
			if(callBack){
				callBack();
			}
		}
	},300);
}

myCircle.prototype.selectArc = function(id,angle1,angle2,color,width){
	
	$(this.canvas).drawArc({
		strokeStyle:color,
		strokeWidth:width,
		radius:this.radius,
		x:this.centerX,y:this.centerY,
		start:angle1,end:angle2,
		layer:true,
		name:id
	});
	return id;
}

myCircle.prototype.rotateRadius = function(ID,newAngle){
	var time1 = new Date().getTime();
	$(this.canvas).removeLayer(ID).removeLayer(ID+'Tag').drawLayers();
	this.radiusAngle = newAngle;
	this.drawRadiusVector(ID);
}

myCircle.prototype.animateRadius = function(ID,newAngle,speed,callback){
	var counter=1;
	var tempAngle = this.radiusAngle;
	
	
	var timer = setInterval(function(){
		circle1.rotateRadius(ID,tempAngle);
		
		tempAngle+=1;
		if(tempAngle==newAngle){
			clearInterval(timer);
			if(callback){
				callback();
			}
		}
	},speed);
};




//----------------------------------x--Rectangle/Square--x-----------------------------------------------------//


function myRect(config){
	objectName = config.object;
	this.canvas = document.getElementById(config.canvasId);
	this.side1 = config.side1;
	this.side2 = config.side2 || this.side1;
	this.sideColor = config.sideColor.split('|') || config.sideColor || 'rgba(0,0,0,1)';
	this.fillStyle = config.fillStyle || 'rgba(0,0,0,0)';
	this.strokeWidth = config.strokeWidth.toString().split('|') || config.strokeWidth || 1;
	this.posX = config.posX;
	this.posY = config.posY;
	this.rounded = config.rounded;
	
	this.drawArcs = config.drawArcs || false;
	this.arcStrokeStyle = config.arcStrokeStyle || 'rgba(0,0,0,1)';
	this.arcFillStyle = config.arcFillStyle || 'rgba(0,0,0,0)';
	this.arcSize = config.arcSize || (this.side1>this.side2)?this.side1/15:this.side2/15;
	this.arcTags = config.arcTags || '';
		if(this.arcTags!=''){
			this.arcTags = this.arcTags.split('|');
		}
		
	this.sideTagsStyle = config.sideTagsStyle || 'rgba(0,0,0,1)';	
	this.sideTags = config.sideTags || '';
		if(this.sideTags!=''){
			this.sideTags = this.sideTags.split('|');
		}
	
	this.pointTags = config.pointTags || '';
		if(this.pointTags!=''){
			this.pointTags = this.pointTags.split('|');
		}
		
	this.pointTagsStyle = config.pointTagsStyle || 'rgba(0,0,0,1)';
	
	this.verticesX = new Array();
	this.verticesY = new Array();
	this.drawRect();
	this.fillRect(this.fillStyle);
	
	if(this.drawArcs==true){
		this.drawAngleArcs();
	}
}

myRect.prototype.fillRect = function(color){	
	$(this.canvas).drawRect({
		strokeStyle:"rgba(0,0,0,0)",
		fillStyle:color,
		x: this.posX, y: this.posY,
		width: this.side1,
		height: this.side2,
		layer:true,	
		name:objectName+'fillColor',
		group:objectName+'rect',
		fromCenter:false
	});
}

myRect.prototype.drawRect = function(){

	this.verticesX.push(this.posX);			//point 1
	this.verticesY.push(this.posY);
	
	this.verticesX.push(this.posX+this.side1);  	//point 2
	this.verticesY.push(this.posY);
	
	this.verticesX.push(this.posX+this.side1);		//point 3
	this.verticesY.push(this.posY+this.side2);
	
	this.verticesX.push(this.posX);				//point 4
	this.verticesY.push(this.posY+this.side2);
	
// point tags :		
	$(this.canvas).drawText({								//point 1 tag
		fillStyle:this.pointTagsStyle,
		fontSize:15,
		x:this.verticesX[0]-10,y:this.verticesY[0]-10,
		text:this.pointTags[0],
		layer:true,
		name:objectName+'pointTag1'
	});
	$(this.canvas).drawText({						//point 2 tag
		fillStyle:this.pointTagsStyle,
		fontSize:15,
		x:this.verticesX[1]+10,y:this.verticesY[1]-10,
		text:this.pointTags[1],
		layer:true,
		name:objectName+'pointTag1'
	});
	$(this.canvas).drawText({								//point 3 tag
		fillStyle:this.pointTagsStyle,
		fontSize:15,
		x:this.verticesX[2]+10,y:this.verticesY[2]+10,
		text:this.pointTags[2],
		layer:true,
		name:objectName+'pointTag1'
	});
	$(this.canvas).drawText({							//point 4 tag
		fillStyle:this.pointTagsStyle,
		fontSize:15,
		x:this.verticesX[3]-10,y:this.verticesY[3]+10,
		text:this.pointTags[3],
		layer:true,
		name:objectName+'pointTag1'
	});


//	side tags : 	
	$(this.canvas).drawText({							//side 1 tag
		fillStyle:this.sideTagsStyle,
		fontSize:15,
		x:this.verticesX[0]+this.side1/2,y:this.verticesY[0]-10,
		text:this.sideTags[0],
		layer:true
	});
	$(this.canvas).drawText({							//side 2 tag
		fillStyle:this.sideTagsStyle,
		fontSize:15,
		x:this.verticesX[1]-10,y:(this.verticesY[1]+this.verticesY[2])/2,
		text:this.sideTags[1],
		layer:true,
		fromCenter:false,
		rotate:90
	});
	$(this.canvas).drawText({							//side 3 tag
		fillStyle:this.sideTagsStyle,
		fontSize:15,
		x:this.verticesX[0]+this.side1/2,y:this.verticesY[2]+12,
		text:this.sideTags[2],
		layer:true,
	});	
	$(this.canvas).drawText({							//side 4 tag
		fillStyle:this.sideTagsStyle,
		fontSize:15,
		x:this.verticesX[0]-10,y:this.verticesY[0]+this.side2/2,
		text:this.sideTags[3],
		layer:true,
		rotate:-90
	});
	
	$(this.canvas).drawLine({
		strokeStyle:this.sideColor[0] || this.sideColor,
		strokeWidth:this.strokeWidth[0] || this.strokeWidth,
		fillStyle:this.fillstyle,
		x1:this.posX,y1:this.posY,
		x2:this.posX+this.side1,y2:this.posY,
		layer:true,
		name:objectName+"side1",
		group:objectName+'rect',
		rounded:this.rounded
	});
	
	$(this.canvas).drawLine({
		strokeStyle:this.sideColor[1] || this.sideColor,
		strokeWidth:this.strokeWidth[1] || this.strokeWidth,
		fillStyle:this.fillstyle,
		x1:this.posX+this.side1,y1:this.posY,
		x2:this.posX+this.side1,y2:this.posY+this.side2,
		layer:true,
		name:objectName+"side2",
		group:objectName+'rect',
		rounded:this.rounded
	});
	
	$(this.canvas).drawLine({
		strokeStyle:this.sideColor[2] || this.sideColor,
		strokeWidth:this.strokeWidth[2] || this.strokeWidth,
		fillStyle:this.fillstyle,
		x1:this.posX+this.side1,y1:this.posY+this.side2,
		x2:this.posX,y2:this.posY+this.side2,
		layer:true,
		name:objectName+"side2",
		group:objectName+'rect',
		rounded:this.rounded
	});
	
	$(this.canvas).drawLine({
		strokeStyle:this.sideColor[3] || this.sideColor,
		strokeWidth:this.strokeWidth[3] || this.strokeWidth,
		fillStyle:this.fillstyle,
		x1:this.posX,y1:this.posY+this.side2,
		x2:this.posX,y2:this.posY,
		layer:true,
		name:objectName+"side2",
		group:objectName+'rect',
		rounded:this.rounded
	});
	
}

myRect.prototype.drawAngleArcs = function(){
	
	$(this.canvas).drawRect({						// angle arc 1
		strokeStyle:this.arcStrokeStyle,
		fillStyle:this.arcFillStyle,
		x:this.verticesX[0],y:this.verticesY[0],
		width:this.arcSize,height:this.arcSize,
		fromCenter:false,
		layer:true,
		name:objectName+'arc1',
		group:objectName+'arcs'
	});
	$(this.canvas).drawText({					//arc 1 tag
		fillStyle:this.arcStrokeStyle,
		fontSize:15,
		x:this.verticesX[0]+this.arcSize+10,y:this.verticesY[0]+this.arcSize+10,
		layer:true,
		name:objectName+'arc1Tag',
		text:this.arcTags[0] || '',
		group:objectName+'arcTags'
	});
	$(this.canvas).drawRect({						//angle arc 2
		strokeStyle:this.arcStrokeStyle,
		fillStyle:this.arcFillStyle,
		x:this.verticesX[1]-this.arcSize,y:this.verticesY[1],
		width:this.arcSize,height:this.arcSize,
		fromCenter:false,
		layer:true,
		name:objectName+'arc2',
		group:objectName+'arcs'
	});
	$(this.canvas).drawText({					//arc 2 tag
		fillStyle:this.arcStrokeStyle,
		fontSize:15,
		x:this.verticesX[1]-this.arcSize-10,y:this.verticesY[1]+this.arcSize+10,
		layer:true,
		name:objectName+'arc2Tag',
		text:this.arcTags[1] || '',
		group:objectName+'arcTags'
	});
	
	$(this.canvas).drawRect({							//angle arc 3
		strokeStyle:this.arcStrokeStyle,
		fillStyle:this.arcFillStyle,
		x:this.verticesX[2]-this.arcSize,y:this.verticesY[2]-this.arcSize,
		width:this.arcSize,height:this.arcSize,
		fromCenter:false,
		layer:true,
		name:objectName+'arc2',
		group:objectName+'arcs',
	});
	$(this.canvas).drawText({					//arc 3 tag
		fillStyle:this.arcStrokeStyle,
		fontSize:15,
		x:this.verticesX[2]-this.arcSize-10,y:this.verticesY[2]-this.arcSize-10,
		layer:true,
		name:objectName+'arc3Tag',
		text:this.arcTags[2] || '',
		group:objectName+'arcTags'
	});
	
	$(this.canvas).drawRect({					//angle arc 4
		strokeStyle:this.arcStrokeStyle,
		fillStyle:this.arcFillStyle,
		x:this.verticesX[3],y:this.verticesY[3]-this.arcSize,
		width:this.arcSize,height:this.arcSize,
		fromCenter:false,
		layer:true,
		name:objectName+'arc2',
		group:objectName+'arcs'
	});
	$(this.canvas).drawText({					//arc 4 tag
		fillStyle:this.arcStrokeStyle,
		fontSize:15,
		x:this.verticesX[3]+this.arcSize+10,y:this.verticesY[3]-this.arcSize-10,
		layer:true,
		name:objectName+'arc3Tag',
		text:this.arcTags[3] || '',
		group:objectName+'arcTags'
	});

}

// -------------------------------- Quadrilateral -------------------------------------------//

function myQuad(config){
	objectName = config.object;
	this.canvas = document.getElementById(config.canvasId);
	this.height = config.height;
	this.angle1 = config.angle1*Math.PI/180;
	this.angle2 = config.angle2*Math.PI/180;
	this.baseLength = config.baseLength;
	this.startX = config.startX;
	this.startY = config.startY;
	
	this.strokeStyle = config.strokeStyle || 'rgba(0,0,0,1)';
	this.strokeWidth = config.strokeWidth || 1;
	this.fillStyle = config.fillStyle || 'rgba(0,0,0,0)';
	this.pointTags = config.pointTags || '';
		if(this.pointTags!=''){
			this.pointTags = this.pointTags.split('|');
		}
		
	this.pointTagsStyle = config.pointTagsStyle || 'rgba(0,0,0,1)';
	
	this.sideTags = config.sideTags || '';
	if(this.sideTags!=''){
		this.sideTags = this.sideTags.split('|');
	}
	this.sideTagsStyle = config.sideTagsStyle || 'rgba(0,0,0,1)';
	
	this.verticesX = new Array();
	this.verticesY = new Array();
	this.drawQuad();
}

myQuad.prototype.drawQuad = function(){
	
	this.verticesX.push(this.startX);
	this.verticesY.push(this.startY);
	
	this.verticesX.push(this.startX+this.baseLength);
	this.verticesY.push(this.startY);
	
	this.verticesX.push(this.startX+this.baseLength+this.height/Math.tan(this.angle2));
	this.verticesY.push(this.startY-this.height);

	this.verticesX.push(this.startX+this.height/Math.tan(this.angle1));
	this.verticesY.push(this.startY-this.height);
	
	// point tags :		
	$(this.canvas).drawText({								//point 1 tag
		fillStyle:this.pointTagsStyle,
		fontSize:15,
		x:this.verticesX[0]-10,y:this.verticesY[0]+10,
		text:this.pointTags[0],
		layer:true,
		name:objectName+'pointTag1'
	});
	$(this.canvas).drawText({						//point 2 tag
		fillStyle:this.pointTagsStyle,
		fontSize:15,
		x:this.verticesX[1]+10,y:this.verticesY[1]+10,
		text:this.pointTags[1],
		layer:true,
		name:objectName+'pointTag1'
	});
	$(this.canvas).drawText({								//point 3 tag
		fillStyle:this.pointTagsStyle,
		fontSize:15,
		x:this.verticesX[2]+10,y:this.verticesY[2]-10,
		text:this.pointTags[2],
		layer:true,
		name:objectName+'pointTag1'
	});
	$(this.canvas).drawText({							//point 4 tag
		fillStyle:this.pointTagsStyle,
		fontSize:15,
		x:this.verticesX[3]-10,y:this.verticesY[3]-10,
		text:this.pointTags[3],
		layer:true,
		name:objectName+'pointTag1'
	});

	//side tags : 
	$(this.canvas).drawText({													//base side tag
		fillStyle:this.sideTagsStyle,
		fontSize:15,
		x:this.verticesX[0]+this.baseLength/2,y:this.verticesY[0]+10,
		text:this.sideTags[0],
		layer:true,
		name:objectName+'sideTag1'
	});
	
	var temp1 = (this.verticesX[1]>this.verticesX[2])?this.verticesX[1]:this.verticesX[2];			//right side tag
	$(this.canvas).drawText({
		fillStyle:this.sideTagsStyle,
		fontSize:15,
		x:temp1+10,y:this.verticesY[2]+(this.verticesY[1]-this.verticesY[2])/2,
		text:this.sideTags[1],
		layer:true,
		name:objectName+'sideTag2'
	});
	$(this.canvas).drawText({														// top side tag
		fillStyle:this.sideTagsStyle,
		fontSize:15,
		x:this.verticesX[3]+this.baseLength/2,y:this.verticesY[2]-10,
		text:this.sideTags[2],
		layer:true,
		name:objectName+'sideTag3'
	});
	
	var temp2 = (this.verticesX[3]>this.verticesX[0])?this.verticesX[0]:this.verticesX[3];
	$(this.canvas).drawText({															// left side tag
		fillStyle:this.sideTagsStyle,
		fontSize:15,
		x:temp2-10,y:this.verticesY[2]+(this.verticesY[1]-this.verticesY[2])/2,
		text:this.sideTags[3],
		layer:true,
		name:objectName+'sideTag4'
	});
	

	
	//fill quad 
	
	$(this.canvas).drawLine({
		strokeStyle:"rgba(0,0,0,0)",
		fillStyle:this.fillStyle,
		x1:this.verticesX[0],y1:this.verticesY[0],
		x2:this.verticesX[1],y2:this.verticesY[1],
		x3:this.verticesX[2],y3:this.verticesY[2],
		x4:this.verticesX[3],y4:this.verticesY[3],
	});
	

	// sketch quad 
		
	$(this.canvas).drawLine({
		strokeStyle:this.strokeStyle,
		strokeWidth:this.strokeWidth,
		x1:this.startX,y1:this.startY,
		x2:this.startX+this.baseLength,y2:this.startY,
		layer:true,
		name:objectName+'side1'
	});
	
	$(this.canvas).drawLine({
		strokeStyle:this.strokeStyle,
		strokeWidth:this.strokeWidth,
		x1:this.startX,y1:this.startY,
		x2:this.startX+this.height/Math.tan(this.angle1),y2:this.startY-this.height,
		layer:true,
		name:objectName+'side2'
	});
	
	$(this.canvas).drawLine({
		strokeStyle:this.strokeStyle,
		strokeWidth:this.strokeWidth,
		x1:this.startX+this.baseLength,y1:this.startY,
		x2:this.startX+this.baseLength+this.height/Math.tan(this.angle2),y2:this.startY-this.height,
		layer:true,
		name:objectName+'side4'
	});
	
	
	$(this.canvas).drawLine({
		strokeStyle:this.strokeStyle,
		strokeWidth:this.strokeWidth,
		x1:this.startX+this.height/Math.tan(this.angle1),y1:this.startY-this.height,
		x2:this.startX+this.baseLength+this.height/Math.tan(this.angle2),y2:this.startY-this.height,
		layer:true,
		name:objectName+'side3'
	});
}


