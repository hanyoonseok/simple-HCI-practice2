let WebUI = {}

WebUI.WidgetTypes = {
    UNDEFINED:      "undefined",
    TEXT:           "text",
    IMAGE:          "image",
    PUSH_BUTTON:    "push_button",
    TEXT_FIELD:     "text_field",
    SWITCH:         "switch",
    CONTAINER:      "container",
    ROW:            "row",
    COLUMN:         "column",
    PARSER:         "parser"
    // add new widget types here
};

WebUI.Alignment = {
  CENTER:         "center",
  LEFT:           "left",
  RIGHT:          "right",
  TOP:            "top",
  BOTTOM:         "bottom"
    // add alignment types here
};

WebUI.widgets = [];
WebUI.focused_widget = null;
WebUI.dragged_widget = null;
WebUI.hovered_widget = null;

WebUI.is_mouse_dragging = false;
WebUI.mouse_drag_start = {x:0, y:0};
WebUI.mouse_drag_prev = {x:0, y:0};

WebUI.app = null;

WebUI.initialize = function() {
    this.canvas = new fabric.Canvas("c", {
        backgroundColor: "#eee",
        hoverCursor: "default",
        selection: false,
        width: window.innerWidth,
        height: window.innerHeight,
    });

    //
    $(document).keypress(function(event) {
        WebUI.handleKeyPress(event);
    });
    $(document).mousedown(function(event) {
        let p = {x: event.pageX, y: event.pageY};
        WebUI.handleMouseDown(p);
    });
    $(document).mouseup(function(event) {
        let p = {x: event.pageX, y: event.pageY};
        WebUI.handleMouseUp(p);
    });
    $(document).mousemove(function(event) {
        let p = {x: event.pageX, y: event.pageY};
        WebUI.handleMouseMove(p);
    });
    //
    WebUI.initWidgets();
    WebUI.initVisualItems();
    WebUI.layoutWhenResourceReady();
}

