function RevCounter(args) {
  var defaultHeight = 130
  var defaultWidth = 250

  this.paper = Raphael(args.element);

  this.scaleValueX = this.paper.width / defaultWidth
  this.scaleValueY = this.paper.height / defaultHeight

  this.circle = paper.path("M 20 120 a100 100 0 1 1 200 0 l-20 0 a-80 -80 0 1 0 -160 0 l-20 0");
  this.arrow = paper.path("M126 114L30 120 126 126z");
  this.line45 = paper.path("M49 49L53 53");
  this.line90 = paper.path("M120 26L120 20");
  this.line135 = paper.path("M187 53L191 49");

  this.text0 = paper.text(10, 115, "0%");
  this.text25 = paper.text(40, 45, "25%");
  this.text50 = paper.text(125, 15, "50%");
  this.text75 = paper.text(200, 45, "75%");
  this.text100 = paper.text(235, 115, "100%");

  this.circle.attr({"fill": "0-#f00:5-#00ff00:95",
    "fill-opacity": 0.5,
    "stroke-width":0.5  });
  this.arrow.attr({"fill": "#E6E7E8",
    "stroke-width":0.5});

  this.arrow.mouseover(function() {
    console.log("over")
  });

  //animate rotation
  this.animationRotate = function(angle) {
    this.arrow.animate({transform: this.scaleString() + " r " + angle + " 120 120"}, 2000, "bounce");
  };

  //rotate arrow to angle
  this.rotate = function(angle) {
    this.arrow.rotate(angle, 120, 120);
  };

  //returns rotate angle from percent
  this.angle = function(percent) {
    if (percent > 100) {
      return 180;
    }
    else if (percent < 0) {
      return 0;
    }
    else {
      return 180 * percent / 100;
    }
  };

  //sets percent
  this.setPercent = function(percent) {
    if (this.percent) {
      this.rotate(-this.angle(this.percent));
    }
    this.percent = percent
    this.animationRotate(this.angle(this.percent));
  };

  //returns string for scale
  this.scaleString = function() {
    return  "s" + this.scaleValueX + "," + this.scaleValueY + ",0,0";
  };

  //scale current chart
  this.scale = function(valueX, valueY) {
    this.scaleValueX = valueX;
    this.scaleValueY = valueY;
    this.circle.transform(this.scaleString());
    this.arrow.transform(this.scaleString());
    this.line45.transform(this.scaleString());
    this.line90.transform(this.scaleString());
    this.line135.transform(this.scaleString());
    this.text0.transform(this.scaleString());
    this.text25.transform(this.scaleString());
    this.text50.transform(this.scaleString());
    this.text75.transform(this.scaleString());
    this.text100.transform(this.scaleString());
  };

  //scale chart to current size
  this.scale(args.scale);

  //set percent
  if (args.percent) {
    this.setPercent(args.percent);
  }

  return this;
}