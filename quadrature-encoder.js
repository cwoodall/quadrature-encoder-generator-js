// Creates canvas 320 × 200 at 10, 50
var paper = Raphael("encCanvas", 750, 750);

var xc = 750/2
var yc = 750/2

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

drawWedge = function(paper, x, y, r, a1, a2, fil) {
paper.path(("M{2} {3}A{6},{6} 0 0,0 {4},{5}L{0} {1}").format(x,y, x+r*Math.sin(a1), y+r*Math.cos(a1), x+r*Math.sin(a2), y+r*Math.cos(a2),r)).attr({fill: "black", stroke: "red", "stroke-width": "0px"})
}
drawEncoder = function(N, Phase, Align) {
  paper.circle(xc,yc,1).attr({fill:"red", "stroke":"white","stroke-width":10});
  //var N = Math.pow(2,8)
  for (var i = 0; i < N/2; i += 1) {
    drawWedge(paper, xc,yc,xc, 2*2*i*Math.PI/N, 2*(2*i+1)*Math.PI/N, "black");
  }

  paper.circle(xc,yc, 300).attr({fill:"white","stroke":"white","stroke-width":10})

  for (var i = 0; i < N/2; i += 1) {
    drawWedge(paper, xc,yc,300, (2*2*i*(Math.PI)/N) + 2*Phase/N, (2*(2*i+1)*(Math.PI))/N + 2*Phase/N, "black");
  }
  paper.circle(xc,yc, 200).attr({fill:"white", "stroke":"white","stroke-width":10})
  if (Align === true) {
    drawWedge(paper,xc,yc,200,0,2*Math.PI/N, "black")
  }
  paper.circle(xc,yc, 100).attr({fill:"white", "stroke":"white", "stroke-width":10})

  paper.path(("M{0} {1}L{2} {3}").format(xc+20, yc, xc-20, yc))
  paper.path(("M{0} {1}L{2} {3}").format(xc, yc+20, xc, yc-20))
  paper.circle(xc,yc,10)

  paper.circle(xc,yc, 25)
}

drawEncoder2 = function(rings) {
  var ring = rings[0]
  for (var i = 0; i < rings.length; i += 1) {
    for (var j = i; j < rings.length; j += 1) {
      if (rings[j].R > rings[i].R) {
        ring = rings[i]; rings[i] = rings[j]; rings[j]=ring;
      }
    }
  }
  for (var i = 0; i < rings.length; i += 1) {
    ring = rings[i];
    for (var j = 0; j < ring.N/2; j += 1) {
      drawWedge(paper, xc,yc,ring.R, (2*2*j*(Math.PI)/ring.N) + 2*ring.Phase/ring.N, (2*(2*j+1)*(Math.PI))/ring.N + 2*ring.Phase/ring.N, "black");
    }
    paper.circle(xc,yc,ring.R-ring.width).attr({fill:"white", "stroke":"white", "stroke-width": 10})
  }
}

var N = 10;
var Phase = Math.PI/2;
var Align = true;

var ringsI = 0
var rings = [{N:N, Phase:Phase, R:300, width:50}]

$("#ringsList").html(("<div id='ring{0}'><p><strong>Ring {0}</strong> Number of ticks (Must be even): <input class='num' type='text' value='{1}' /><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Phase Offset: <input class='phase' type='text' value='{2}'/> degrees (<span class='addRing'>+</span> | <span class='removeRing'>-</span>)</p>").format(ringsI, rings[ringsI].N, 180*rings[ringsI].Phase/Math.PI))
//drawEncoder(N, Phase, Align);
drawEncoder2(rings)

$("#addRing").click(function() {
  console.log("arr")
  ringsI += 1;
  rings[ringsI] = {N:N, Phase:Phase, R:rings[ringsI-1].R-50, width:50};
  $("#ringsList").append(("<div id='ring{0}'><p><strong>Ring {0}</strong> Number of ticks (Must be even): <input class='num' type='text' value='{1}' /><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Phase Offset: <input class='phase' type='text' value='{2}'/> degrees (<span class='addRing'>+</span> | <span class='removeRing'>-</span>)</p>").format(ringsI, rings[ringsI].N, 180*rings[ringsI].Phase/Math.PI));

    paper.clear()
  drawEncoder2(rings)

  $(".phase").change(function() {
    console.log("b");
    var ringID = $(this).parent().parent().attr("id");
    var ringNum = (/ring([0-9]+)/).exec(ringID)[1];
    rings[ringNum].Phase = this.value
    paper.clear()
    drawEncoder2(rings)
  });
  $(".num").change(function() {
    console.log("b");
    var ringID = $(this).parent().parent().attr("id");
    var ringNum = (/ring([0-9]+)/).exec(ringID)[1];
    rings[ringNum].N = this.value
    paper.clear()
    drawEncoder2(rings)
  });

});
  $(".phase").change(function() {
    console.log("b");
    var ringID = $(this).parent().parent().attr("id");
    var ringNum = (/ring([0-9]+)/).exec(ringID)[1];
    rings[ringNum].Phase = this.value*Math.PI/180
    paper.clear()
    drawEncoder2(rings)
  });

  $(".num").change(function() {
    console.log("b");
    var ringID = $(this).parent().parent().attr("id");
    var ringNum = (/ring([0-9]+)/).exec(ringID)[1];
    rings[ringNum].N = this.value
    paper.clear()
    drawEncoder2(rings)
  });


$("#removeRing").click(function() {
  if (ringsI > 0) {                        
    ringsI -= 1;
    rings.pop()
    $(("#ring{0}").format(ringsI+1)).remove()
    paper.clear()
    drawEncoder2(rings)
  }
});



/*$("#err").hide()

$('#val').change(function() {
  if ((this.value%2 !== 0) || (this.value<0)) {
    this.value = N
    $("#err").show()
  } else {
    N = Math.round(this.value);
    $("#err").hide()
    $("#num").val(N);
    paper.clear();
    drawEncoder(N, Phase, Align);
  }
});

$('#num').change(function() {
  $("#err").hide()
  N = this.value;
  $('#val').val(N);
  paper.clear();
  drawEncoder(N, Phase, Align);
});


$('#phase').change(function() {
  Phase = Math.PI*Math.abs(this.value)/180
  $('#Pval').val(this.value)
  paper.clear()
  drawEncoder(N, Phase, Align)
});

$('#Pval').change(function() {
  Phase = Math.PI*Math.abs(this.value)/180
  $('#phase').val(this.value)
  paper.clear()
  drawEncoder(N, Phase, Align)
});

$('#alignmentMarker').change(function() {
  Align = this.checked
  paper.clear()
  drawEncoder(N, Phase, Align)
});
*/