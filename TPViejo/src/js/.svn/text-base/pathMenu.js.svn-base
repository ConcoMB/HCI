/**
 * @author Facundo
 */
function makeCategories() {
	var catString = '<div>';
	site.getCategories().each(function(index, category){
		catString += '<a title="'+category.getName+'" href="#">'+category.getName+'</a>';
	});
	catString += '</div>';
}

function makeSubcategories(categoryNode) {
	var subcatString = '<div>'
	categoryNode.getChildren().each(function(index, subcategory){
		subcatString += '<a title="'+subcategory.getName+'" href="#">'+subcategory.getName+'</a>';
	});
	catString += '</div>';
}

$(function(){
	var pathWrapper = $("div#pathWrapper");
	var path = site.getStack().iterator();
	var node = null;
	var pathNode = null;
	
	if(pathWrapper == null) {
		return;
	}
	
	$(pathWrapper).append('<div id="path"></div>');
	
	while( (node = path.next()) != null){
		if(node.isCategory()) {
			$(pathWrapper).get(0).get(0).append(makeCategories());
			var string = '<div><a title="'+node.getName()+'" href="#">'+node.getName()+'</a>';
			$(pathWrapper).get(0).append(string + makeSubcategories(node) + '</div>');			
		} else if (node.isSubcategory()) {
			$(pathWrapper).get(0).append('<div><a title="'+node.getName()+'" href="#">'+node.getName()+'</a></div>')
		} else if (node.isArticle()) {
			$(pathWrapper).get(0).append('<div><a title="'+node.getName()+'" href="#">' + node.getName() + '</a></div>');
		} else {
			$(pathWrapper).get(0).append('<div><a title="'+node.getName()+'" href="#">'+node.getName()+'</a></div>');
		}
	}
	
	$(pathWrapper).get(0).get(-1).addClass("PathElementLeaf");
	
	$(pathWrapper).get(0).path_menu();
	
	return;	
});
