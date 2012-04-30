/*
 * TreeNode class
 */
function TreeNode(value, nodes, level) {
	this.value = value;
	this.level = level;
	if(nodes == null) {
		this.nodes = null;
		return;
	}
	this.nodes = [];
	for(i in nodes) {
		this.nodes = this.nodes.concat(new TreeNode(nodes[i], null, this.level + 1));
	}
	this.dataObj = null;
}

TreeNode.prototype.find = function(value, fn) {
	if(fn != null && fn(this)) {
		return this;
	} else if(this.value == value) {
		return this;
	}
	var aux;
	for(i in this.nodes) {
		aux = this.nodes[i].find(value,fn);
		if(aux != null) {
			return aux;
		}
	}
	return null;
}
TreeNode.prototype.findDataNode = function(dataObj) {
	if(this.dataObj == dataObj) {
		return this;
	}
	var aux;
	for(i in this.nodes) {
		aux = this.nodes[i].findDataNode(dataObj);
		if(aux != null) {
			return aux;
		}
	}
	return null;
}
TreeNode.prototype.add = function(value, dataObj) {
	var node = new TreeNode(value, null, this.level + 1);
	node.addDataObj(dataObj);
	if(this.nodes == null) {
		this.nodes = [node];
		return;
	}
	this.nodes = this.nodes.concat(node);
}

TreeNode.prototype.toString = function() {
	var children = "";
	if(this.nodes != null) {
		for(i in this.nodes) {
			children = children.concat(this.nodes[i].toString());
		}
	} else {
		children = "none";
	}
	return this.value;
}

TreeNode.prototype.isCousinOf = function(node) {
	return this.level == node.level;
}

TreeNode.prototype.addDataObj = function(dataObj) {
	this.dataObj = dataObj;
}
TreeNode.prototype.getDataObj = function() {
	return this.dataObj;
}

TreeNode.prototype.getChildren = function() {
	return this.nodes;
}

TreeNode.prototype.getValue = function() {
	return this.value;
}
/*
 * StackNode class
 */
function StackNode(prev, value, next) {
	this.prev = prev;
	this.value = value;
	this.next = next;
}

StackNode.prototype.toString = function() {
	return "<" + this.value.toString() + ">";
}
/*
 * Stack class
 */
function Stack() {
	this.last = null;
}

Stack.prototype.find = function(value) {
	if(this.last == null) {
		return null;
	}
	return this.recFind(value);
}

Stack.prototype.recFind = function(value) {
	if(this.prev != null) {
		var aux = find(this.prev);
		if(aux != null) {
			return aux;
		}
	}
	if(this.value.value == value) {
		return this.value;
	}
	return null;
}

Stack.prototype.iterator = function() {
	return new Iterator(this.last);
}
function Iterator(last) {
	this.cur = last;
}

Iterator.prototype.next = function() {
	if(this.cur == null) {
		return null;
	}
	var aux = this.cur.value;
	this.cur = this.cur.prev;
	return aux;
}

Stack.prototype.toString = function() {
	/*var aux = "";
	 var cur = this.last;
	 if(cur == null) {
	 return "empty";
	 }
	 while(cur != null) {
	 aux = cur.toString().concat(aux);
	 cur = cur.prev;
	 }
	 return "first:" + aux;*/
	var aux = "";
	var cur = this.last;
	if(cur == null) {
		return "";
	}
	while(cur != null) {
		aux = (cur.value.getValue() + '/').concat(aux);
		cur = cur.prev;
	}
	return aux;
}

Stack.prototype.popFrom = function(node) {
	var aux = this.last;
	var lastFound = null;
	while(aux != null) {
		if(aux.value.value == node.value || aux.value.isCousinOf(node)) {
			lastFound = aux;
		}
		aux = aux.prev;
	}
	if(lastFound == null) {
		return null;
	}
	this.last = lastFound.prev;
}

Stack.prototype.push = function(value) {
	if(this.last == null) {
		this.last = new StackNode(null, value, null);
		return;
	}
	this.last = this.last.next = new StackNode(this.last, value, null);
}

Stack.prototype.pop = function() {
	if(this.last == null) {
		return null;
	}
	var aux = this.last;
	this.last = this.last.prev;
	if(this.last != null) {
		this.last.next = null;
	}
	return aux;
}
Stack.prototype.peek = function() {
	if(this.last == null) {
		return null;
	}
	return this.last.value;
}
Stack.prototype.isEmpty = function() {
	return this.peek() == null;
}
/*
 * Tree class
 */
function Tree() {
	this.root = null;
	this.stack = new Stack();
}

Tree.prototype.getStack = function() {
	return this.stack;
}

Tree.prototype.getData = function(value) {
	if(this.root == null) {
		return null;
	}
	return this.root.find(value).dataObj;
}

Tree.prototype.get = function(value) {
	return this.find(value);
}

Tree.prototype.find = function(value, fn) {
	if(this.root == null) {
		return null;
	}
	return this.root.find(value, fn);
}
Tree.prototype.findDataNode = function(dataObj) {
	if(this.root == null) {
		return null;
	}
	return this.root.findDataNode(dataObj);
}
Tree.prototype.addMany = function(values, toValue) {
	for(x in values) {
		this.add(values[x], null, toValue, null);
	}
}
Tree.prototype.add = function(value, dataObj, toValue, toData, subValue, subValueData) {
	if(this.root == null) {
		this.root = new TreeNode(value, null, 0);
		return true;
	}
	if(dataObj != null && this.findDataNode(dataObj) != null) {
		return false;
	}
	var aux;
	if(toData == null && subValueData == null) {
		if(subValue == null) {
			aux = this.find(toValue);
		} else {
			aux = this.getChild(toValue, subValue);
		}
	}
	if(toData == null) {
		aux = this.find(toValue);
		this.getDataChild(aux, subValueData);
	} else {
		var grandfather = this.findDataNode(toData);
		if(grandfather == null) {
			aux = null;
		} else {
			aux = this.getDataChild(grandfather, subValueData);
		}
	}
	if(aux != null) {
		aux.add(value, dataObj);
	}
	return true;
}

Tree.prototype.getDataChild = function(node, data) {
	if(node != null) {
		var children = node.getChildren();
		for(x in children) {
			if(children[x].getDataObj() == data) {
				return children[x];
			}
		}
	}
	return null;
}

Tree.prototype.toString = function() {
	if(this.root == null) {
		return null;
	}
	return this.root.toString();
}
Tree.prototype.moveTo = function(value) {
	if(this.root == null) {
		return false;
	}
	var aux = this.root.find(value);
	if(aux == null) {
		return false;
	}
	this.stack.popFrom(aux);
	this.stack.push(aux);
	console.log("moving to " + value);
	console.log(this.stack.toString());
	return true;
}
Tree.prototype.stackToString = function() {
	return this.stack.toString();
}
Tree.prototype.popN = function(n) {
	var i = 0;
	while(i < n && this.stack.pop() != null) {
		i++;
	}
}
Tree.prototype.stackLast = function() {
	return this.stack.peek().value;
}
Tree.prototype.isRoot = function(value) {
	return this.root.value == value;
}
Tree.prototype.getChild = function(father, child) {
	if(father == null || child == null) {
		return null;
	}
	var f = this.find(father);
	if(f == null) {
		return null;
	}
	return f.find(child);
}
Tree.prototype.getRootValue = function() {
	if(this.root == null) {
		return null;
	}
	return this.root.value;
}

Tree.prototype.moveToRoot = function() {
	return this.moveTo(this.getRootValue());
}