var app = angular.module("pdfApp",[]);
app.controller("pdfController", function($scope){
  $scope.pdf = function(pdfs){
  	var doc = new jsPDF()
    doc.text($scope.pdfs.name, 100, 100)
    doc.save('file.pdf')
  }
});