WebUI.initWidgets = function() {
  WebUI.app = new WebUI.Container({
    desired_size:{width:800, height:1000},
    children:[
      WebUI.app = new WebUI.Row({
          children:[
            new WebUI.Container({
              desired_size:{width:600, height:50},
              horizontal_alignment:WebUI.Alignment.CENTER,
              children:[
                new WebUI.Text("WebUI-V3 Calculator",{text_color:'black',font_size:25,stroke_width:3,stroke_color:'lightgray'})
              ],
            }),
            new WebUI.Column({
              children:[
                new WebUI.TextField("",{width:480, height:210}, {fill_color:'black', stroke_color:'red', text_color:'white'}),
                new WebUI.PushButton1("clear", {width:80, height:210},{font_size:30, stroke_color:'lightgray',stroke_width:3, fill_color:'gray', text_color:'white'}),
              ],
            }),
            new WebUI.Column({
              children:[
                new WebUI.TextField("0",{width:380, height:60}, {fill_color:'black', stroke_color:'red', text_color:'white',font_size:25}),
                new WebUI.Row({
                  children:[
                    new WebUI.TextField("",{width:180, height:35}, {fill_color:'lightgray', stroke_color:'lightgray'}),
                    new WebUI.TextField("",{width:180, height:35}, {fill_color:'lightgray', stroke_color:'lightgray'}),
                  ],
                }),
              ]
            }),
            new WebUI.Column({
              children:[
                new WebUI.MyPushButton("(", {width:20, height:30},{text_color:'white', fill_color:'black', stroke_width:3, stroke_color:'lightgray'}),
                new WebUI.MyPushButton(")", {width:20, height:30},{text_color:'white', fill_color:'black', stroke_width:3, stroke_color:'lightgray'}),
                new WebUI.MyPushButton("[", {width:20, height:30},{text_color:'white', fill_color:'black', stroke_width:3, stroke_color:'lightgray'}),
                new WebUI.MyPushButton("]", {width:20, height:30},{text_color:'white', fill_color:'black', stroke_width:3, stroke_color:'lightgray'}),
                new WebUI.MyPushButton("==", {width:50, height:30},{text_color:'white', fill_color:'black', stroke_width:3, stroke_color:'lightgray'}),
                new WebUI.MyPushButton("!=", {width:50, height:30},{text_color:'white', fill_color:'black', stroke_width:3, stroke_color:'lightgray'}),
                new WebUI.MyPushButton("f", {width:110, height:30},{text_color:'white', fill_color:'gray',stroke_color:'lightgray', stroke_width:3,font_size:20}),
                new WebUI.MyPushButton("EV", {width:100, height:30},{text_color:'white', fill_color:'red', stroke_color:'lightgray', stroke_width:3, font_size:20}),
                new WebUI.MyPushButton("CL", {width:100, height:30},{fill_color:'orange',stroke_color:'lightgray',text_color:'white', stroke_width:3,font_size:20}),
              ],
            }),
            new WebUI.Column({
              children:[
                  new WebUI.MyPushButton("<", {width:20, height:30},{text_color:'white', fill_color:'black',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton(">", {width:20, height:30},{text_color:'white', fill_color:'black',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton(":", {width:20, height:30},{text_color:'white', fill_color:'black',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton(";", {width:20, height:30},{text_color:'white', fill_color:'black',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton(">=", {width:50, height:30},{text_color:'white', fill_color:'black',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("<=", {width:50, height:30},{text_color:'white', fill_color:'black',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("g", {width:110, height:30},{text_color:'white', fill_color:'gray',stroke_color:'lightgray',stroke_width:3,font_size:20}),
                  new WebUI.MyPushButton("7", {width:45, height:30},{text_color:'white', fill_color:'gray',stroke_color:'lightgray', stroke_width:3,font_size:20}),
                  new WebUI.MyPushButton("8", {width:45, height:30},{text_color:'white', fill_color:'gray',stroke_color:'lightgray', stroke_width:3,font_size:20}),
                  new WebUI.MyPushButton("9", {width:45, height:30},{text_color:'white', fill_color:'gray',stroke_color:'lightgray', stroke_width:3,font_size:20}),
                  new WebUI.MyPushButton("%", {width:45, height:30},{fill_color:'orange',stroke_color:'lightgray',stroke_width:3, text_color:'white'}),
              ],
            }),
            new WebUI.Column({
              children:[
                  new WebUI.MyPushButton("i", {width:50, height:30},{text_color:'white', fill_color:'black',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("e", {width:50, height:30},{text_color:'white', fill_color:'black',font_family:'monospace',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("pi", {width:50, height:30},{text_color:'white', fill_color:'black',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("w", {width:50, height:30},{text_color:'white', fill_color:'black',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("/", {width:50, height:30},{text_color:'white', fill_color:'black',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("=", {width:50, height:30},{text_color:'white', fill_color:'black',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("4", {width:45, height:30},{text_color:'white', fill_color:'gray',stroke_color:'lightgray', stroke_width:3,font_size:20}),
                  new WebUI.MyPushButton("5", {width:45, height:30},{text_color:'white', fill_color:'gray',stroke_color:'lightgray', stroke_width:3,font_size:20}),
                  new WebUI.MyPushButton("6", {width:45, height:30},{text_color:'white', fill_color:'gray',stroke_color:'lightgray', stroke_width:3,font_size:20}),
                  new WebUI.MyPushButton("*", {width:45, height:30},{fill_color:'orange',stroke_color:'lightgray',stroke_width:3,text_color:'white'}),
              ],
            }),
            new WebUI.Column({
              children:[
                  new WebUI.MyPushButton("exp", {width:50, height:30},{text_color:'white', fill_color:'black',font_family:'monospace',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("log", {width:50, height:30},{text_color:'white', fill_color:'black',font_family:'monospace',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("sqrt", {width:50, height:30},{text_color:'white', fill_color:'black',font_family:'monospace',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("sin", {width:50, height:30},{text_color:'white', fill_color:'black',font_family:'monospace',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("cos", {width:50, height:30},{text_color:'white', fill_color:'black',font_family:'monospace',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("tan", {width:50, height:30},{text_color:'white', fill_color:'black',font_family:'monospace',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("1", {width:45, height:30},{text_color:'white', fill_color:'gray',stroke_color:'lightgray', stroke_width:3,font_size:20}),
                  new WebUI.MyPushButton("2", {width:45, height:30},{text_color:'white', fill_color:'gray',stroke_color:'lightgray', stroke_width:3,font_size:20}),
                  new WebUI.MyPushButton("3", {width:45, height:30},{text_color:'white', fill_color:'gray',stroke_color:'lightgray', stroke_width:3,font_size:20}),
                  new WebUI.MyPushButton("-", {width:45, height:30},{fill_color:'orange',stroke_color:'lightgray',stroke_width:3,text_color:'white'}),
              ],
            }),
            new WebUI.Column({
              children:[
                  new WebUI.MyPushButton("cross", {width:50, height:30},{text_color:'white', fill_color:'black',font_family:'monospace',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("det", {width:50, height:30},{text_color:'white', fill_color:'black',font_family:'monospace',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("x", {width:50, height:30},{text_color:'white', fill_color:'black',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("y", {width:50, height:30},{text_color:'white', fill_color:'black',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("z", {width:50, height:30},{text_color:'white', fill_color:'black',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("**", {width:50, height:30},{text_color:'white', fill_color:'black',font_family:'monospace',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton(".", {width:45, height:30},{text_color:'white', fill_color:'gray',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("0", {width:45, height:30},{text_color:'white', fill_color:'gray',stroke_color:'lightgray', stroke_width:3,font_size:20}),
                  new WebUI.MyPushButton(",", {width:45, height:30},{text_color:'white', fill_color:'gray',stroke_color:'lightgray', stroke_width:3}),
                  new WebUI.MyPushButton("+", {width:45, height:30},{fill_color:'orange',stroke_color:'lightgray',stroke_width:3,text_color:'white'}),
              ],
            }),
          ],
        }),
    ],
  });
};

WebUI.initVisualItems = function() {
    WebUI.widgets.forEach(widget => {
        widget.initVisualItems();
    });
}

WebUI.layoutWhenResourceReady = function() {
    let is_resource_loaded = true;
    for (let i in WebUI.widgets) {
        let widget = WebUI.widgets[i];
        if (!widget.is_resource_ready) {
            is_resource_loaded = false;
            break;
        }
    }

    if (!is_resource_loaded) {
        setTimeout(arguments.callee, 50);
    }
    else {
        WebUI.app.layout();
        WebUI.canvas.requestRenderAll();
    }
}

WebUI.handleKeyPress = function(event) {
    let is_handled = false;

    if (WebUI.focused_widget) {
        is_handled = WebUI.focused_widget.handleKeyPress(event) || is_handled;
    }

    if (is_handled) {
        WebUI.canvas.requestRenderAll();
    }
}

WebUI.handleMouseDown = function(window_p) {
    let is_handled = false;

    if (WebUI.isInCanvas(window_p)) {
        let canvas_p = WebUI.transformToCanvasCoords(window_p);

        WebUI.is_mouse_dragging = true;
        WebUI.mouse_drag_start = canvas_p;
        WebUI.mouse_drag_prev = canvas_p;

        let widget = WebUI.findWidgetOn(canvas_p);

        if (widget) {
            WebUI.focused_widget = widget;

            if (widget.is_draggable) {
                WebUI.dragged_widget = widget;
            }
            else {
                WebUI.dragged_widget = null;
            }

            is_handled = widget.handleMouseDown(canvas_p) || is_handled;
        }
        else {
            WebUI.focused_widget = null;
            WebUI.dragged_widget = null;
        }
    }
    else {
        WebUI.is_mouse_dragging = false;
        WebUI.mouse_drag_start = {x:0, y:0};
        WebUI.mouse_drag_prev = {x:0, y:0};

        WebUI.focused_widget = null;
        WebUI.dragged_widget = null;
    }

    if (is_handled) {
        WebUI.canvas.requestRenderAll();
    }
}

WebUI.handleMouseMove = function(window_p) {
    let canvas_p = WebUI.transformToCanvasCoords(window_p);
    let is_handled = false;

    let widget = WebUI.findWidgetOn(canvas_p);
    if (widget != WebUI.hovered_widget) {
        if (WebUI.hovered_widget != null) {
            is_handled = WebUI.hovered_widget.handleMouseExit(canvas_p) || is_handled;
        }
        if (widget != null) {
            is_handled = widget.handleMouseEnter(canvas_p) || is_handled;
        }
        WebUI.hovered_widget = widget;
    }
    else {
        if (widget) {
            is_handled = widget.handleMouseMove(canvas_p) || is_handled;
        }
    }

    if (WebUI.is_mouse_dragging) {
        if (WebUI.dragged_widget != null) {
            let tx = canvas_p.x - WebUI.mouse_drag_prev.x;
            let ty = canvas_p.y - WebUI.mouse_drag_prev.y;
            WebUI.dragged_widget.translate({x: tx, y: ty});

            is_handled = true;
        }
        WebUI.mouse_drag_prev = canvas_p;
    }

    if (is_handled) {
        WebUI.canvas.requestRenderAll();
    }
}

WebUI.handleMouseUp = function(window_p) {
    let is_handled = false;
    let canvas_p = WebUI.transformToCanvasCoords(window_p);

    let widget  = WebUI.findWidgetOn(canvas_p);
    if (widget) {
        is_handled = widget.handleMouseUp(canvas_p) || is_handled;
    }

    if (WebUI.is_mouse_dragging) {
        WebUI.is_mouse_dragging = false;
        WebUI.mouse_drag_start = {x:0, y:0};
        WebUI.mouse_drag_prev = {x:0, y:0};

        WebUI.dragged_widget = null;

        is_handled = true;
    }

    if (is_handled) {
        WebUI.canvas.requestRenderAll();
    }
}

WebUI.transformToCanvasCoords = function(window_p) {
    let rect = WebUI.canvas.getElement().getBoundingClientRect();
    let canvas_p = {
        x : window_p.x - rect.left,
        y : window_p.y - rect.top
    };
    return canvas_p;
}

WebUI.isInCanvas = function(window_p) {
    let rect = WebUI.canvas.getElement().getBoundingClientRect();
    if (window_p.x >= rect.left &&
        window_p.x < rect.left + rect.width &&
        window_p.y >= rect.top &&
        window_p.y < rect.top + rect.height) {
        return true;
    }
    else {
        return false;
    }
}

WebUI.findWidgetOn = function(canvas_p) {
    let x = canvas_p.x;
    let y = canvas_p.y;

    for (let i=0; i < this.widgets.length; i++) {
        let widget = this.widgets[i];

        if (x >= widget.position.left &&
            x <= widget.position.left + widget.size.width &&
            y >= widget.position.top &&
            y <= widget.position.top + widget.size.height) {
            return widget;
        }
    }
    return null;
}

WebUI.maxSize = function(size1, size2) {
  let max_size = {width:0, height:0};
max_size.width = (size1.width > size2.width)? size1.width: size2.width;
max_size.height = (size1.height > size2.height)? size1.height:size2.height;
return max_size;
    // implement this
}

WebUI.minSize = function(size1, size2) {
  let min_size = {width:0, height:0};
min_size.width = (size1.width < size2.width)?size1.width : size2.width;
min_size.height = (size1.height < size2.height)?size1.height : size2.height;
return min_size;
    // implement this
}


//
WebUI.Widget = function(properties) {
    this.type = WebUI.WidgetTypes.UNDEFINED;

    this.is_draggable = false;
    this.is_movable = true;

    //
    this.parent = null;
    this.children = [];

    //
    this.position = {left: 0, top: 0};
    this.size = {width: 0, height: 0};

    //
    this.visual_items = [];
    this.is_resource_ready = false;

    //
    WebUI.widgets.push(this);

    // implement the code for adding properties below
    if(properties != undefined){
      for(let name in properties){
        let value = properties[name];
        if(name == 'children'){
          value.forEach(child => {
            child.parent = this;
            this.children.push(child);
          });
        }
        else{
          this[name] = value;
        }
      }
    }
    //
    this.setDefaultProperty('desired_size', {width: 0, height: 0});
    this.setDefaultProperty('horizontal_alignment', WebUI.Alignment.CENTER);
    this.setDefaultProperty('vertical_alignment', WebUI.Alignment.TOP);
    this.setDefaultProperty('fill_color', 'white');
    this.setDefaultProperty('stroke_color', 'black');
    this.setDefaultProperty('stroke_width', 1);
    this.setDefaultProperty('text_align', 'left');
    this.setDefaultProperty('vertical_align', 'top');
    this.setDefaultProperty('text_color', 'black');
    this.setDefaultProperty('font_family', 'System');
    this.setDefaultProperty('font_size', 15);
    this.setDefaultProperty('font_weight', 'bold');
    this.setDefaultProperty('padding', 5);
    this.setDefaultProperty('margin', 10);
}

WebUI.Widget.prototype.setDefaultProperty = function(name, value) {
    if (this[name] == undefined) {
        this[name] = value;
    }
}

WebUI.Widget.prototype.getBoundingRect = function() {
    return {
        left:   this.position.left,
        top:    this.position.top,
        width:  this.size.width,
        height: this.size.height
    };
}

WebUI.Widget.prototype.layout = function() {
  this.measure(); // measure size of each widget in bottom-up order
  this.arrange(this.position); // arrange each widget in top-down order
    // implement this
}

WebUI.Widget.prototype.measure = function() {
  if(this.children.length > 0){ //위젯이 말단노드라면(상호작용)
  this.size_children = {width:0, height:0};
  this.children.forEach(child => { // 자식 전체 영역
    let size_child = child.measure(); //
    this.size_children = this.extendSizeChildren(this.size_children, size_child);
  });
  this.size = WebUI.maxSize(this.desired_size, this.size_children);
}
else{ // 위젯이 비 말단 노드라면
  this.size.width += this.padding * 2;
  this.size.height += this.padding * 2;
}
return this.size;
    // implement this
}

WebUI.Widget.prototype.arrange = function(position) { //arrange this
  this.moveTo(position);
this.visual_items.forEach(item => {WebUI.canvas.add(item);});

//arrange children
if(this.children.length > 0){
  let left_spacing = 0, top_spacing = 0;
  if(this.size.width > this.size_children.width){
    let room_width = this.size.width - this.size_children.width;

    if(this.horizontal_alignment == WebUI.Alignment.LEFT)
    left_spacing = this.padding;
    else if(this.horizontal_alignment == WebUI.Alignment.CENTER)
    left_spacing = this.padding + room_width / 2.0;
    else if(this.horizontal_alignment == WebUI.Alignment.RIGHT)
    left_spacing = this.padding + room_width;
  }

  if(this.size.height > this.size_children.height){
    let room_height = this.size.height - this.size_children.height;

    if(this.vertical_alignment == WebUI.Alignment.TOP)
    top_spacing = this.padding;
    else if(this.vertical_alignment == WebUI.Alignment.CENTER)
    top_spacing = this.padding + room_height / 2.0;
    else if(this.vertical_alignment == WebUI.Alignment.BOTTOM)
    top_spacing = this.padding + room_height;
  }
  let next_position = {left:position.left + left_spacing, top:position.top + top_spacing};
  this.children.forEach(child => {
    child.arrange(next_position);
    next_position = this.calcNextPosition(next_position, child.size);
  });
}
    // implement this
}

// default implementation that is expected to be overridden
WebUI.Widget.prototype.extendSizeChildren = function(size, child_size) {
    if (size.width < child_size.width)      size.width = child_size.width;
    if (size.height < child_size.height)    size.height = child_size.height;

    return size;
}

// default implementation that is expected to be overridden
WebUI.Widget.prototype.calcNextPosition = function(position, size) {
    let next_left = position.left + size.width;
    let next_top = position.top;

    return {left: next_left, top: next_top};
}

WebUI.Widget.prototype.initVisualItems = function() {
    this.is_resource_ready = true;
    return true;
}

WebUI.Widget.prototype.moveTo = function(p) {
    if(!this.is_movable)
    {
        return;
    }
    let tx = p.left - this.position.left;
    let ty = p.top - this.position.top;

    this.translate({x: tx, y: ty});
}

WebUI.Widget.prototype.translate = function(v) {
    if(!this.is_movable)
    {
        return;
    }

    this.position.left += v.x;
    this.position.top += v.y;

    this.visual_items.forEach(item => {
        item.left += v.x;
        item.top += v.y;
    });

    this.children.forEach(child_widget => {
        child_widget.translate(v);
    });
}

WebUI.Widget.prototype.destroy = function() {
    if (this == WebUI.focused_widget) WebUI.focused_widget = null;
    if (this == WebUI.dragged_widget) WebUI.dragged_widget = null;
    if (this == WebUI.hovered_widget) WebUI.hovered_widget = null;

    this.visual_items.forEach(item => {
        WebUI.canvas.remove(item);
    });
    this.visual_items = [];

    let index = WebUI.widgets.indexOf(this);
    if(index > -1)
    {
        WebUI.widgets.splice(index, 1);
    }

    this.children.forEach(child_widget => {
        child_widget.destroy();
    });
    this.children = [];

    // assume that the parent is already null
    // (that is, this widget has been detached from its original parent before being destructed)
}

WebUI.Widget.prototype.handleKeyPress = function(event) {
    return false;
}

WebUI.Widget.prototype.handleMouseDown = function(canvas_p) {
    return false;
}

WebUI.Widget.prototype.handleMouseMove = function(canvas_p) {
    return false;
}

WebUI.Widget.prototype.handleMouseUp = function(canvas_p) {
    return false;
}

WebUI.Widget.prototype.handleMouseEnter = function(canvas_p) {
    return false;
}

WebUI.Widget.prototype.handleMouseExit = function(canvas_p) {
    return false;
}

WebUI.Widget.prototype.handleResize = function() {
    return false;
}


function MyPushButton(str)
{

}

WebUI.w = 0; WebUI.x = 0; WebUI.y = 0; WebUI.z = 0;
WebUI.f = ""; WebUI.inf = "";
WebUI.g = ""; WebUI.ing = "";

function f()
{
    // WebUI.f = arguments[0];
    tempList = [];
    tempList = WebUI.inf.split(',');

    for(i=0;i<tempList.length;i++)
    {
        outStr = tempList[i] + "=" + arguments[0];
        eval(outStr);
    }

    return eval(WebUI.f);
};
function g()
{
    tempList = [];
    tempList = WebUI.ing.split(',');

    for(i=0;i<tempList.length;i++)
    {
        outStr = tempList[i] + "=" + arguments[0];
        eval(outStr);
    }

    return eval(WebUI.g);
};

function NumberOrString(str)
{
    isNumber = 0;
    isString = "";

    result=0;

    switch(str)
    {
        case "0": case "1": case "2": case "3": case "4":
        case "5": case "6": case "7": case "8": case "9":
        {
            isNumber = parseInt(str);
            result = isNumber;
        }break;
        default:
        {
            isString = str;
            result = isString;
        }break;
    }
    return result;
}

function exp(val){
    return Math.exp(val);
}
function sqrt(val){
    return Math.sqrt(val);
}
function sin(val){
    return Math.sin(val);
}
function cos(val){
    return Math.cos(val);
}
function tan(val){
    return Math.tan(val);
}
function sqrt(val){
    return Math.sqrt(val);
}
function cross()
{
    if (arguments.length < 2) return;
    vResult = 0;
    vX = 0;
    vY = 1;
    vResult = [(arguments[vX][1]*arguments[vY][2]) - (arguments[vX][2]*arguments[vY][1]),
               (arguments[vX][2]*arguments[vY][0]) - (arguments[vX][0]*arguments[vY][2]),
               (arguments[vX][0]*arguments[vY][1]) - (arguments[vX][1]*arguments[vY][0])];
    if(arguments.length > 2)
    {
        for(i=2;i<arguments.length;i++)
        {
            vResult = [(vResult[1]*arguments[i][2]) - (vResult[2]*arguments[i][1]),
                       (vResult[2]*arguments[i][0]) - (vResult[0]*arguments[i][2]),
                       (vResult[0]*arguments[i][1]) - (vResult[1]*arguments[i][0])];
        }
    }
    return vResult;
}
function det(){
    vResult = 0;
    for(i=0;i<arguments[0].length;i++)
    {
        vResult += arguments[0][i] * arguments[1][i];
    }

    if(arguments.length > 2)
    {
        for(i=0;i<arguments.length-1;i++)
        {
            for(j=0;j<arguments[i].length;j++)
            {
                vResult += arguments[i][j] * arguments[i+1][j];
            }
        }
    }

    return vResult;
}
function log(val){
    return Math.log(val);
}

//
WebUI.Container = function(properties) {
    WebUI.Widget.call(this, properties);
    this.type = WebUI.WidgetTypes.CONTAINER;
}

WebUI.Container.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Container.prototype.constructor = WebUI.Container;

WebUI.Container.prototype.extendSizeChildren = function(size, child_size) {
  if(size.width < child_size.width) size.width = child_size.width;
  if(size.height < child_size.height) size.height = child_size.height;
  return size;
    // implement this
}

WebUI.Container.prototype.calcNextPosition = function(position, size) {
  let next_left = position.left;
  let next_top = position.top;
  return {left: next_left, top:next_top};
    // implement this
}

//
WebUI.Column = function(properties) {
    WebUI.Widget.call(this, properties);
    this.type = WebUI.WidgetTypes.COLUMN;
}

WebUI.Column.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Column.prototype.constructor = WebUI.Column;

WebUI.Column.prototype.extendSizeChildren = function(size, child_size) {
  size.width += child_size.width;
  if(size.height < child_size.height){size.height = child_size.height};
  return size;
    // implement this
}

WebUI.Column.prototype.calcNextPosition = function(position, size) {
  let next_left = position.left + size.width;
  let next_top = position.top;
  return {left: next_left, top:next_top};
    // implement this
}


//
WebUI.Row = function(properties) {
    WebUI.Widget.call(this, properties);
    this.type = WebUI.WidgetTypes.ROW;
}

WebUI.Row.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Row.prototype.constructor = WebUI.Row;

WebUI.Row.prototype.extendSizeChildren = function(size, child_size) {
  if(size.width<child_size.width) size.width = child_size.width;
  size.height += child_size.height;
  return size;
    // implement this
}

WebUI.Row.prototype.calcNextPosition = function(position, size) {
  let next_left = position.left;
  let next_top = position.top + size.height;
  return {left: next_left, top:next_top};
    // implement this
}
//
WebUI.Text = function(label, properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.TEXT;
    this.label = label;
}

WebUI.Text.prototype = Object.create(WebUI.Widget.prototype);
WebUI.Text.prototype.constructor = WebUI.Text;

WebUI.Text.prototype.initVisualItems = function() {
    let text = new fabric.Text(this.label, {
        left:       this.position.left,
        top:        this.position.top,
        selectable: false,
        fontFamily: this.font_family,
        fontSize:   this.font_size,
        fontWeight: this.font_weight,
        textAlign:  this.text_align,
        stroke:     this.text_color,
        fill:       this.text_color,
    });
    //
    let bound = text.getBoundingRect();
    this.position.left = bound.left;
    this.position.top = bound.top;
    this.size.width = bound.width;
    this.size.height = bound.height;
    //
    this.visual_items.push(text);
    this.is_resource_ready = true;
}

WebUI.Text.prototype.setLabel = function(new_label) {
    let text = this.visual_items[0];
    text.set('text', new_label);

    this.label = new_label;

    WebUI.canvas.requestRenderAll();
}
//
WebUI.TextField = function(label, desired_size, properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.TEXT_FIELD;
    this.label = label;
    this.desired_size = desired_size;
    this.stroke_width = 1;
}

WebUI.TextField.prototype = Object.create(WebUI.Widget.prototype);
WebUI.TextField.prototype.constructor = WebUI.TextField;

WebUI.TextField.prototype.initVisualItems = function() {
    let boundary = new fabric.Rect({
        left: this.position.left,
        top: this.position.top,
        width: this.desired_size.width,
        height: this.desired_size.height,
        fill: this.fill_color,
        stroke: this.stroke_color,
        strokeWidth: this.stroke_width,
        selectable: false
    });

    let textbox = new fabric.Textbox(this.label, {
            left:       this.position.left + this.margin,
            selectable: false,
            fontFamily: this.font_family,
            fontSize:   this.font_size,
            fontWeight: this.font_weight,
            textAlign:  this.text_align,
            stroke:     this.text_color,
            fill:       this.text_color,
        }
    );

    let bound = textbox.getBoundingRect();
    textbox.top = this.position.top + this.desired_size.height/2 - bound.height/2;
    this.size = this.desired_size;

    //
    this.visual_items.push(boundary);
    this.visual_items.push(textbox);
    this.is_resource_ready = true;
}

WebUI.TextField.prototype.handleMouseDown = function(canvas_p) {
    let textbox = this.visual_items[1];
    textbox.enterEditing();

    return true;
}

WebUI.TextField.prototype.handleKeyPress = function(event) {

    let boundary = this.visual_items[0];
    let textbox = this.visual_items[1];

    let new_label = textbox.text;
    let old_label = this.label;
    this.label = new_label;

    if (event.keyCode == 13) {
        let text_enter_removed = new_label.replace(/(\r\n|\n|\r)/gm, "");
        textbox.text = text_enter_removed;
        this.label = text_enter_removed;

        if (textbox.hiddenTextarea != null) {
            textbox.hiddenTextarea.value = text_enter_removed;
        }
        textbox.exitEditing();

        return true;
    }

    if (old_label != new_label && old_label.length < new_label.length) {
        let canvas = document.getElementById("c");
        let context = canvas.getContext("2d");
        context.font = this.font_size.toString() + "px " + this.font_family;

        let boundary_right = boundary.left + boundary.width - this.margin;
        let text_bound = textbox.getBoundingRect();
        let text_width = context.measureText(new_label).width;
        let text_right = text_bound.left + text_width;

        if (boundary_right < text_right) {
            textbox.text = old_label;
            this.label = old_label;

            if (textbox.hiddenTextarea != null) {
                textbox.hiddenTextarea.value = old_label;
            }
            return true;
        }
    }
    return false;
}

//
WebUI.PushButton = function(label, desired_size, properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.PUSH_BUTTON;
    this.label = label;
    this.desired_size = desired_size;

    this.is_pushed = false;
}

WebUI.PushButton.prototype = Object.create(WebUI.Widget.prototype);
WebUI.PushButton.prototype.constructor = WebUI.PushButton;

WebUI.PushButton.prototype.initVisualItems = function() {
    let background = new fabric.Rect({
        left: this.position.left,
        top: this.position.top,
        width: this.desired_size.width,
        height: this.desired_size.height,
        fill: this.fill_color,
        stroke: this.stroke_color,
        strokeWidth: this.stroke_width,
        selectable: false
    });

    let text = new fabric.Text(this.label, {
        left: this.position.left,
        top: this.position.top,
        selectable: false,
        fontFamily: this.font_family,
        fontSize:   this.font_size,
        fontWeight: this.font_weight,
        textAlign:  this.text_align,
        stroke:     this.text_color,
        fill:       this.text_color,
    });

    let bound = text.getBoundingRect();
    text.left = this.position.left + this.desired_size.width/2 - bound.width/2;
    text.top = this.position.top + this.desired_size.height/2 - bound.height/2;

    this.size = this.desired_size;
    //
    this.visual_items.push(background);
    this.visual_items.push(text);
    this.is_resource_ready = true;
}

WebUI.PushButton.prototype.handleMouseDown = function() {
    if (!this.is_pushed) {
        this.translate({x:0, y:5});
        this.is_pushed = true;

        str = this.visual_items[1].text;
        WebUI.MyPushButton.prototype.handleButtonPushed(str);
        if (this.onPushed != undefined) {
            this.onPushed.call(this);
        }
        return true;
    }
    else {
        return false;
    }
}

WebUI.PushButton.prototype.handleMouseUp = function() {
    if (this.is_pushed) {
        this.translate({x:0, y:-5});
        this.is_pushed = false;
        return true;
    }
    else {
        return true;
    }
}

// WebUI.PushButton.prototype.handleMouseEnter = function() {
//     this.visual_items[0].set('strokeWidth', 3);
//     return true;
// }
//
// WebUI.PushButton.prototype.handleMouseExit = function() {
//     this.visual_items[0].set('strokeWidth', 1);
//
//     if (this.is_pushed) {
//         this.translate({x:0, y:-5});
//         this.is_pushed = false;
//     }
//     return true;
// }

WebUI.MyPushButton = function(label, desired_size, properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.PUSH_BUTTON;
    this.label = label;
    this.desired_size = desired_size;
    this.onPushed = WebUI.MyPushButton.handleButtonPushed;
    this.is_pushed = false;
}
var arr = new Array();
arr[0]="";arr[1]="";arr[2]="";arr[3]="";arr[4]="";arr[5]="";
var idx =0;
WebUI.MyPushButton.prototype = Object.create(WebUI.PushButton.prototype);
WebUI.MyPushButton.prototype.constructor = WebUI.PushButton;
WebUI.MyPushButton.prototype.handleButtonPushed = function(str) {
  tempStr = NumberOrString(str);
  WebUI.parser = math.parser();
  if(Number.isInteger(tempStr))
  {
      if(WebUI.widgets[5].visual_items[1].text == "0")
      {
          WebUI.widgets[5].visual_items[1].text = str;
      }
      else
      {
          WebUI.widgets[5].visual_items[1].text += str;
      }
  }
  else
  {
      if(WebUI.widgets[5].visual_items[1].text == "function")
      {
          WebUI.widgets[5].visual_items[1].text = str;
      }
      else if(tempStr == "CL")
      {
           WebUI.widgets[5].visual_items[1].text = "0";
      }
      else if(WebUI.widgets[5].visual_items[1].text == "0")
      {
          WebUI.widgets[5].visual_items[1].text = str;
      }
      else if(str == "EV")
      {
          try
          {
              i = sqrt(-1)^2; w = -1 + (3*i);
              e = Math.E; pi = Math.PI;
              x = WebUI.x; y = WebUI.y; z = WebUI.z;

              checkFunc = WebUI.widgets[5].visual_items[1].text;
              cFunc = checkFunc.indexOf('=');
              iFunc = cFunc - 3;

              if(checkFunc[0] == "f" && checkFunc[cFunc] =="=")
              {
                  WebUI.f = checkFunc.substr(cFunc+1,checkFunc.length-1);
                  WebUI.inf = checkFunc.substr(2,iFunc);
                  WebUI.widgets[6].visual_items[1].text = WebUI.widgets[5].visual_items[1].text;
                  WebUI.widgets[5].visual_items[1].text = "function";
              }
              else if(checkFunc[0] == "g" && checkFunc[cFunc] =="=")
              {
                  WebUI.g = checkFunc.substr(cFunc+1,checkFunc.length-1);
                  WebUI.ing = checkFunc.substr(2,iFunc);
                  WebUI.widgets[7].visual_items[1].text = WebUI.widgets[5].visual_items[1].text;
                  WebUI.widgets[5].visual_items[1].text = "function";
              }
              else
              {
                  result = eval(WebUI.widgets[5].visual_items[1].text);
                  if(idx<6)
                  {
                    arr[idx]=WebUI.widgets[5].visual_items[1].text + "=" + result.toString() + "\n"
                    WebUI.widgets[2].visual_items[1].text += WebUI.widgets[5].visual_items[1].text + "=" + result.toString() + "\n"
                    idx++;
                  }
                  else{
                    arr[0]=arr[1];
                    arr[1]=arr[2];
                    arr[2]=arr[3];
                    arr[3]=arr[4];
                    arr[4]=arr[5];
                    arr[5]=WebUI.widgets[5].visual_items[1].text + "=" + result.toString() + "\n";
                    WebUI.widgets[2].visual_items[1].text ="";
                    WebUI.widgets[2].visual_items[1].text = arr[0] + arr[1] + arr[2]+arr[3]+arr[4]+arr[5];
                  }
                  WebUI.widgets[5].visual_items[1].text = "0";
              }
              WebUI.x = x; WebUI.y = y; WebUI.z = z;
          }
          catch(e)
          {
              WebUI.widgets[5].visual_items[1].text = "Error";
          }
      }
      else
      {
          WebUI.widgets[5].visual_items[1].text += str;
      }
  }
}

WebUI.PushButton1 = function(label, desired_size, properties) {
    WebUI.Widget.call(this, properties);

    this.type = WebUI.WidgetTypes.PUSH_BUTTON;
    this.label = label;
    this.desired_size = desired_size;

    this.is_pushed = false;
}

WebUI.PushButton1.prototype = Object.create(WebUI.Widget.prototype);
WebUI.PushButton1.prototype.constructor = WebUI.PushButton;

WebUI.PushButton1.prototype.initVisualItems = function() {
    let background = new fabric.Rect({
        left: this.position.left,
        top: this.position.top,
        width: this.desired_size.width,
        height: this.desired_size.height,
        fill: this.fill_color,
        stroke: this.stroke_color,
        strokeWidth: this.stroke_width,
        selectable: false
    });

    let text = new fabric.Text(this.label, {
        left: this.position.left,
        top: this.position.top,
        selectable: false,
        fontFamily: this.font_family,
        fontSize:   this.font_size,
        fontWeight: this.font_weight,
        textAlign:  this.text_align,
        stroke:     this.text_color,
        fill:       this.text_color,
    });

    let bound = text.getBoundingRect();
    text.left = this.position.left + this.desired_size.width/2 - bound.width/2;
    text.top = this.position.top + this.desired_size.height/2 - bound.height/2;

    this.size = this.desired_size;
    //
    this.visual_items.push(background);
    this.visual_items.push(text);
    this.is_resource_ready = true;
}

WebUI.PushButton1.prototype.handleMouseDown = function() {
    WebUI.widgets[2].visual_items[1].text="";
    idx=0;
    arr[0]="";
    arr[1]="";
    arr[2]="";
}

WebUI.PushButton1.prototype.handleMouseEnter = function() {
    this.visual_items[0].set('strokeWidth', 3);
    return true;
}

WebUI.PushButton1.prototype.handleMouseExit = function() {
    this.visual_items[0].set('strokeWidth', 1);

    if (this.is_pushed) {
        this.translate({x:0, y:-5});
        this.is_pushed = false;
    }
    return true;
}

$(document).ready(function() {
    WebUI.initialize();
});
